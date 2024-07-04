import Cookies from 'js-cookie';

export const checkAdminSession = (): boolean => {
  const sessionCookie = Cookies.get('admin-session');
  return !!sessionCookie;
};
