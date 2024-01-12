/**
 * Defines an interface called 'Tokens' which represents a set of access and refresh tokens.
 *
 * @interface Tokens
 * @property {object} accessToken - An object representing the access token.
 * @property {string} refreshToken - The refresh token value.
 * @property {number} expireDate - The expiration time in milliseconds
 */

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface JwtPayload {
  id: string;
  email: string;
  name: string;
}
