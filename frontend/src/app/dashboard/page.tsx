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
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative z-10">
      <header className="bg-[#0a0a0a] border-b border-blue-500/20 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <h1 className="text-xl sm:text-2xl font-bold text-blue-400">Professional Network</h1>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                onClick={() => router.push('/profile')}
                className="flex-1 sm:flex-initial border-blue-500/20 text-blue-400 hover:bg-blue-500/10"
              >
                My Profile
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleLogout}
                className="flex-1 sm:flex-initial bg-red-600 hover:bg-red-700"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">All Professionals</h2>
        {profiles.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-400 text-base sm:text-lg mb-3 sm:mb-4">No profiles found yet.</p>
            <p className="text-gray-500 text-sm sm:text-base mb-4 sm:mb-6 px-4">
              Be the first to create a profile, or seed the database with dummy data.
            </p>
            <Button 
              onClick={() => router.push('/profile')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Create Your Profile
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {profiles.map((profile) => (
            <Card
              key={profile.id}
              className="cursor-pointer bg-[#0a0a0a] border-blue-500/20 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition-all"
              onClick={() => router.push(`/public-profile/${profile.id}`)}
            >
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 sm:h-24 sm:w-24 mb-3 sm:mb-4">
                    <AvatarImage src={profile.photoUrl || ''} />
                    <AvatarFallback className="text-xl sm:text-2xl bg-blue-500/20 text-blue-400">
                      {profile.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-base sm:text-lg text-white">{profile.name}</h3>
                  {profile.headline && (
                    <p className="text-gray-400 text-xs sm:text-sm mt-1 line-clamp-2">{profile.headline}</p>
                  )}
                  {profile.location && (
                    <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-1 mt-2">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{profile.location}</span>
                    </p>
                  )}
                  <Button 
                    className="mt-3 sm:mt-4 w-full border-blue-500/20 text-blue-400 hover:bg-blue-500/10" 
                    variant="outline"
                  >
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