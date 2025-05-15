import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const privatePath = ['/dashboard'];
const authPath = ['/signin', '/signup'];
const onboardingPath = ['/onboarding'];

const intlMiddleware = createMiddleware(routing);

export default function middleware(request) {
  const { pathname } = request.nextUrl;
  const localeMatch = pathname.match(/^\/(en|jp)(\/|$)/);
  const currentLocale = localeMatch ? localeMatch[1] : 'en';
  const pathnameWithoutLocale = localeMatch ? pathname.slice(localeMatch[0].length - 1) : pathname;
  const normalizedPathnameWithoutLocale = pathnameWithoutLocale || '/';

  const token = request.cookies.get('access_token')?.value;

  let userType, isOnboarded;

  if (token) {
    try {
      const payload = jwt.decode(token);
      userType = payload?.userType;
      isOnboarded = payload?.isOnboarded;
    } catch (err) {
      console.error('Failed to decode token:', err);
    }
  }

  if (!token && privatePath.some((path) => normalizedPathnameWithoutLocale.startsWith(path))) {
    const signInPath = `/${currentLocale}/signin`;
    return NextResponse.redirect(new URL(signInPath, request.url));
  }

  if (token && authPath.some((path) => normalizedPathnameWithoutLocale.startsWith(path))) {
    const homePath = `/${currentLocale}`;
    return NextResponse.redirect(new URL(homePath, request.url));
  }

  if (token) {
    const isOnboardingPath = onboardingPath.some((path) => normalizedPathnameWithoutLocale.startsWith(path));
    
    if (!isOnboarded && !isOnboardingPath) {
      const onboardingPathWithLocale = `/${currentLocale}/onboarding`;
      return NextResponse.redirect(new URL(onboardingPathWithLocale, request.url));
    }

    if (isOnboarded && isOnboardingPath) {
      const dashboardPath = `/${currentLocale}/dashboard/${userType.toLowerCase()}`;
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }

    if (normalizedPathnameWithoutLocale.startsWith('/dashboard/candidate') && userType !== 'CANDIDATE') {
      const dashboardPath = `/${currentLocale}/dashboard/${userType.toLowerCase()}`;
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }

    if (normalizedPathnameWithoutLocale.startsWith('/dashboard/employer') && userType !== 'EMPLOYER') {
      const dashboardPath = `/${currentLocale}/dashboard/${userType.toLowerCase()}`;
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }

    if (normalizedPathnameWithoutLocale.startsWith('/dashboard/admin') && userType !== 'ADMIN') {
      const dashboardPath = `/${currentLocale}/dashboard/${userType.toLowerCase()}`;
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};