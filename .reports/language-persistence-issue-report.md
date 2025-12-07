# Language Persistence Issue Report
**Date:** December 7, 2025  
**Environment:** Production  
**Severity:** High  
**Status:** Identified - Requires Fixes

---

## Executive Summary

The website is experiencing a critical language persistence issue in production where navigating between pages causes the language to revert from Arabic to English, despite the cookie (`i18next`) maintaining the correct Arabic value. This report identifies **5 critical issues** causing this behavior and provides actionable solutions.

---

## Problem Description

### User Experience
- **Current State:** User sets language to Arabic on Page A
- **Cookie State:** Cookie correctly stores "ar"
- **Navigation:** User navigates to Page B
- **Expected:** Page B displays in Arabic
- **Actual:** Page B displays in English (default)
- **Impact:** Poor user experience, breaks multi-language functionality

### Technical Manifestation
The language cookie persists correctly, but the routing system doesn't respect it during client-side navigation, causing pages to default to English (fallback language: 'ar' in settings, but actual behavior suggests English).

---

## Root Causes Identified

### 🔴 **Critical Issue #1: Missing Language Prefix in Router Navigation**

**Location:** Multiple files  
**Severity:** CRITICAL

#### Affected Files:
1. `src/onBoarding/signup/components/SignupForm.tsx` (Line 47)
2. `src/onBoarding/signin/components/SignInForm.tsx` (Line 46)
3. `src/onBoarding/components/LogoutButton.tsx` (Line 26)
4. `src/onBoarding/signup/components/VerifyEmail.tsx` (Line 45)

#### Problem:
When using `router.push()`, the code navigates to paths **without the language prefix**:

```typescript
// ❌ WRONG - Missing language prefix
router.push('/signup/verify');
router.push('/signin');
router.push(callbackUrl); // May not have language prefix
router.push('/');
```

#### Why This Fails:
1. User is on `/ar/signup` (Arabic)
2. After form submission, code executes `router.push('/signup/verify')`
3. Next.js navigates to `/signup/verify` (no language prefix)
4. Middleware (`proxy.ts`) detects missing locale in pathname
5. Middleware reads cookie (`i18next=ar`)
6. Middleware **redirects** to `/ar/signup/verify`
7. However, during this redirect, the i18n client resets and may use default detection
8. Client-side i18n uses detection order: `['path', 'htmlTag', 'cookie', 'navigator']`
9. Path becomes `/ar/...` but page might have already initialized with wrong language

#### Impact:
- Causes page reloads/redirects
- Language state becomes inconsistent
- Cookie is correct but rendered content is wrong

---

### 🔴 **Critical Issue #2: Callback URLs Missing Language Context**

**Location:** `src/onBoarding/signin/components/SignInForm.tsx` (Lines 44-46)

#### Problem:
```typescript
const params = new URLSearchParams(window.location.search);
const callbackUrl = params.get('callbackUrl') || '/';
router.push(callbackUrl);
```

The `callbackUrl` from query parameters might not include the language prefix, causing navigation to language-less routes.

#### Example Flow:
1. User on `/ar/building` (requires auth)
2. Middleware redirects to `/ar/signin?callbackUrl=/building` ⚠️ (missing `/ar`)
3. After login, navigates to `/building` (no language)
4. Language resets to default

---

### 🟡 **Issue #3: Inconsistent i18n Language Detection**

**Location:** `src/i18n/client.ts` (Lines 21-28)

#### Problem:
```typescript
.init({
    ...getOptions(),
    lng: undefined, // ⚠️ Starts with undefined
    detection: {
        order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: [],
})
```

#### Why This Matters:
- Initial language is `undefined`
- Relies on detection order
- If path parsing fails or is delayed, falls back to browser language
- Race condition between middleware redirect and client-side detection

---

### 🟡 **Issue #4: Middleware Cookie Setting Timing**

**Location:** `src/proxy.ts` (Lines 42-45)

#### Problem:
```typescript
const response = NextResponse.next();
if (lng) {
    response.cookies.set(cookieName, lng);
}
return response;
```

