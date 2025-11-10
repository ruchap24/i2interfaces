'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { profileAPI, experienceAPI, educationAPI, skillAPI } from '@/services/api';
import { Profile } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function EditProfilePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    headline: '',
    location: '',
    about: '',
    photoUrl: '',
  });

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
      const profileData = response.data;
      setProfile(profileData);
      setFormData({
        name: profileData.name || '',
        headline: profileData.headline || '',
        location: profileData.location || '',
        about: profileData.about || '',
        photoUrl: profileData.photoUrl || '',
      });
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

 const handleSaveBasicInfo = async () => {
    setSaving(true);
    try {
      await profileAPI.updateProfile(formData);
      toast.success('Profile updated successfully!'); 
      await loadProfile();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile'); 
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteExperience = async (id: string) => {
    try {
      await experienceAPI.delete(id);
      toast.success('Experience deleted successfully!'); 
      await loadProfile();
    } catch (error: any) {
      toast.error('Failed to delete experience');  
    }
  };

  const handleDeleteEducation = async (id: string) => {
    try {
      await educationAPI.delete(id);
      toast.success('Education deleted successfully!');  
      await loadProfile();
    } catch (error: any) {
      toast.error('Failed to delete education'); 
    }
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      await skillAPI.delete(id);
      toast.success('Skill removed successfully!');  
      await loadProfile();
    } catch (error: any) {
      toast.error('Failed to remove skill');  
    }
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <Button 
              variant="ghost" 
              onClick={() => router.push('/profile')}
              className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 text-sm sm:text-base"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Profile
            </Button>
            <h1 className="text-lg sm:text-xl font-bold text-white">Edit Profile</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-6">
        <Card className="bg-[#0a0a0a] border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
                className="bg-[#1a1a1a] border-blue-500/20 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="headline" className="text-white">Headline</Label>
              <Input
                id="headline"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                placeholder="e.g., Software Engineer at Google"
                className="bg-[#1a1a1a] border-blue-500/20 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-white">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., San Francisco, CA"
                className="bg-[#1a1a1a] border-blue-500/20 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="photoUrl" className="text-white">Photo URL (or upload from gallery)</Label>
              <div className="flex gap-2">
                <Input
                  id="photoUrl"
                  value={formData.photoUrl}
                  onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                  className="bg-[#1a1a1a] border-blue-500/20 text-white placeholder:text-gray-500"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData({ ...formData, photoUrl: reader.result as string });
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="border-blue-500/20 text-blue-400 hover:bg-blue-500/10"
                >
                  Upload
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="about" className="text-white">About</Label>
              <Textarea
                id="about"
                value={formData.about}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                placeholder="Tell us about yourself..."
                rows={6}
                className="bg-[#1a1a1a] border-blue-500/20 text-white placeholder:text-gray-500"
              />
            </div>
            <Button 
              onClick={handleSaveBasicInfo} 
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#0a0a0a] border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Experience</CardTitle>
            <Button
              size="sm"
              onClick={() => router.push('/profile/edit/experience/new')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Experience
            </Button>
          </CardHeader>
          <CardContent>
            {profile?.experiences && profile.experiences.length > 0 ? (
              <div className="space-y-4">
                {profile.experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="flex justify-between items-start p-4 border border-blue-500/20 rounded-lg bg-[#1a1a1a]"
                  >
                    <div>
                      <h3 className="font-semibold text-white">{exp.title}</h3>
                      <p className="text-sm text-gray-400">{exp.company}</p>
                      <p className="text-xs text-gray-500 mt-1">
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
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/profile/edit/experience/${exp.id}`)}
                        className="border-blue-500/20 text-blue-400 hover:bg-blue-500/10"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteExperience(exp.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No experience added yet. Click "Add Experience" to get started.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#0a0a0a] border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Education</CardTitle>
            <Button
              size="sm"
              onClick={() => router.push('/profile/edit/education/new')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Education
            </Button>
          </CardHeader>
          <CardContent>
            {profile?.educations && profile.educations.length > 0 ? (
              <div className="space-y-4">
                {profile.educations.map((edu) => (
                  <div
                    key={edu.id}
                    className="flex justify-between items-start p-4 border border-blue-500/20 rounded-lg bg-[#1a1a1a]"
                  >
                    <div>
                      <h3 className="font-semibold text-white">{edu.school}</h3>
                      <p className="text-sm text-gray-400">
                        {edu.degree}
                        {edu.field && `, ${edu.field}`}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
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
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/profile/edit/education/${edu.id}`)}
                        className="border-blue-500/20 text-blue-400 hover:bg-blue-500/10"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteEducation(edu.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No education added yet. Click "Add Education" to get started.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#0a0a0a] border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Skills</CardTitle>
            <Button 
              size="sm" 
              onClick={() => router.push('/profile/edit/skills')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Skills
            </Button>
          </CardHeader>
          <CardContent>
            {profile?.skills && profile.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full"
                  >
                    <span className="text-sm text-blue-400">{skill.name}</span>
                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="text-gray-500 hover:text-red-400"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No skills added yet. Click "Add Skills" to get started.
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}