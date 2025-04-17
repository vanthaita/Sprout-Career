import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';

const privatePath = ['/in'];
const authPath = ['/signin', '/signup'];

const intlMiddleware = createMiddleware(routing);

export default function middleware(request) {
  const { pathname } = request.nextUrl;
  
  const pathnameWithoutLocale = pathname.replace(/^\/(en|jp)\//, '/') || '/';
  
  const token = request.cookies.get('access_token')?.value;
  
  if (!token && privatePath.some((path) => pathnameWithoutLocale.startsWith(path))) {
    const signInPath = pathname.startsWith('/jp/') ? '/jp/signin' : '/signin';
    return NextResponse.redirect(new URL(signInPath, request.url));
  }
  
  if (token && authPath.some((path) => pathnameWithoutLocale.startsWith(path))) {
    const homePath = pathname.startsWith('/jp/') ? '/jp' : '/';
    return NextResponse.redirect(new URL(homePath, request.url));
  }
  
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};