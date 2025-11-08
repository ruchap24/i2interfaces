"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TweetCardProps {
  author: string;
  username: string;
  avatar?: string;
  content: string;
  timestamp: string;
  likes?: number;
  comments?: number;
  className?: string;
}

export function TweetCard({
  author,
  username,
  avatar,
  content,
  timestamp,
  likes = 0,
  comments = 0,
  className,
}: TweetCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-4 rounded-lg bg-[#0a0a0a] border border-blue-500/20 hover:border-blue-500/40 transition-all",
        className
      )}
    >
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar} />
          <AvatarFallback className="bg-blue-500/20 text-blue-400">
            {author.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-white">{author}</span>
            <span className="text-gray-400 text-sm">@{username}</span>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-500 text-sm">{timestamp}</span>
            <button className="ml-auto text-gray-500 hover:text-white">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
          <p className="text-white mb-3 leading-relaxed">{content}</p>
          <div className="flex items-center gap-6 text-gray-400">
            <button
              onClick={handleLike}
              className={cn(
                "flex items-center gap-2 hover:text-blue-400 transition-colors",
                isLiked && "text-blue-400"
              )}
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
              <span className="text-sm">{likeCount}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{comments}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

