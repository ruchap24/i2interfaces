"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function ShimmerButton({
  children,
  className,
  shimmerColor = "#3b82f6",
  shimmerSize = "0.05em",
  shimmerDuration = "3s",
  borderRadius = "100px",
  background = "rgba(0, 0, 0, 0.8)",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  shimmerDuration?: string;
  borderRadius?: string;
  background?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      style={
        {
          "--shimmer-color": shimmerColor,
          "--shimmer-size": shimmerSize,
          "--shimmer-duration": shimmerDuration,
          "--radius": borderRadius,
          "--background": background,
        } as React.CSSProperties
      }
      className={cn(
        "group/button relative z-10 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-blue-500/50 px-6 py-3 text-blue-400 transition-all duration-300 hover:border-blue-400 hover:text-blue-300 [background:var(--background)] [border-radius:var(--radius)]",
        "shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]",
        className
      )}
      {...props}
    >
      {/* spark container */}
      <div
        className={cn(
          "-z-30 blur-[2px]",
          "absolute inset-0 overflow-visible [container-type:size]"
        )}
      >
        {/* spark */}
        <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
          {/* spark before */}
          <div className="absolute -inset-full w-auto rotate-0 animate-spin-around [background:conic-gradient(from_calc(270deg-(var(--shimmer-size)*0.5)),transparent_0,var(--shimmer-color)_var(--shimmer-size),transparent_var(--shimmer-size))] [translate:0_0]" />
        </div>
      </div>
      {children}

      {/* Highlight */}
      <div
        className={cn(
          "insert-0 absolute size-full",
          "rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#3b82f6/20]",
          // transition
          "transition-opacity duration-300 ease-in-out",
          // on hover
          "group-hover/button:opacity-100 group-hover/button:duration-1000 group-hover/button:ease-out"
        )}
      />

      {/* backdrop */}
      <div
        className={cn(
          "absolute -z-20 [background:var(--background)] [border-radius:var(--radius)] [inset:var(--shimmer-size)]"
        )}
      />
    </button>
  );
}

