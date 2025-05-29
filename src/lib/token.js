import Cookies from 'js-cookie';

export const getRefreshToken = () => {
  return Cookies.get('refresh_token');
};
export const clearAuthCookies = () => {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
};