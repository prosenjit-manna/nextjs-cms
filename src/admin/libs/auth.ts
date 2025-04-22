import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Helper to check if the user is authenticated
export async function getAuthStatus() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  return { isAuthenticated: !!token };
}

// Use this in server components to protect routes
export async function requireAuth() {
  const { isAuthenticated } = await getAuthStatus();
  
  if (!isAuthenticated) {
    redirect('/login');
  }
}

// For client-side auth state
export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth-token');
}

export function setToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('auth-token', token);
  
  // Also set a cookie for server-side auth
  document.cookie = `auth-token=${token}; path=/; max-age=86400; SameSite=Lax`;
}

export function removeToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth-token');
  
  // Remove the cookie
  document.cookie = 'auth-token=; path=/; max-age=0; SameSite=Lax';
}