#### Analysis:
- Cookie is set **after** determining language from URL path
- Works correctly for paths WITH language prefix
- For paths WITHOUT prefix, redirect happens before cookie update
- This creates a timing issue where old cookie value might be used

---

### 🟢 **Issue #5: Hard-coded Links Missing Language Prefix**

**Location:** Various components

#### Examples:
```typescript
// src/onBoarding/signup/components/SignupForm.tsx:66
<Link href={'/signin'} ...>

// src/onBoarding/signin/components/SignInForm.tsx:57
<Link href={'/signup'} ...>

// src/onBoarding/components/AuthHeader.tsx:7
<Link href={'/'} ...>
```

While `next/link` handles this better than `router.push()`, it's still inconsistent with the language routing architecture.

---

## Architecture Analysis

### Current Language Routing Flow

```
1. User requests page
   ↓
2. Middleware (proxy.ts) intercepts
   ↓
3. Checks if path has language prefix
   ↓
4. If NO prefix:
   - Reads cookie
   - Redirects to /{lng}{path}
   ↓
5. If HAS prefix:
   - Extracts lng from path
   - Sets cookie
   - Continues
   ↓
6. Page renders with lng parameter
   ↓
7. Client-side i18n initializes
   - Detects language from path/cookie
   ↓
8. User interacts (form submit, navigation)
   ↓
9. Router.push() without language prefix
   ↓
10. LOOP BACK TO STEP 2 (middleware redirect)
```

### The Problem Loop:
Client-side navigation → Missing language → Middleware redirect → i18n re-detection → Wrong language rendered

---

## Solutions & Recommendations

### ✅ Solution 1: Create Language-Aware Navigation Hook

**Priority:** HIGH  
**Effort:** Medium  
**Impact:** Fixes all navigation issues

Create a custom hook that always includes language in navigation:

```typescript
// src/hooks/useLanguageRouter.ts
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export function useLanguageRouter() {
    const router = useRouter();
    const pathname = usePathname();
    
    // Extract current language from pathname
    const getCurrentLanguage = useCallback(() => {
        const segments = pathname.split('/');
        // Assuming structure: /[lng]/...
        return segments[1] || 'ar'; // fallback
    }, [pathname]);

    const push = useCallback((href: string, options?: any) => {
        const lng = getCurrentLanguage();
        
        // If href already has language, use as-is
        if (href.startsWith(`/${lng}/`) || href.startsWith('/ar/') || href.startsWith('/en/')) {
            router.push(href, options);
            return;
        }
        
        // Add language prefix
        const langPath = href.startsWith('/') 
            ? `/${lng}${href}` 
            : `/${lng}/${href}`;
            
        router.push(langPath, options);
    }, [router, getCurrentLanguage]);

    return {
        ...router,
        push,
        currentLanguage: getCurrentLanguage(),
    };
}
```

**Usage:**
```typescript
// Instead of:
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/signin');

// Use:
import { useLanguageRouter } from '@/hooks/useLanguageRouter';
const router = useLanguageRouter();
router.push('/signin'); // Automatically becomes /ar/signin
```

---

### ✅ Solution 2: Fix All Router.push() Calls

**Priority:** HIGH  
**Effort:** Low  
**Impact:** Direct fix

Update all instances to include language:

#### File: `src/onBoarding/signup/components/SignupForm.tsx`
```typescript
// Line 47 - BEFORE:
router.push('/signup/verify');

// AFTER:
router.push(`/${lng}/signup/verify`);
```

#### File: `src/onBoarding/signin/components/SignInForm.tsx`
```typescript
// Lines 44-46 - BEFORE:
const params = new URLSearchParams(window.location.search);
const callbackUrl = params.get('callbackUrl') || '/';
router.push(callbackUrl);

// AFTER:
const params = new URLSearchParams(window.location.search);
const callbackUrl = params.get('callbackUrl') || `/${lng}`;
// Ensure callbackUrl has language prefix
const finalUrl = callbackUrl.startsWith(`/${lng}`) 
    ? callbackUrl 
    : `/${lng}${callbackUrl}`;
router.push(finalUrl);
```

