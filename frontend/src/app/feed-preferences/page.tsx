'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { ShimmerButton } from '@/components/magic-ui/shimmer-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Briefcase, Code, Globe, Building2, Link2, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const categories = [
  { id: 'jobs', label: 'Job Openings', icon: Briefcase },
  { id: 'build', label: 'Build in Public', icon: Zap },
  { id: 'app', label: 'App Development', icon: Code },
  { id: 'web', label: 'Web Development', icon: Globe },
  { id: 'blockchain', label: 'Blockchain', icon: Link2 },
  { id: 'infrastructure', label: 'Infrastructure', icon: Building2 },
  { id: 'all', label: 'All', icon: CheckCircle2 },
];

export default function FeedPreferencesPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleToggle = (categoryId: string) => {
    if (categoryId === 'all') {
      setSelectedCategories(selectedCategories.length === categories.length - 1 ? [] : categories.map(c => c.id));
    } else {
      setSelectedCategories(prev => 
        prev.includes(categoryId) 
          ? prev.filter(id => id !== categoryId)
          : [...prev, categoryId]
      );
    }
  };

  const handleContinue = () => {
    if (selectedCategories.length === 0) {
      toast.error('Please select at least one category');
      return;
    }
    localStorage.setItem('feedPreferences', JSON.stringify(selectedCategories));
    toast.success('Preferences saved!');
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8 sm:py-12 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full"
      >
        <Card className="bg-[#0a0a0a] border-blue-500/20">
          <CardHeader className="px-4 sm:px-6 pt-6 sm:pt-8">
            <CardTitle className="text-white text-2xl sm:text-3xl text-center">
              Customize Your Feed
            </CardTitle>
            <p className="text-gray-400 text-center mt-2 text-sm sm:text-base px-2">
              Select the types of posts you want to see in your feed
            </p>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-6 sm:pb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {categories.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategories.includes(category.id);
                return (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => handleToggle(category.id)}
                      className={`w-full p-4 sm:p-6 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-blue-500/20 bg-[#1a1a1a] hover:border-blue-500/40'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2 sm:gap-3">
                        <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${isSelected ? 'text-blue-400' : 'text-gray-400'}`} />
                        <span className={`font-semibold text-sm sm:text-base ${isSelected ? 'text-blue-400' : 'text-white'}`}>
                          {category.label}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                        )}
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
            <div className="flex justify-center">
              <ShimmerButton onClick={handleContinue} className="min-w-[200px]">
                Continue
              </ShimmerButton>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

