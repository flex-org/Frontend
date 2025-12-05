// src/proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import acceptLanguage from 'accept-language';
import { fallbackLng, languages, cookieName } from './i18n/settings';

acceptLanguage.languages(languages);

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const pathnameHasLocale = languages.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
    } else {
        let lng;
        if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
        if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
        if (!lng) lng = fallbackLng;

        return NextResponse.redirect(
            new URL(`/${lng}${pathname.startsWith('/') ? '' : '/'}${pathname}`, req.url)
        );
    }
    const langInUrl = languages.find((loc) => pathname.startsWith(`/${loc}`));

    const response = NextResponse.next();

    if (langInUrl) {
        response.cookies.set(cookieName, langInUrl);
    }

    return response;
}