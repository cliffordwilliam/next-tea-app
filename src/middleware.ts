import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { AccessTokenPayload } from "./app/_features/common/auth/definitions/access-token-payload.definition";
import { RefreshTokenPayload } from "./app/_features/common/auth/definitions/refresh-token-payload.definition";
import { storeTokensInCookies } from "./app/_features/sign-in/actions/store-tokens-in-cookies.action";
import { SignInSuccessResponse } from "./app/_features/sign-in/definitions/sign-in-success-res.definition";
import { deleteTokensInCookies } from "./app/_features/sign-out/actions/delete-tokens-in-cookies.action";

// protected and public routes
const protectedRegularRoutes = ["/teas"];
const protectedAdminRoutes = ["/users"];
const publicRoutes = ["/", "/sign-in", "/sign-up"];

export default async function middleware(req: NextRequest) {
  // current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRegularRoutes = protectedRegularRoutes.includes(path);
  const isProtectedAdminRoutes = protectedAdminRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // get tokens from cookies
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // no refresh token? alr logged out, kick
  if (!refreshToken) {
    await deleteTokensInCookies();
    // kick to login if in protected routes
    if (isProtectedRegularRoutes || isProtectedAdminRoutes) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
    return NextResponse.next();
  } else if (!accessToken && refreshToken) {
    // no token? try get new ones
    try {
      // req refresh token
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/authentication/refresh-tokens`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );
      // fail to refresh token? kick
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Invalid credentials");
      }
      // store valid tokens in cookies
      const okData: SignInSuccessResponse = await response.json();
      await storeTokensInCookies(okData);
      // route kick logic (auto calls next)
      return kick(
        okData,
        req,
        isProtectedRegularRoutes,
        isProtectedAdminRoutes,
        isPublicRoute,
        path
      );
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      // fails to use refresh token means logged out
      await deleteTokensInCookies();
      // kick to login if in protected route
      if (isProtectedRegularRoutes || isProtectedAdminRoutes) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
      }
      // call next
      return NextResponse.next();
    }
  } else if (accessToken && refreshToken) {
    // got token
    const okData: SignInSuccessResponse = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    // route kick logic
    return kick(
      okData,
      req,
      isProtectedRegularRoutes,
      isProtectedAdminRoutes,
      isPublicRoute,
      path
    );
  }
}

// routes middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

function kick(
  okData: SignInSuccessResponse,
  req: NextRequest,
  isProtectedRegularRoutes: boolean,
  isProtectedAdminRoutes: boolean,
  isPublicRoute: boolean,
  path: string
) {
  const { accessToken, refreshToken } = okData;
  const decodedAccessToken: AccessTokenPayload = jwtDecode(accessToken);
  const decodedRefreshToken: RefreshTokenPayload = jwtDecode(refreshToken);

  // invalid payload? kick to login if in protected route
  if (isProtectedRegularRoutes || isProtectedAdminRoutes) {
    if (!decodedAccessToken.role || !decodedRefreshToken.refreshTokenId) {
      if (path !== "/") {
        return NextResponse.redirect(new URL("/", req.nextUrl));
      }
    }
  }

  if (isProtectedRegularRoutes && decodedAccessToken.role !== "regular") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (isProtectedAdminRoutes && decodedAccessToken.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // kick to protected
  if (isPublicRoute) {
    if (decodedAccessToken.role === "regular") {
      return NextResponse.redirect(new URL("/teas", req.nextUrl));
    }
    if (decodedAccessToken.role === "admin") {
      return NextResponse.redirect(new URL("/users", req.nextUrl));
    }
  }

  // call next
  return NextResponse.next();
}
