/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FaPlay, FaChevronRight, FaRocket, FaCode,
  FaEye, FaSearch, FaUsers, FaFileAlt
} from 'react-icons/fa';
import { GlowingEffect } from "@/components/ui/glowing-effect";
import Glow from "@/components/ui/glow";
import { GoodText1 } from './GoodText';

const Features = ({ forceDarkMode = true }) => {
  const [activeFeature, setActiveFeature] = useState('feature 1');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);


  const premiumFeatures = [
    {
      id: 'feature 1',
      title: "feature 1",
      description: "",
      icon: <FaRocket />,
      imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1280&h=720&fit=crop"
    },
    {
      id: 'feature 2',
      title: "feature 2",
      description: "",
      icon: <FaCode />,
      imageSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1280&h=720&fit=crop"
    },
    {
      id: 'feature 3',
      title: "feature 3",
      description: "",
      icon: <FaFileAlt />,
      imageSrc: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1280&h=720&fit=crop"
    },
    {
      id: 'feature 4',
      title: "feature 4",
      description: "",
      icon: <FaEye />,
      imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280&h=720&fit=crop"
    },
    {
      id: 'feature 5',
      title: "feature 5",
      description: "",
      icon: <FaSearch />,
      imageSrc: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1280&h=720&fit=crop"
    },
    {
      id: 'feature 6',
      title: "feature 6",
      description: "",
      icon: <FaUsers />,
      imageSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1280&h=720&fit=crop"
    }
  ];

  const handleFeatureClick = (id: string) => {
    setActiveFeature(id);
  };

  const activeFeatureData = premiumFeatures.find(f => f.id === activeFeature);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Glow Effect */}
      <Glow variant="center" className="opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white transform-gpu">
                EXPLORE{' '}
                <span className="inline-block align-middle"><GoodText1 /></span>
              </h2>
            </div>
          </div>
          <p className="max-w-3xl mx-auto text-lg text-white/70 leading-relaxed">
          Everything you need to build your professional presence
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20">
          {/* Feature List - Mobile (icons + inline video) */}
          <div className="order-1 lg:order-1 grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
            {premiumFeatures.map((feature) => (
              <React.Fragment key={feature.id}>
                <button
                  onClick={() => handleFeatureClick(feature.id)}
                  aria-label={feature.title}
                  className={`group relative aspect-square rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                    activeFeature === feature.id ? 'ring-1 ring-blue-400/40 shadow-[0_0_16px_2px_rgba(80,180,255,0.18)]' : 'hover:border-white/20'
                  }`}
                >
                  <div className="text-white text-2xl">{feature.icon}</div>
                </button>
                {activeFeature === feature.id && (
                  <div className="col-span-2 -mt-1">
                    <div 
                      className="relative rounded-2xl border border-white/10 p-2 transition-all duration-300 hover:border-white/20 group"
                    >
                      <GlowingEffect
                        blur={0}
                        borderWidth={2}
                        spread={60}
                        glow={true}
                        disabled={false}
                        proximity={48}
                        inactiveZone={0.01}
                      />
                      <div className="relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-sm border border-white/5">
                        <div className="relative aspect-video w-full">
                          <img 
                            src={feature.imageSrc} 
                            alt={feature.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                        </div>
                        <div className="p-4 bg-black/40 backdrop-blur-sm">
                          <div className="flex items-center mb-2">
                            <div className="w-fit rounded-lg border border-white/20 bg-white/5 p-2 backdrop-blur-sm mr-3">
                              <div className="h-4 w-4 text-white">
                                {feature.icon}
                              </div>
                            </div>
                            <h3 className="font-sans text-lg font-semibold text-white">{feature.title}</h3>
                          </div>
                          <p className="text-sm text-white/70 leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Feature List - Desktop (full cards) */}
          <div className="hidden lg:flex lg:flex-col lg:gap-4">
            {premiumFeatures.map((feature) => (
              <div
                key={feature.id}
                className={`group relative cursor-pointer transition-all duration-300 rounded-2xl md:rounded-3xl overflow-hidden ${
                  activeFeature === feature.id 
                    ? 'scale-105 z-20 border-blue-400/30 -translate-y-1 shadow-[0_0_16px_2px_rgba(80,180,255,0.18)] bg-black/60' 
                    : 'hover:scale-105 hover:border-white/20'
                }`}
                style={
                  activeFeature === feature.id
                    ? {
                        borderColor: 'rgba(80,180,255,0.30)',
                        background: 'rgba(10,20,40,0.85)',
                        transform: 'scale(1.05) translateY(-4px)'
                      }
                    : undefined
                }
                onClick={() => handleFeatureClick(feature.id)}
              >
                <div className="relative rounded-2xl border border-white/10 p-2 transition-all duration-300 hover:border-white/20 md:rounded-3xl md:p-3">
                  <GlowingEffect
                    blur={0}
                    borderWidth={2}
                    spread={60}
                    glow={true}
                    disabled={false}
                    proximity={48}
                    inactiveZone={0.01}
                  />
                  <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl bg-black/40 backdrop-blur-sm p-6 border border-white/5 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
                    <div className="relative z-10 flex items-center">
                      <div className="w-fit rounded-lg border border-white/20 bg-white/5 p-2 backdrop-blur-sm mr-4">
                        <div className="h-4 w-4 text-white">
                          {feature.icon}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-white">
                          {feature.title}
                        </h3>
                      </div>
                      <div className={`transition-all duration-300 transform ${
                        activeFeature === feature.id 
                          ? 'text-white translate-x-2' 
                          : 'text-white/50 group-hover:text-white/70 group-hover:translate-x-1'
                      }`}>
                        <FaChevronRight />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Video Section - Desktop/Tablet only */}
          <div className="hidden lg:block lg:order-2 col-span-1 lg:col-span-2">
            <div 
              className="relative rounded-2xl border border-white/10 p-2 transition-all duration-300 hover:border-white/20 md:rounded-3xl md:p-3 group"
              style={{
                transform: 'perspective(1000px) rotateX(2deg) rotateY(-2deg)',
              }}
            >
              <GlowingEffect
                blur={0}
                borderWidth={2}
                spread={60}
                glow={true}
                disabled={false}
                proximity={48}
                inactiveZone={0.01}
              />
              <div className="relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-sm border border-white/5 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
              <div className="relative aspect-video w-full">
                {activeFeatureData?.imageSrc && (
                  <img 
                    src={activeFeatureData.imageSrc} 
                    alt={activeFeatureData.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
              </div>

                <div className="p-6 bg-black/40 backdrop-blur-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-fit rounded-lg border border-white/20 bg-white/5 p-2 backdrop-blur-sm mr-3">
                      <div className="h-4 w-4 text-white">
                        {activeFeatureData?.icon}
                      </div>
                    </div>
                    <h3 className="-tracking-4 pt-0.5 font-sans text-2xl/[1.875rem] font-semibold text-balance text-white">{activeFeatureData?.title}</h3>
                  </div>
                  <p className="font-sans text-base/[1.375rem] text-white/70 leading-relaxed">{activeFeatureData?.description}</p>
                  {activeFeatureData?.id === 'generate-readme' && (
                    <div className="mt-5">
                      <Link href="/readme" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-all">
                        <FaPlay className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Features;