'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { authAPI } from '@/services/api';

export function useAuth(redirectToLogin = true) {
  const router = useRouter();
  const { user, token, setAuth, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isHydrated) return;
      if (token && !user) {
        try {
          const response = await authAPI.getMe();
          setAuth(response.data.user, token);
        } catch (error) {
          logout();
          if (redirectToLogin) {
            router.push('/login');
          }
        }
      } else if (!token && redirectToLogin) {
        router.push('/login');
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [token, user, isHydrated, redirectToLogin, router, setAuth, logout]);

  return {
    user,
    token,
    isLoading: isLoading || !isHydrated,
    isAuthenticated: !!user && !!token,
  };
}

