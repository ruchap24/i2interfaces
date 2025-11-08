"use client";

import { useRouter, usePathname } from 'next/navigation';
import { Home, Users, Briefcase, MessageSquare, Bell, Settings, DollarSign } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { AnimatedList } from '@/components/magic-ui/animated-list';
import { Bell as BellIcon } from 'lucide-react';

const notifications = [
  { id: 1, text: "John Doe liked your post", icon: <BellIcon className="h-4 w-4" /> },
  { id: 2, text: "New job opportunity: Senior Developer", icon: <BellIcon className="h-4 w-4" /> },
  { id: 3, text: "Sarah Chen sent you a message", icon: <BellIcon className="h-4 w-4" /> },
  { id: 4, text: "You have 3 new connection requests", icon: <BellIcon className="h-4 w-4" /> },
  { id: 5, text: "Your post got 10 new likes", icon: <BellIcon className="h-4 w-4" /> },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [showNotifications, setShowNotifications] = useState(false);

  if (!user || pathname === '/login' || pathname === '/signup' || pathname === '/feed-preferences') {
    return null;
  }

  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Users, label: 'My Network', path: '/network' },
    { icon: Briefcase, label: 'Jobs', path: '/jobs' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Bell, label: 'Notifications', path: null, action: () => setShowNotifications(!showNotifications) },
  ];

  const handleSalaryInsights = () => {
    router.push('/salary-insights');
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-blue-500/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-1">
            <h1 className="text-xl font-bold text-blue-400">i2inter</h1>
          </div>
          
          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else if (item.path) {
                      router.push(item.path);
                    }
                  }}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg transition-all",
                    isActive
                      ? "text-blue-400 bg-blue-500/10"
                      : "text-gray-400 hover:text-blue-400 hover:bg-blue-500/5"
                  )}
                  title={item.label}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              );
            })}
            
            <button
              onClick={handleSalaryInsights}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-500/5 transition-all"
              title="Salary Insights"
            >
              <DollarSign className="h-5 w-5" />
              <span className="hidden md:inline">Salary Insights</span>
            </button>
            <button
              onClick={() => router.push('/profile')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-500/5 transition-all"
              title="Profile"
            >
              <Settings className="h-5 w-5" />
              <span className="hidden md:inline">Settings</span>
            </button>
          </div>
        </div>
      </div>
      
      {showNotifications && (
        <div className="absolute top-16 right-4 w-80 bg-[#0a0a0a] border border-blue-500/20 rounded-lg p-4 shadow-xl">
          <h3 className="text-white font-semibold mb-4">Notifications</h3>
          <AnimatedList items={notifications} />
        </div>
      )}
    </nav>
  );
}

