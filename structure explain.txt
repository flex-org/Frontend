src/
│
├─ app/                            # Application routing (Server Components) // must be only server components
│   ├─ layout.tsx                  # Root layout: fonts, theme, providers
│   ├─ page.tsx                    # Main landing page
│   │
│   ├─ (auth)/                     # Public auth pages (no login required)
│   │   └─ signin/
│   │       ├─ page.tsx            # Server component UI entrypoint
│   │       
│   │
│   ├─ (main)/                     # Protected dashboard pages (requires login)
│   │   └─ dashboard/
│   │       ├─ page.tsx
│   │       
│   │
│   └─ not-found.tsx               # Custom 404 page
│
├─ features/                       # Business logic grouped by domain
│   ├─ signin/
│   │   ├─ components/             # UI components related only to signin
│   │   ├─ hooks/                  # Local hooks used by signin feature
│   │   |─ types.ts                # Feature-specific types
│   │   |─ actions.ts               # actions with server (backend) // must use 'use server' directory
    |       
│   └─ dashboard/
│       ├─ components/
│       ├─ hooks/
│       |─ types.ts
|       |─ actions.ts      
│               
├─ components/                     # Global reusable components
│   └─ ui/                         # shadcn/ui generated components
│
├─ lib/                            # Framework & API utilities
│   ├─ axios.ts                    # Preconfigured Axios instance //if needed
│   └─ validators.ts               # Global Shared validation helpers (e.g., zod)
│
├─ utils/                          # Global helper functions
│   └─ cn.ts                       # Tailwind + clsx merging utility
│
├─ hooks/                          # Global reusable hooks
│   └─ use-toast.ts
│
├─ types/                          # Global Shared app-wide types
│
├─ tests/                          # React Testing Library tests
│
└─ public/                         # Static assets available to client
