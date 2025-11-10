"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Navbar } from "@/components/navbar";
import { TweetCard } from "@/components/magic-ui/tweet-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, UserPlus, Users, Hash } from "lucide-react";
import { profileAPI } from "@/services/api";
import { Profile } from "@/types";
import Image from "next/image";

const blogsAndNews = [
  {
    id: 1,
    title: "The Future of Web Development in 2025",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
    author: {
      name: "Alex Thompson",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      role: "Tech Journalist",
    },
    readTime: "5 min read",
    date: "Mar 15, 2025",
  },
  {
    id: 2,
    title: "AI Revolution in Software Development",
    category: "Artificial Intelligence",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    author: {
      name: "Sarah Chen",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      role: "AI Researcher",
    },
    readTime: "8 min read",
    date: "Mar 14, 2025",
  },
  {
    id: 3,
    title: "Best Practices for Remote Development Teams",
    category: "Work Culture",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    author: {
      name: "Michael Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      role: "Team Lead",
    },
    readTime: "6 min read",
    date: "Mar 13, 2025",
  },
];

const dummyPosts = [
  {
    id: 1,
    author: "Sarah Chen",
    username: "sarahchen",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    content:
      "Just launched my new project! Excited to share it with the community. Built with Next.js and TypeScript. Check it out! 🚀",
    // image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    timestamp: "2h",
    likes: 24,
    comments: 5,
  },
  {
    id: 2,
    author: "Michael Johnson",
    username: "mjohnson",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    content:
      "Looking for a senior React developer to join our team. Remote position, great benefits. DM if interested!",
    timestamp: "4h",
    likes: 12,
    comments: 8,
  },
  {
    id: 3,
    author: "Emily Davis",
    username: "emilyd",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    content:
      "Just completed my first blockchain project! The future of decentralized applications is here. #blockchain #web3",
    timestamp: "6h",
    likes: 45,
    comments: 12,
  },
  {
    id: 4,
    author: "David Wilson",
    username: "dwilson",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    content:
      "Sharing some insights from my latest infrastructure project. Kubernetes + Docker + CI/CD = 🎯",
    timestamp: "8h",
    likes: 18,
    comments: 3,
  },
  {
    id: 5,
    author: "Jack Davis",
    username: "emilyd",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    content:
      "Just completed my first blockchain project! The future of decentralized applications is here. #blockchain #web3",
    timestamp: "6h",
    likes: 45,
    comments: 12,
  },
  {
    id: 6,
    author: "David Wilson",
    username: "dwilson",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    content:
      "Sharing some insights from my latest infrastructure project. Kubernetes + Docker + CI/CD = 🎯",
    timestamp: "8h",
    likes: 18,
    comments: 3,
  },
];

const recommendedPeople = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Full Stack Developer",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 2,
    name: "Jessica Martinez",
    role: "Product Designer",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    id: 3,
    name: "Ryan Kim",
    role: "DevOps Engineer",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: 4,
    name: "Maria Garcia",
    role: "Data Scientist",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const communities = [
  { id: 1, name: "Web Developers", members: "12.5k", icon: "🌐" },
  { id: 2, name: "Blockchain Enthusiasts", members: "8.2k", icon: "⛓️" },
  { id: 3, name: "Startup Founders", members: "5.7k", icon: "🚀" },
  { id: 4, name: "Designers", members: "9.1k", icon: "🎨" },
   { id: 5, name: "App Developers", members: "12.5k", icon: "🌐" },
  { id: 6, name: "Web3", members: "8.2k", icon: "⛓️" },
];


export default function HomePage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    loadProfile();
  }, [user, router]);

  const loadProfile = async () => {
    try {
      const response = await profileAPI.getMyProfile();
      setProfile(response.data);
    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black relative z-10">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          <aside className="hidden lg:block lg:col-span-3 space-y-4 sm:space-y-6">
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
              <CardContent className="pt-6">
                <div
                  className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => router.push("/profile")}
                >
                  <Avatar className="h-20 w-20 mb-3">
                    <AvatarImage src={profile?.photoUrl || ""} />
                    <AvatarFallback className="bg-blue-500/20 text-blue-400 text-2xl">
                      {profile?.name?.charAt(0) || user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-white text-center">
                    {profile?.name || user?.name || "User"}
                  </h3>
                  {profile?.headline && (
                    <p className="text-sm text-gray-400 text-center mt-1">
                      {profile.headline}
                    </p>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3 text-blue-400 hover:text-blue-300"
                  >
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white text-lg">
                  Communities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {communities.map((community) => (
                  <div
                    key={community.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1a1a1a] cursor-pointer transition-colors"
                  >
                    <span className="text-2xl">{community.icon}</span>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">
                        {community.name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {community.members} members
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>

          <main className="lg:col-span-6 space-y-4 sm:space-y-6">
            <Card className="bg-[#0a0a0a] border-blue-500/20">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex gap-2 sm:gap-3">
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                    <AvatarImage src={profile?.photoUrl || ""} />
                    <AvatarFallback className="bg-blue-500/20 text-blue-400 text-sm sm:text-base">
                      {profile?.name?.charAt(0) || user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <textarea
                      placeholder="What's on your mind?"
                      className="w-full bg-[#1a1a1a] border border-blue-500/20 rounded-lg p-2 sm:p-3 text-white placeholder:text-gray-500 resize-none focus:outline-none focus:border-blue-500/40 text-sm sm:text-base"
                      rows={3}
                    />
                    <div className="flex justify-end mt-2 sm:mt-3">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 sm:px-4">
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3 sm:space-y-4">
              {dummyPosts.map((post) => (
                <Card key={post.id} className="bg-gradient-to-br from-gray-900 to-gray-800 border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-blue-500/20 flex-shrink-0">
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback className="text-xs sm:text-sm">{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-white text-sm sm:text-base truncate">{post.author}</p>
                        <p className="text-xs sm:text-sm text-gray-400 truncate">
                          @{post.username} · {post.timestamp}
                        </p>
                      </div>
                    </div>
                    <p className="text-white mb-3 sm:mb-4 text-sm sm:text-base break-words">{post.content}</p>
                   
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>

          <aside className="hidden lg:block lg:col-span-3 space-y-4 sm:space-y-6">
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white text-lg">Recommended People</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendedPeople.map((person) => (
                  <div key={person.id} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={person.avatar} />
                      <AvatarFallback className="bg-blue-500/20 text-blue-400">
                        {person.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{person.name}</p>
                      <p className="text-gray-500 text-xs truncate">{person.role}</p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3"
                    >
                      <UserPlus className="h-3 w-3 mr-1" />
                      Connect
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-400" />
                  Trending Blogs & News
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {blogsAndNews.map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute bottom-2 left-2 text-xs text-white px-2 py-1 bg-blue-500/80 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={item.author.avatar} />
                        <AvatarFallback>{item.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm text-gray-400">{item.author.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.date} · {item.readTime}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}

