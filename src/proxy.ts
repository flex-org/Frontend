import { NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import NextAuth from 'next-auth';
import { fallbackLng, languages, cookieName } from './i18n/settings';
import { authConfig } from './auth.config';

acceptLanguage.languages(languages);
const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { pathname } = req.nextUrl;
    const isLoggedIn = !!req.auth;
    const pathnameHasLocale = languages.some(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    );
    const getLanguageFromPath = (path: string): string | null => {
        for (const lang of languages) {
            if (path === `/${lang}` || path.startsWith(`/${lang}/`)) {
                return lang;
            }
        }
        return null;
    };

    let lng = getLanguageFromPath(pathname);
    if (!pathnameHasLocale) {
        if (req.cookies.has(cookieName))
            lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
        if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
        if (!lng) lng = fallbackLng;
        return NextResponse.redirect(
            new URL(
                `/${lng}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
                req.url,
            ),
        );
    }
    const protectedRoutes = [
        '/gomaa',
        '/build',
        '/preferences',
        '/payment',
        '/domain',
    ];
    const isProtectedRoute = protectedRoutes.some((route) => {
        const routeWithLang = `/${lng}${route}`;
        return (
            pathname === routeWithLang ||
            pathname.startsWith(`${routeWithLang}/`)
        );
    });
    if (isProtectedRoute && !isLoggedIn) {
        const signinUrl = new URL(`/${lng}/signin`, req.url);
        const callbackUrl = pathname.startsWith(`/${lng}`)
            ? pathname
            : `/${lng}${pathname}`;
        signinUrl.searchParams.set('callbackUrl', callbackUrl);
        return NextResponse.redirect(signinUrl);
    }
    const response = NextResponse.next();
    if (lng) {
        response.cookies.set(cookieName, lng);
    }
    return response;
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};
