'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { profileAPI } from '@/services/api';
import { Profile } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function ProfilePage() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const { user, isLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    
    if (!user) {
      router.push('/login');
      return;
    }

    loadProfile();
  }, [user, isLoading, router]);

  const loadProfile = async () => {
    try {
      const response = await profileAPI.getMyProfile();
      setProfile(response.data);
    } catch (error) {
      console.error('Failed to load profile:', error);
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

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center">Profile not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
<h1 className="text-2xl font-bold text-blue-600">Professional Profile</h1>
<div className="flex gap-2">
<Button variant="outline" onClick={() => router.push('/dashboard')}>
Dashboard
</Button>
<Button variant="destructive" onClick={handleLogout}>
Logout
</Button>
</div>
</div>
</header>
<main className="max-w-4xl mx-auto p-4 space-y-4 mt-6">
    {/* Profile Header Card */}
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
            <Button className="mt-4" onClick={() => router.push('/profile/edit')}>
              Edit Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* About Section */}
    {profile.about && (
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 whitespace-pre-wrap">{profile.about}</p>
        </CardContent>
      </Card>
    )}

    {/* Experience Section */}
    {profile.experiences && profile.experiences.length > 0 && (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {profile.experiences.map((exp) => (
            <div key={exp.id} className="border-l-2 border-gray-200 pl-4">
              <h3 className="font-semibold text-lg">{exp.title}</h3>
              <p className="text-gray-600">{exp.company}</p>
              {exp.location && (
                <p className="text-sm text-gray-500">{exp.location}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                {new Date(exp.startDate).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })}{' '}
                -{' '}
                {exp.current
                  ? 'Present'
                  : new Date(exp.endDate!).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })}
              </p>
              {exp.description && (
                <p className="text-gray-700 mt-2">{exp.description}</p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    )}

    {/* Education Section */}
    {profile.educations && profile.educations.length > 0 && (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Education
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {profile.educations.map((edu) => (
            <div key={edu.id} className="border-l-2 border-gray-200 pl-4">
              <h3 className="font-semibold text-lg">{edu.school}</h3>
              <p className="text-gray-600">
                {edu.degree}
                {edu.field && `, ${edu.field}`}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(edu.startDate).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })}{' '}
                -{' '}
                {edu.current
                  ? 'Present'
                  : new Date(edu.endDate!).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })}
              </p>
              {edu.description && (
                <p className="text-gray-700 mt-2">{edu.description}</p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    )}

    {/* Skills Section */}
    {profile.skills && profile.skills.length > 0 && (
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <Badge key={skill.id} variant="secondary">
                {skill.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    )}
  </main>
</div>
);
}