'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { profileAPI } from '@/services/api';
import { Profile } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const { user, isLoading } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    
    if (!user) {
      router.push('/login');
      return;
    }
    loadProfiles();
  }, [user, isLoading, router]);

  const loadProfiles = async () => {
    try {
      const response = await profileAPI.getAllProfiles();
      setProfiles(response.data);
    } catch (error) {
      console.error('Failed to load profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (isLoading || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Professional Network</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push('/profile')}>
              My Profile
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 mt-6">
        <h2 className="text-2xl font-bold mb-6">All Professionals</h2>
        {profiles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No profiles found yet.</p>
            <p className="text-gray-400 text-sm mb-6">
              Be the first to create a profile, or seed the database with dummy data.
            </p>
            <Button onClick={() => router.push('/profile')}>
              Create Your Profile
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map((profile) => (
            <Card
              key={profile.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => router.push(`/public-profile/${profile.id}`)}
            >
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={profile.photoUrl || ''} />
                    <AvatarFallback className="text-2xl">
                      {profile.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg">{profile.name}</h3>
                  {profile.headline && (
                    <p className="text-gray-600 text-sm mt-1">{profile.headline}</p>
                  )}
                  {profile.location && (
                    <p className="text-gray-500 text-sm flex items-center gap-1 mt-2">
                      <MapPin className="h-3 w-3" />
                      {profile.location}
                    </p>
                  )}
                  <Button className="mt-4 w-full" variant="outline">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
        )}
      </main>
    </div>
  );
}