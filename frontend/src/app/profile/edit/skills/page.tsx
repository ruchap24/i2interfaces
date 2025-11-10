'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { skillAPI } from '@/services/api';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

export default function AddSkillsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [skillName, setSkillName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName.trim()) {
      toast.error('Please enter a skill name');
      return;
    }

    setLoading(true);

    try {
      await skillAPI.create({ name: skillName.trim() });
      toast.success('Skill added successfully!');
      setSkillName('');
      router.push('/profile/edit');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add skill');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative z-10">
      <header className="bg-[#0a0a0a] border-b border-blue-500/20 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/profile/edit')}
            className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <Card className="bg-[#0a0a0a] border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white text-xl sm:text-2xl">Add Skill</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="skillName" className="text-white">Skill Name *</Label>
                <Input
                  id="skillName"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  placeholder="e.g., JavaScript, React, Node.js"
                  required
                  className="bg-[#1a1a1a] border-blue-500/20 text-white placeholder:text-gray-500 focus-visible:border-blue-400"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex-1 sm:flex-initial"
                >
                  {loading ? 'Adding...' : 'Add Skill'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/profile/edit')}
                  className="border-blue-500/20 text-blue-400 hover:bg-blue-500/10 flex-1 sm:flex-initial"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

