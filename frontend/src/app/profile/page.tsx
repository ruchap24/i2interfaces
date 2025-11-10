'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { profileAPI } from '@/services/api';
import { Profile } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, GraduationCap, Camera, Edit } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export default function ProfilePage() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const { user, isLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        try {
          await profileAPI.updateProfile({ photoUrl: base64String });
          toast.success('Profile picture updated!');
          loadProfile();
        } catch (error) {
          toast.error('Failed to update profile picture');
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error('Failed to process image');
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

  if (!profile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Profile not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative z-10">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-6">
        <Card className="bg-[#0a0a0a] border-blue-500/20">
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
              <div className="relative mx-auto md:mx-0">
                <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                  <AvatarImage src={profile.photoUrl || ''} />
                  <AvatarFallback className="text-2xl sm:text-3xl bg-blue-500/20 text-blue-400">
                    {profile.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-1.5 sm:p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                >
                  <Camera className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">{profile.name}</h2>
                {profile.headline && (
                  <p className="text-base sm:text-xl text-gray-400 mt-1">{profile.headline}</p>
                )}
                {profile.location && (
                  <p className="text-gray-500 flex items-center justify-center md:justify-start gap-1 mt-2 text-sm sm:text-base">
                    <MapPin className="h-4 w-4" />
                    {profile.location}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base" 
                    onClick={() => router.push('/profile/edit')}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-blue-500/20 text-blue-400 hover:bg-blue-500/10 text-sm sm:text-base"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {profile.about && (
          <Card className="bg-[#0a0a0a] border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white">About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 whitespace-pre-wrap">{profile.about}</p>
            </CardContent>
          </Card>
        )}
        {profile.experiences && profile.experiences.length > 0 && (
          <Card className="bg-[#0a0a0a] border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Briefcase className="h-5 w-5" />
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {profile.experiences.map((exp) => (
                <div key={exp.id} className="border-l-2 border-blue-500/30 pl-4">
                  <h3 className="font-semibold text-lg text-white">{exp.title}</h3>
                  <p className="text-blue-400">{exp.company}</p>
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
                    <p className="text-gray-300 mt-2">{exp.description}</p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
        {profile.educations && profile.educations.length > 0 && (
          <Card className="bg-[#0a0a0a] border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <GraduationCap className="h-5 w-5" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {profile.educations.map((edu) => (
                <div key={edu.id} className="border-l-2 border-blue-500/30 pl-4">
                  <h3 className="font-semibold text-lg text-white">{edu.school}</h3>
                  <p className="text-blue-400">
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
                    <p className="text-gray-300 mt-2">{edu.description}</p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
        {profile.skills && profile.skills.length > 0 && (
          <Card className="bg-[#0a0a0a] border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white">Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <Badge key={skill.id} variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
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
