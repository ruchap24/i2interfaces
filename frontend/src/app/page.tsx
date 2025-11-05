'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Briefcase, Award } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      router.push('/profile');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to Professional Network
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Build your professional profile and connect with others
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => router.push('/signup')}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => router.push('/login')}>
              Login
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-bold text-lg mb-2">Build Your Network</h3>
              <p className="text-gray-600">
                Connect with professionals and expand your network
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <Briefcase className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-bold text-lg mb-2">Showcase Experience</h3>
              <p className="text-gray-600">
                Highlight your work experience and achievements
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <Award className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-bold text-lg mb-2">Display Skills</h3>
              <p className="text-gray-600">
                Show off your skills and expertise to the world
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}