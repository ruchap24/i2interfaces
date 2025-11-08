"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Item = {
  id: number;
  text: string;
  icon?: React.ReactNode;
};

export function AnimatedList({ items }: { items: Item[] }) {
  const [displayedItems, setDisplayedItems] = useState<Item[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const interval = setInterval(() => {
      setDisplayedItems((prev) => {
        if (prev.length < items.length) {
          return [...prev, items[prev.length]];
        }
        return prev;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [items]);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <AnimatePresence>
        {displayedItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 p-3 rounded-lg bg-[#0a0a0a] border border-blue-500/20 mb-2"
          >
            {item.icon && <div className="text-blue-400">{item.icon}</div>}
            <span className="text-white">{item.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

