"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Image from "next/image";
import {
  ArrowRight,
  Search,
  MapPin,
  BookOpen,
  Menu, X, User, LogOut, Settings,
  Shield,
  Star,
  Users,
  Zap,
  CheckCircle,
  TrendingUp,
  Globe,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


export default function Home() {

  const stats = [
    { number: "10,000+", label: "Questions Answered", icon: BookOpen },
    { number: "500+", label: "Cities Covered", icon: Globe },
    { number: "98%", label: "User Satisfaction", icon: Star },
    { number: "24/7", label: "Available", icon: Clock },
  ];


   const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      router.push('/profile');
    }
  }, [user, router]);

  return (
    <div className="flex flex-col w-full">

      <section className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
         
          <div className="absolute inset-0 dark:hidden block">
            <Image
              src="/light1.jpeg"
              alt="Light theme background"
              fill
              className="object-cover object-center"
              priority
              quality={100}
              sizes="100vw"
            />
          </div>

          <div className="absolute inset-0 bg-background/60 dark:bg-background/70" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        </div>

        <div className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 py-16 w-full">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-6">
                <motion.h1
                  className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="block">Build Your Professional Profile &</span>
                  <span className="block bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                  Connect With Others
                  </span>
                </motion.h1>

                <motion.p
                  className="mx-auto max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Not another social network. It's a professional network to
                  showcase your experience, skills, and achievements.
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="min-w-[200px] h-12 group shadow-lg" onClick={() => router.push('/signup')}
                  >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                   
                    className="min-w-[200px] h-12 bg-background/60 backdrop-blur-sm border-primary/20" onClick={() => router.push('/login')}
                  >
                    Login
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}