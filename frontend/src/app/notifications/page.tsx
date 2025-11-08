"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, UserPlus, MessageSquare, Briefcase, Bell } from "lucide-react";

const dummyNotifications = [
  {
    id: 1,
    type: "like",
    user: "Sarah Chen",
    avatar: "",
    action: "liked your post",
    time: "5m ago",
    icon: Heart,
  },
  {
    id: 2,
    type: "connection",
    user: "Michael Johnson",
    avatar: "",
    action: "sent you a connection request",
    time: "1h ago",
    icon: UserPlus,
  },
  {
    id: 3,
    type: "message",
    user: "Emily Davis",
    avatar: "",
    action: "sent you a message",
    time: "2h ago",
    icon: MessageSquare,
  },
  {
    id: 4,
    type: "job",
    user: "Tech Corp",
    avatar: "",
    action: "posted a new job: Senior Developer",
    time: "3h ago",
    icon: Briefcase,
  },
  {
    id: 5,
    type: "like",
    user: "David Wilson",
    avatar: "",
    action: "liked your comment",
    time: "4h ago",
    icon: Heart,
  },
  {
    id: 6,
    type: "connection",
    user: "Alex Thompson",
    avatar: "",
    action: "accepted your connection request",
    time: "5h ago",
    icon: UserPlus,
  },
];

export default function NotificationsPage() {
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
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
          <p className="text-gray-400">Stay updated with your network activity</p>
        </div>

        <div className="space-y-3">
          {dummyNotifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <Card
                key={notification.id}
                className="bg-[#0a0a0a] border-blue-500/20 hover:border-blue-500/40 transition-all"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-blue-500/20">
                      <Icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={notification.avatar} />
                          <AvatarFallback className="bg-blue-500/20 text-blue-400 text-xs">
                            {notification.user.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <p className="text-white">
                          <span className="font-semibold">{notification.user}</span>{" "}
                          <span className="text-gray-400">{notification.action}</span>
                        </p>
                      </div>
                      <p className="text-gray-500 text-sm">{notification.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

