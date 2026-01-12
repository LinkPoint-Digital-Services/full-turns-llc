#### 1. Root Structure
```
frontend/
├── app/
├── features/
├── components/
├── lib/
├── hooks/
├── stores/
├── services/
├── types/
├── utils/
├── public/
└── styles/
```


#### 2. App Router
```
app/
├── layout.tsx
├── globals.css

├── (public)/
│   ├── layout.tsx
│   ├── page.tsx                # Home
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── blogs/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── contact/page.tsx

├── (auth)/
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   └── forgot-password/page.tsx

├── (dashboard)/
│   ├── layout.tsx              # Auth + role guard
│   │
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── buffers/page.tsx
│   │   ├── blogs/page.tsx
│   │   ├── services/page.tsx
│   │   └── backup/page.tsx
│   │
│   └── property-manager/
│       ├── layout.tsx
│       ├── orders/page.tsx
│       ├── my-orders/page.tsx
│       └── settings/page.tsx

├── unauthorized.tsx
└── not-found.tsx

```


#### 3. Feature-Based Architecture
```
features/
├── auth/
│   ├── components/
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   └── ForgotPasswordForm.tsx
│   ├── services/
│   │   └── auth.service.ts
│   ├── hooks/
│   │   └── useAuth.ts
│   ├── store.ts
│   ├── types.ts
│   └── index.ts
│
├── home/
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── BlogsSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── Footer.tsx
│   └── index.ts
│
├── blogs/
│   ├── components/
│   │   ├── BlogCard.tsx
│   │   └── BlogContent.tsx
│   ├── services/
│   │   └── blogs.service.ts
│   ├── hooks/
│   │   └── useBlogs.ts
│   └── types.ts
│
├── services/
│   ├── components/
│   │   └── ServiceCard.tsx
│   ├── services/
│   │   └── services.service.ts
│   └── types.ts
│
├── orders/
│   ├── components/
│   │   ├── OrderTable.tsx
│   │   └── OrderStatus.tsx
│   ├── services/
│   │   └── orders.service.ts
│   ├── hooks/
│   │   └── useOrders.ts
│   └── types.ts
│
├── admin/
│   ├── buffers/
│   │   ├── components/
│   │   ├── services/
│   │   └── types.ts
│   ├── blogs/
│   │   ├── components/
│   │   ├── services/
│   │   └── types.ts
│   ├── services/
│   ├── backup/
│   └── index.ts
│
└── property-manager/
    ├── orders/
    ├── my-orders/
    ├── settings/
    └── index.ts

```


#### 4. Shared Components (Reusable UI)
```
components/
├── ui/                        #Install shadcn like Button - to generate ui folder
│   ├── Button.tsx             #this ui folder is for shadcn
│   ├── Input.tsx
│   ├── Modal.tsx
│   ├── Dropdown.tsx
│   └── Loader.tsx
│
├── layout/                  
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Sidebar.tsx
│   └── DashboardHeader.tsx

```


#### 5. Stores folder  - For Zustand state management
```
import { create } from 'zustand';
import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

```

#### 6. Types folder  - 
User: types/user.ts
```
export type UserRole = 'ADMIN' | 'PROPERTY_MANAGER';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}
```

Api: types/api.ts
```
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

```

#### 7. Services - API layer for axios fetching
This example is main api.ts for main instance of axios
```
import axios from "axios";
import type { AxiosError } from "axios";

type ErrorResponse = {
  message?: string;
  code?: string;
  errors?: Record<string, string>;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError<ErrorResponse>) => {
    const message =
    error.response?.data?.message || "Unexpected error. Please try again.";
    return Promise.reject({ message, status: error.response?.status });
  }
);

```
#### 8.  Lib - for 3rd party configuration example tanstack query client or providers even the themes
```
'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactNode, useState} from 'react';

type ReactQueryProviderProps = {
  children: ReactNode;
};

export function ReactQueryProvider({children}: ReactQueryProviderProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

#### 9. Hooks - For Reusable Logic like in Use mutation 
```
import {useMutation} from '@tanstack/react-query';
import {toast} from 'sonner';
import {AxiosError} from 'axios';
import {useRouter} from 'next/navigation';

type MutationOptions<T, R> = {
  mutationFn: (data: T) => Promise<R>;
  onSuccessRedirect?: string;
  successMessage?: string;
  errorMessage?: string;
  resetForm?: () => void;
  onSuccessExtra?: (data: R) => void;
};

export function useAuthMutation<T, R>({
  mutationFn,
  onSuccessRedirect,
  successMessage,
  errorMessage,
  resetForm,
  onSuccessExtra
}: MutationOptions<T, R>) {

  const router = useRouter();
  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      toast.success(successMessage);
      resetForm?.();
      onSuccessExtra?.(data)
        if (onSuccessRedirect) {
          setTimeout(() => {
            router.push(onSuccessRedirect);
          }, 500);
        }
    },

    onError: (error: AxiosError<{message: string}>) => {
      const errMsg =
        error.response?.data.message ||
        error.message ||
        errorMessage ||
        'An error occurred';
      toast.error(errMsg);
    }
  });
}
```

#### 10. Utils - helper only example function for getting date today or logical like function to set who is the user admin or property manager
```
import { UserRole } from '@/types/user';

export const isAdmin = (role?: UserRole) => role === 'ADMIN';
```
