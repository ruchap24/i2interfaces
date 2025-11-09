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

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  
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
    <div className="min-h-screen flex items-center justify-center bg-black p-4 relative z-10">
      <Card className="w-full max-w-md bg-[#0a0a0a] border-blue-500/20 relative overflow-hidden">
          <CardHeader className="relative z-10 bg-blue-500/20 p-6 text-center">
          <CardTitle className="text-white">Welcome Back</CardTitle>
          <CardDescription className="text-gray-400">Login to your professional profile</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 relative z-10">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-[#1a1a1a] border-blue-500/20 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="bg-[#1a1a1a] border-blue-500/20 text-white placeholder:text-gray-500"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 relative z-10">
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <p className="text-sm text-center text-gray-400">
              Don't have an account?{' '}
              <Link href="/signup" className="text-blue-400 hover:text-blue-300 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
