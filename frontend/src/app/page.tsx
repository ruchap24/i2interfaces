"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { motion } from "framer-motion";
import { ShimmerButton } from "@/components/magic-ui/shimmer-button";
import { Marquee } from "@/components/magic-ui/marque";
import { GeminiEffect } from "@/components/aceternity-ui/gemini-effect";
import { Zap, Users, Shield, Globe, TrendingUp, Code, Building2, Link2, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Footer from "@/components/footer";

export default function Home() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    if (user) {
      router.push('/home');
    }
  }, [user, router]);
  
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
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0c0c2d] via-[#0a0a1f] to-black">
      <nav className="relative z-50 w-full px-4 sm:px-6 md:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">∞</span>
            </div>
            <span className="text-white text-xl font-semibold">I2Interfaces</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-white hover:text-blue-400 transition-colors text-sm font-medium"
            >
              Log in
            </Link>
            
            <ShimmerButton 
              onClick={() => router.push('/signup')}
              className="px-4 py-2 m-b-2"
              >
              Sign up
            </ShimmerButton>
           
          </div>
        </div>
      </nav>

      <section className="relative z-10 py-24 px-6 sm:px-6 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        
        {/* Hero content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8">
        
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight leading-tight">
              <span className="block text-white">Build Your Professional</span>
              <span className="block bg-gradient-to-r from-purple-400 via-blue-500 to-blue-500 bg-clip-text text-transparent">
                Profile & Connect
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-white/80 text-base sm:text-lg md:text-lg leading-relaxed">
              A professional network to showcase your experience, 
              skills, and achievements.
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
              className="min-w-[200px] m-b-2"
            >
              Get started
            </ShimmerButton>

          </motion.div>
        </div>
        <div className="max-w-7xl mx-auto pt-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-purple-500/30 blur-3xl rounded-3xl -z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-purple-400/20 blur-2xl rounded-3xl -z-20" />
            <div className="relative bg-gradient-to-b from-black/80 to-black/40 backdrop-blur-sm overflow-hidden p-4 sm:p-6 lg:p-8 rounded-2xl">
              <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 border-t-2 border-l-2 border-blue-500/50 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 border-t-2 border-r-2 border-blue-500/50 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 border-b-2 border-l-2 border-blue-500/50 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 border-b-2 border-r-2 border-blue-500/50 rounded-br-lg" />
              <div className="relative rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />
                <div
                  className="bg-cover bg-center w-full h-80 sm:h-[500px] lg:h-[700px] flex items-center justify-center text-white text-xl sm:text-2xl lg:text-3xl font-bold transform transition-transform duration-700 hover:scale-105"
                  style={{
                    backgroundImage: 'url("/home.png")',
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-purple-900/10 to-transparent animate-pulse" />
        <FeaturesLazy forceDarkMode={true} />
      </div>
      <section className="relative py-20 z-10 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent">
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
            <Marquee pauseOnHover className="[--duration:25s]">
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
             <Marquee reverse pauseOnHover className="[--duration:25s]">
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
      <div className="bg-gradient-to-b from-black via-blue-950/10 to-black py-8 md:py-16 flex items-center justify-center overflow-hidden">
        <h1
          className="text-[clamp(3rem,10vw,12rem)] text-white uppercase tracking-[0.06em] leading-none select-none animate-pulse text-center whitespace-nowrap break-words px-4 max-w-[90vw]"
          style={{ fontFamily: 'Impact, "Arial Black", "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Bold", sans-serif', fontWeight: 900, fontStretch: 'condensed' }}
        >
          i2interfaces
        </h1>
      </div>

      <Footer />
    </div>
  );
}
