'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { profileAPI } from '@//services/api';
import { Profile } from '@//types';
import { Button } from '@//components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@//components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@//components/ui/avatar';
import { Badge } from '@//components/ui/badge';
import { MapPin, Briefcase, GraduationCap, ArrowLeft } from 'lucide-react';

export default function PublicProfilePage() {
  const router = useRouter();
  const params = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      loadProfile(params.id as string);
    }
  }, [params.id]);

  const loadProfile = async (id: string) => {
    try {
      const response = await profileAPI.getProfile(id);
      setProfile(response.data);
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center">Profile not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => router.push('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-4 mt-6">
        {/* Same profile display as profile page, but without edit buttons */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-32 w-32">
                <AvatarImage src={profile.photoUrl || ''} />
                <AvatarFallback className="text-3xl">
                  {profile.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-3xl font-bold">{profile.name}</h2>
                {profile.headline && (
                  <p className="text-xl text-gray-600 mt-1">{profile.headline}</p>
                )}
                {profile.location && (
                  <p className="text-gray-500 flex items-center gap-1 mt-2">
                    <MapPin className="h-4 w-4" />
                    {profile.location}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rest of the profile sections (About, Experience, Education, Skills) - same as profile page */}
      </main>
    </div>
  );
}