#### File: `src/onBoarding/components/LogoutButton.tsx`
```typescript
// Line 26 - BEFORE:
router.push('/signin');

// AFTER:
router.push(`/${lng}/signin`);
```

#### File: `src/onBoarding/signup/components/VerifyEmail.tsx`
```typescript
// Line 45 - BEFORE:
router.push('/signin');

// AFTER:
router.push(`/${lng}/signin`);
```

---

### ✅ Solution 3: Fix Middleware Callback URL Generation

**Priority:** HIGH  
**Effort:** Low  
**Impact:** Prevents language loss on protected routes

#### File: `src/proxy.ts`
```typescript
// Lines 37-40 - BEFORE:
if (isProtectedRoute && !isLoggedIn) {
    const signinUrl = new URL(`/${lng}/signin`, req.url);
    signinUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signinUrl);
}

// AFTER:
if (isProtectedRoute && !isLoggedIn) {
    const signinUrl = new URL(`/${lng}/signin`, req.url);
    // Ensure callbackUrl includes language prefix
    const callbackUrl = pathname.startsWith(`/${lng}`) 
        ? pathname 
        : `/${lng}${pathname}`;
    signinUrl.searchParams.set('callbackUrl', callbackUrl);
    return NextResponse.redirect(signinUrl);
}
```

---

### ✅ Solution 4: Update Hard-coded Links

**Priority:** MEDIUM  
**Effort:** Low  
**Impact:** Consistency

Update `<Link>` components to use language-aware paths:

```typescript
// Create a helper component or use direct lng
<Link href={`/${lng}/signin`}>
// or
<Link href={`/${lng}`}> // for home
```

---

### ✅ Solution 5: Add Language Persistence Validation

**Priority:** LOW  
**Effort:** Medium  
**Impact:** Debugging & Monitoring

Add client-side validation to detect language mismatches:

```typescript
// src/hooks/useLanguageValidator.ts
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

export function useLanguageValidator() {
    const pathname = usePathname();
    
    useEffect(() => {
        const pathLang = pathname.split('/')[1];
        const cookieLang = Cookies.get('i18next');
        
        if (pathLang !== cookieLang) {
            console.warn('Language mismatch detected!', {
                path: pathLang,
                cookie: cookieLang,
                pathname
            });
            
            // Optional: Auto-fix by updating cookie
            // Cookies.set('i18next', pathLang);
        }
    }, [pathname]);
}
```

---

## Implementation Plan

### Phase 1: Immediate Fixes (Critical)
**Timeline:** 1-2 hours

1. ✅ Fix all `router.push()` calls to include `/${lng}` prefix
   - SignupForm.tsx
   - SignInForm.tsx
   - LogoutButton.tsx
   - VerifyEmail.tsx

2. ✅ Fix middleware callbackUrl generation

### Phase 2: Structural Improvements (High Priority)
**Timeline:** 2-3 hours

3. ✅ Create `useLanguageRouter` hook
4. ✅ Replace all router usages with language-aware hook
5. ✅ Update all hard-coded `<Link>` components

### Phase 3: Quality Assurance
**Timeline:** 1-2 hours

6. ✅ Test all navigation flows
7. ✅ Verify cookie persistence
8. ✅ Check browser back/forward buttons
9. ✅ Test protected route redirects

### Phase 4: Monitoring (Optional)
**Timeline:** 1 hour

10. ✅ Add language validator hook
11. ✅ Set up error tracking for language mismatches

---

## Testing Checklist

### Test Scenarios

- [ ] **Scenario 1: Direct Navigation**
  - Set language to Arabic
  - Navigate using forms (signup, login, verify)
  - Verify language persists

- [ ] **Scenario 2: Protected Routes**
  - Access protected route while logged out
  - Get redirected to login
  - Login successfully
  - Verify redirected back with same language

- [ ] **Scenario 3: Manual URL Entry**
  - Enter URL without language prefix
  - Verify middleware redirects with correct language from cookie

- [ ] **Scenario 4: Browser Navigation**
  - Navigate through multiple pages
  - Use browser back button
  - Verify language persists

- [ ] **Scenario 5: Language Switching**
  - Switch language on page A
  - Navigate to page B
  - Verify new language is maintained

---

