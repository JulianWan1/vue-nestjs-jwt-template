import jsCookie from 'js-cookie';

// To create a cookie in browser when user successfully login
// Set JWT in the cookie
export enum COOKIE {
  TOKEN = 'jwt_cookie',
  USER = 'user_details'
}

const cookie = jsCookie;
export default cookie;

// export function getAccessToken(): string | null {
//   const token = cookie.get(COOKIE.TOKEN);

//   if (!token){
//     return null;
//   };

//   return token;
// };