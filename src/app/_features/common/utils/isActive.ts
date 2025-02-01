export function isActive(pathname: string, href: string) {
  return (
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`)
  );
}
