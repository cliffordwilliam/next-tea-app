export interface RefreshTokenPayload {
  sub: string;
  refreshTokenId: string;
  iat: string;
  exp: string;
  aud: string;
  iss: string;
}
