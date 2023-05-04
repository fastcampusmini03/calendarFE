export interface JwtPayload {
    iss?: string | undefined;
    sub?: string | undefined;
    aud?: string | string[] | undefined;
    exp?: number | undefined;
    nbf?: number | undefined;
    iat?: number | undefined;
    jti?: string | undefined;
  }
  
  export type AccessToken = string;
  
  export type RefreshToken = string;
  