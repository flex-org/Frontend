//  Middleware for Multi-Tenancy
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export function proxy(request: NextRequest) {
    const hostname = request.headers.get('host') || '';

    // Extract subdomain (e.g., "teacher1" from "teacher1.platme.com")
    const subdomain = hostname.split('.')[0];

    // Skip middleware for localhost and www
    if (hostname.includes('localhost') || subdomain === 'www') {
        return NextResponse.next();
    }

    // Add tenant ID to headers for server actions to use
    const response = NextResponse.next();
    response.headers.set('x-tenant-id', subdomain);

    return response;
}
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};