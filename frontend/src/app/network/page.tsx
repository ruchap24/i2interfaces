"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPlus, MapPin, Briefcase } from "lucide-react";

const dummyConnections = [
  { id: 1, name: "Alex Thompson", role: "Full Stack Developer", location: "San Francisco, CA", avatar: "", mutual: 5 },
  { id: 2, name: "Jessica Martinez", role: "Product Designer", location: "New York, NY", avatar: "", mutual: 12 },
  { id: 3, name: "Ryan Kim", role: "DevOps Engineer", location: "Seattle, WA", avatar: "", mutual: 3 },
  { id: 4, name: "Maria Garcia", role: "Data Scientist", location: "Austin, TX", avatar: "", mutual: 8 },
  { id: 5, name: "James Wilson", role: "Backend Developer", location: "Boston, MA", avatar: "", mutual: 15 },
  { id: 6, name: "Sophie Brown", role: "Frontend Developer", location: "Chicago, IL", avatar: "", mutual: 7 },
];

export default function NetworkPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black relative z-10">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Network</h1>
          <p className="text-gray-400">Discover and connect with professionals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyConnections.map((person) => (
            <Card key={person.id} className="bg-[#0a0a0a] border-blue-500/20 hover:border-blue-500/40 transition-all">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={person.avatar} />
                    <AvatarFallback className="bg-blue-500/20 text-blue-400 text-2xl">
                      {person.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-white text-lg mb-1">{person.name}</h3>
                  <p className="text-blue-400 text-sm mb-2">{person.role}</p>
                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                    <MapPin className="h-3 w-3" />
                    <span>{person.location}</span>
                  </div>
                  <p className="text-gray-400 text-xs mb-4">
                    {person.mutual} mutual connections
                  </p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

