'use client'

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}

export function useAuth() {
  return { user: null, loading: false, logout: async () => {} };
} 