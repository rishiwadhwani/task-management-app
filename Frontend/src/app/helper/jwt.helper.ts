export function decodeJWT(token: string): any {
  return JSON.parse(atob(token.split('.')[1]));
}
