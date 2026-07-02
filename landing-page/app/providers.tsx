"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

/**
 * Global providers wrapper.
 * Wraps the app in QueryClientProvider so all components can use
 * TanStack Query hooks (useQuery, useMutation, etc.).
 *
 * QueryClient is created inside useState so each browser session
 * gets its own instance (prevents state leaking between users in SSR).
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data is considered fresh for 1 minute before a background refetch
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
