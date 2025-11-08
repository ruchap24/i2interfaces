"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { motion } from "framer-motion";
import { ShimmerButton } from "@/components/magic-ui/shimmer-button";
import { SmoothCursor } from "@/components/magic-ui/smooth-cursor";
import { Marquee } from "@/components/magic-ui/marque";
import { GeminiEffect } from "@/components/aceternity-ui/gemini-effect";
import { Zap, Users, Shield, Globe, TrendingUp, Code, Building2, Link2, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

export default function Home() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    if (user) {
      router.push('/home');
    }
    
    // Generate random stars
    const starArray = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
    }));
    setStars(starArray);
  }, [user, router]);


  const MagicBean = dynamic(() => import("@/components/ui/magic").then(m => ({ default: m.MagicBean })), {
    ssr: false,
    loading: () => null,
  });
  const FeaturesLazy = dynamic(() => import("@/components/ui/feature"), {
    ssr: false,
    loading: () => null,
  });


  const testimonials = [
    { name: "Sarah Chen", role: "Software Engineer", text: "Best platform for networking!" },
    { name: "Michael Johnson", role: "Product Manager", text: "Found my dream job here." },
    { name: "Emily Davis", role: "Designer", text: "Amazing community support." },
    { name: "David Wilson", role: "Developer", text: "Game changer for my career." },
    { name: "Lisa Anderson", role: "Marketing Lead", text: "Love the professional vibe." },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-blue-950 to-black">
      <SmoothCursor />
      
      {/* Twinkling Stars Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star absolute"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <nav className="relative z-50 w-full px-4 sm:px-6 md:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">∞</span>
            </div>
            <span className="text-white text-xl font-semibold">i2inter</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-white hover:text-blue-400 transition-colors text-sm font-medium"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all text-sm font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 md:px-8 z-10">

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              <span className="block text-white">Build Your Professional</span>
              <span className="block bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Profile & Connect
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-white/80 text-base sm:text-lg md:text-xl leading-relaxed">
              Not another social network. It's a professional network to showcase your experience, 
              skills, and achievements. Connect with like-minded professionals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            <ShimmerButton 
              onClick={() => router.push('/signup')}
              className="min-w-[200px]"
            >
              Get started - Free forever
            </ShimmerButton>
            
            <Link
              href="/login"
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              Or try our web version
            </Link>

           
          </motion.div>
        </div>
      </section>

      {/* Bottom App Preview Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Glow Effect Around Image */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 blur-3xl rounded-3xl -z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-blue-400/10 to-purple-400/10 blur-2xl rounded-3xl -z-20" />
            
            {/* App Preview Image */}
            <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-500/20">
              <div className="aspect-video bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] relative">
                {/* CSS-based App Interface Preview - Replace with dummy.png image if available */}
                <div className="absolute inset-0 p-8">
                  <div className="h-full flex gap-6">
                    {/* Sidebar */}
                    <div className="w-48 space-y-4">
                      <div className="h-8 bg-blue-500/20 rounded-lg" />
                      <div className="space-y-2">
                        {["My feed", "Network", "Jobs", "Messages", "Profile"].map((item, idx) => (
                          <div key={idx} className="h-6 bg-white/5 rounded" />
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="h-12 bg-white/5 rounded-lg" />
                      <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((idx) => (
                          <div key={idx} className="h-32 bg-white/5 rounded-lg p-4 space-y-2">
                            <div className="h-4 bg-white/10 rounded w-3/4" />
                            <div className="h-3 bg-white/5 rounded w-full" />
                            <div className="h-3 bg-white/5 rounded w-2/3" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

     
      <div>
         <FeaturesLazy forceDarkMode={true} />
      </div>
    
      <section className="relative py-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What People Say
            </h2>
            <p className="text-gray-400 text-lg">
              Join thousands of professionals already using our platform
            </p>
          </motion.div>
          
          <div className="relative overflow-hidden">
            <Marquee pauseOnHover reverse className="[--duration:25s]">
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="px-6 py-6 mx-2 rounded-lg bg-[#0a0a0a] border border-blue-500/20 hover:border-blue-500/40 transition-all min-w-[300px]"
                >
                  <p className="text-white mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="text-blue-400 font-semibold">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      <section className="relative py-20 z-10">
        <GeminiEffect />
      </section>
    </div>
  );
}