## Files Requiring Changes

### High Priority
1. ✅ `src/onBoarding/signup/components/SignupForm.tsx`
2. ✅ `src/onBoarding/signin/components/SignInForm.tsx`
3. ✅ `src/onBoarding/components/LogoutButton.tsx`
4. ✅ `src/onBoarding/signup/components/VerifyEmail.tsx`
5. ✅ `src/proxy.ts`

### Medium Priority
6. `src/onBoarding/components/AuthHeader.tsx`
7. `src/components/LanguageSwitcher.tsx` (verify it works correctly)
8. Any other files with `<Link href={'/...'}>`

### New Files to Create
9. `src/hooks/useLanguageRouter.ts`
10. `src/hooks/useLanguageValidator.ts` (optional)

---

## Configuration Review

### Current i18n Settings (`src/i18n/settings.ts`)
```typescript
export const fallbackLng = 'ar';
export const languages = [fallbackLng, 'en'];
export const cookieName = 'i18next';
```

**Issue Identified:**  
Fallback is set to 'ar', but you mentioned English is showing. This suggests the client-side detection is overriding the fallback or there's a race condition.

**Recommendation:**  
This configuration is correct. The issue is not here but in the navigation logic.

---

## Best Practices for Future Development

### 1. Always Use Language-Aware Navigation
```typescript
// ❌ DON'T
router.push('/some-page');

// ✅ DO
router.push(`/${lng}/some-page`);
// or use the custom hook
const router = useLanguageRouter();
router.push('/some-page'); // Auto-adds language
```

### 2. Always Include Language in Links
```typescript
// ❌ DON'T
<Link href="/signin">

// ✅ DO
<Link href={`/${lng}/signin`}>
```

### 3. Validate Callback URLs
```typescript
// Ensure callback URLs always have language
const ensureLanguagePrefix = (url: string, lng: string) => {
    if (url.startsWith(`/${lng}/`)) return url;
    if (url.startsWith('/')) return `/${lng}${url}`;
    return `/${lng}/${url}`;
};
```

### 4. Use Type Safety
```typescript
// Create types for supported languages
type Language = 'ar' | 'en';

// Use in navigation
const navigate = (path: string, lng: Language) => {
    router.push(`/${lng}${path}`);
};
```

---

## Additional Observations

### ✅ Working Correctly
1. **Middleware language detection** - Properly reads cookie and redirects
2. **Cookie persistence** - Cookie is being set and stored correctly
3. **LanguageSwitcher component** - Correctly updates URL with language prefix
4. **Layout** - Properly applies `dir` and `lang` attributes based on language

### ⚠️ Potential Future Issues
1. **No TypeScript checks** for language parameters in navigation
2. **No centralized navigation handler** - scattered router.push() calls
3. **Missing error boundaries** for language-related errors

---

## Conclusion

The language persistence issue is caused by **client-side navigation not respecting the language routing structure**. The root cause is multiple `router.push()` calls and links that navigate to paths without the language prefix (`/[lng]/`), causing the middleware to redirect and i18n to re-detect language, leading to inconsistent state.

### Severity Assessment
- **Critical:** Breaks core multi-language functionality
- **User Impact:** High - Users cannot maintain language preferences
- **Business Impact:** High - Affects UX and potentially user retention

### Recommended Approach
**Implement Solution 1 & 2** (Phase 1 & 2) for immediate and comprehensive fix. The custom hook provides long-term maintainability while direct fixes provide immediate resolution.

### Estimated Fix Time
- **Quick Fix (Solution 2 only):** 1-2 hours
- **Complete Solution (Solutions 1-4):** 4-6 hours
- **With Testing:** 6-8 hours

---

## Questions for Clarification

1. What is the exact expected fallback language? Settings show 'ar' but behavior suggests 'en'
2. Are there any other navigation patterns in the codebase not reviewed?
3. Should we implement automatic language detection from browser or rely solely on cookie + path?
4. Do you want backward compatibility for old URLs without language prefix?

---

**Report Generated By:** AI Code Analysis  
**Next Steps:** Implement Phase 1 fixes immediately, then proceed with Phase 2 for long-term stability.
