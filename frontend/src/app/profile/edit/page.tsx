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

export default function EditProfilePage() {
  const router = useRouter();
  const { user } = useAuthStore();
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
    if (!user) {
      router.push('/login');
      return;
    }
    loadProfile();
  }, [user, router]);

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


  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Button variant="ghost" onClick={() => router.push('/profile')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Button>
          <h1 className="text-xl font-bold">Edit Profile</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-4 mt-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="headline">Headline</Label>
              <Input
                id="headline"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                placeholder="e.g., Software Engineer at Google"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., San Francisco, CA"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="photoUrl">Photo URL</Label>
              <Input
                id="photoUrl"
                value={formData.photoUrl}
                onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                placeholder="https://example.com/photo.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="about">About</Label>
              <Textarea
                id="about"
                value={formData.about}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                placeholder="Tell us about yourself..."
                rows={6}
              />
            </div>
            <Button onClick={handleSaveBasicInfo} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardContent>
        </Card>

        {/* Experience Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Experience</CardTitle>
            <Button
              size="sm"
              onClick={() => router.push('/profile/edit/experience/new')}
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
                    className="flex justify-between items-start p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold">{exp.title}</h3>
                      <p className="text-sm text-gray-600">{exp.company}</p>
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
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteExperience(exp.id)}
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

        {/* Education Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Education</CardTitle>
            <Button
              size="sm"
              onClick={() => router.push('/profile/edit/education/new')}
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
                    className="flex justify-between items-start p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold">{edu.school}</h3>
                      <p className="text-sm text-gray-600">
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
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteEducation(edu.id)}
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

        {/* Skills Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Skills</CardTitle>
            <Button size="sm" onClick={() => router.push('/profile/edit/skills')}>
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
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full"
                  >
                    <span className="text-sm">{skill.name}</span>
                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="text-gray-500 hover:text-red-600"
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