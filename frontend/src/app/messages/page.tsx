"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const dummyConversations = [
  { id: 1, name: "Sarah Chen", avatar: "", lastMessage: "Thanks for the help!", time: "2m ago", unread: 2 },
  { id: 2, name: "Michael Johnson", avatar: "", lastMessage: "Let's schedule a meeting", time: "1h ago", unread: 0 },
  { id: 3, name: "Emily Davis", avatar: "", lastMessage: "Great work on the project!", time: "3h ago", unread: 1 },
  { id: 4, name: "David Wilson", avatar: "", lastMessage: "Can you review this?", time: "5h ago", unread: 0 },
];

const dummyMessages = [
  { id: 1, sender: "other", text: "Hey! How are you doing?", time: "10:30 AM" },
  { id: 2, sender: "me", text: "I'm doing great, thanks! How about you?", time: "10:32 AM" },
  { id: 3, sender: "other", text: "Pretty good! Just working on some new features.", time: "10:35 AM" },
  { id: 4, sender: "me", text: "That sounds exciting! Would love to hear more about it.", time: "10:36 AM" },
];

export default function MessagesPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  const handleSend = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-black relative z-10">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Messages</h1>
          <p className="text-gray-400 text-sm sm:text-base">Connect and communicate with your network</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)]">
          <Card className="bg-[#0a0a0a] border-blue-500/20 lg:col-span-1 overflow-hidden flex flex-col">
            <CardContent className="p-0 flex-1 overflow-y-auto">
              {dummyConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`p-3 sm:p-4 border-b border-blue-500/10 cursor-pointer hover:bg-[#1a1a1a] transition-colors ${
                    selectedConversation === conv.id ? "bg-[#1a1a1a]" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                      <AvatarImage src={conv.avatar} />
                      <AvatarFallback className="bg-blue-500/20 text-blue-400 text-sm sm:text-base">
                        {conv.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-white font-medium truncate text-sm sm:text-base">{conv.name}</p>
                        <span className="text-gray-500 text-xs flex-shrink-0 ml-2">{conv.time}</span>
                      </div>
                      <p className="text-gray-400 text-xs sm:text-sm truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">{conv.unread}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-[#0a0a0a] border-blue-500/20 lg:col-span-2 flex flex-col hidden lg:flex">
            <CardContent className="p-0 flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
                {dummyMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[70%] rounded-lg p-2 sm:p-3 ${
                        msg.sender === "me"
                          ? "bg-blue-600 text-white"
                          : "bg-[#1a1a1a] text-white"
                      }`}
                    >
                      <p className="text-sm sm:text-base break-words">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === "me" ? "text-blue-200" : "text-gray-400"}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 sm:p-4 border-t border-blue-500/20">
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message..."
                    className="bg-[#1a1a1a] border-blue-500/20 text-white placeholder:text-gray-500 text-sm sm:text-base"
                  />
                  <Button
                    onClick={handleSend}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex-shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mobile: Show conversation details when selected */}
          {selectedConversation && (
            <Card className="bg-[#0a0a0a] border-blue-500/20 flex flex-col lg:hidden">
              <CardContent className="p-0 flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {dummyMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg p-3 ${
                          msg.sender === "me"
                            ? "bg-blue-600 text-white"
                            : "bg-[#1a1a1a] text-white"
                        }`}
                      >
                        <p className="text-sm break-words">{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender === "me" ? "text-blue-200" : "text-gray-400"}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 border-t border-blue-500/20">
                  <div className="flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Type a message..."
                      className="bg-[#1a1a1a] border-blue-500/20 text-white placeholder:text-gray-500 text-sm"
                    />
                    <Button
                      onClick={handleSend}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex-shrink-0"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

