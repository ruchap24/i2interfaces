'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BorderBeam } from '@/components/magic-ui/border-beam';
import { authAPI } from '@/services/api';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import { Shield, Sparkles, Zap } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleDefaultLogin = () => {
    setFormData({
      email: 'patilrucha991@gmail.com',
      password: 'rucha25'
    });
  };
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authAPI.login(formData);
      const { user, token } = response.data;
      
      setAuth(user, token);
      toast.success('Logged in successfully!');
      router.push('/feed-preferences');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
     
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 sm:px-6 py-8 sm:py-12 md:px-10 md:py-20">
        <div className="flex justify-center items-center">
          <Card className="relative w-full max-w-lg overflow-hidden border border-blue-500/40 bg-gradient-to-b from-[#0d0d2f]/80 via-[#090920]/80 to-[#050515]/90 p-[1px] shadow-[0_20px_45px_rgba(17,24,39,0.65)] backdrop-blur-2xl">
            
            <div className="relative rounded-2xl sm:rounded-3xl bg-[#050513]/80 px-4 sm:px-6 pb-6 sm:pb-8 pt-6 sm:pt-9 shadow-inner shadow-blue-500/10">
              <CardHeader className="space-y-3 text-center px-0">
                <CardTitle className="text-2xl sm:text-3xl font-semibold text-white">Welcome back</CardTitle>
               
                <Button
                  type="button"
                  variant="secondary"
                  className="mx-auto mt-2 w-full max-w-[240px] border border-blue-500/30 bg-blue-500/10 text-blue-100 hover:bg-blue-500/20 text-sm sm:text-base"
                  onClick={handleDefaultLogin}
                  >
                  Use demo credentials
                </Button>
                  </CardHeader>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 pt-2">
                <CardContent className="space-y-4 sm:space-y-5 p-0">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-blue-100/80 text-sm sm:text-base">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-10 sm:h-11 rounded-xl border-blue-500/40 bg-[#0e0e2d]/70 text-white placeholder:text-blue-100/40 focus-visible:border-blue-400 focus-visible:ring-blue-400/40 text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-blue-100/80 text-sm sm:text-base">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      className="h-10 sm:h-11 rounded-xl border-blue-500/40 bg-[#0e0e2d]/70 text-white placeholder:text-blue-100/40 focus-visible:border-blue-400 focus-visible:ring-blue-400/40 text-sm sm:text-base"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3 sm:gap-4 p-0">
                  <Button
                    type="submit"
                    className="h-10 sm:h-11 w-full rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-blue-500/30 hover:from-blue-400 hover:via-indigo-500 hover:to-purple-500 text-sm sm:text-base"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                  <p className="text-xs sm:text-sm text-center text-blue-100/70">
                    Don't have an account?{' '}
                    <Link href="/signup" className="font-medium text-blue-200 hover:text-blue-100 hover:underline">
                      Sign up
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
