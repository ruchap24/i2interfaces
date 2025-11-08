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

const dummyPosts = [
  {
    id: 1,
    author: "Sarah Chen",
    username: "sarahchen",
    avatar: "",
    content: "Just launched my new project! Excited to share it with the community. Built with Next.js and TypeScript. Check it out! 🚀",
    timestamp: "2h",
    likes: 24,
    comments: 5,
  },
  {
    id: 2,
    author: "Michael Johnson",
    username: "mjohnson",
    avatar: "",
    content: "Looking for a senior React developer to join our team. Remote position, great benefits. DM if interested!",
    timestamp: "4h",
    likes: 12,
    comments: 8,
  },
  {
    id: 3,
    author: "Emily Davis",
    username: "emilyd",
    avatar: "",
    content: "Just completed my first blockchain project! The future of decentralized applications is here. #blockchain #web3",
    timestamp: "6h",
    likes: 45,
    comments: 12,
  },
  {
    id: 4,
    author: "David Wilson",
    username: "dwilson",
    avatar: "",
    content: "Sharing some insights from my latest infrastructure project. Kubernetes + Docker + CI/CD = 🎯",
    timestamp: "8h",
    likes: 18,
    comments: 3,
  },
];

const recommendedPeople = [
  { id: 1, name: "Alex Thompson", role: "Full Stack Developer", avatar: "" },
  { id: 2, name: "Jessica Martinez", role: "Product Designer", avatar: "" },
  { id: 3, name: "Ryan Kim", role: "DevOps Engineer", avatar: "" },
  { id: 4, name: "Maria Garcia", role: "Data Scientist", avatar: "" },
];

const communities = [
  { id: 1, name: "Web Developers", members: "12.5k", icon: "🌐" },
  { id: 2, name: "Blockchain Enthusiasts", members: "8.2k", icon: "⛓️" },
  { id: 3, name: "Startup Founders", members: "5.7k", icon: "🚀" },
  { id: 4, name: "Designers", members: "9.1k", icon: "🎨" },
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3 space-y-6">
            <Card className="bg-[#0a0a0a] border-blue-500/20">
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

            <Card className="bg-[#0a0a0a] border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Communities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {communities.map((community) => (
                  <div
                    key={community.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1a1a1a] cursor-pointer transition-colors"
                  >
                    <span className="text-2xl">{community.icon}</span>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{community.name}</p>
                      <p className="text-gray-500 text-xs">{community.members} members</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
          <main className="lg:col-span-6 space-y-6">
            <Card className="bg-[#0a0a0a] border-blue-500/20">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={profile?.photoUrl || ""} />
                    <AvatarFallback className="bg-blue-500/20 text-blue-400">
                      {profile?.name?.charAt(0) || user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <textarea
                      placeholder="What's on your mind?"
                      className="w-full bg-[#1a1a1a] border border-blue-500/20 rounded-lg p-3 text-white placeholder:text-gray-500 resize-none focus:outline-none focus:border-blue-500/40"
                      rows={3}
                    />
                    <div className="flex justify-end mt-3">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {dummyPosts.map((post) => (
                <TweetCard key={post.id} {...post} />
              ))}
            </div>
          </main>

          <aside className="lg:col-span-3 space-y-6">
            <Card className="bg-[#0a0a0a] border-blue-500/20">
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

            <div className="fixed bottom-8 right-8">
              <Button
                onClick={() => router.push("/profile")}
                className="rounded-full h-14 w-14 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/50"
                size="icon"
              >
                <Settings className="h-6 w-6" />
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

