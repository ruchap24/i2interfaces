"use client"

import React from "react"
import { Linkedin, Twitter, Instagram, Youtube } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#1d1c20] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
        <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-6">
          <div className="flex flex-col items-start space-y-3">
            <div className="flex items-center space-x-2 bg-black rounded-lg px-2 py-4">
              <img src="i2inter.png" alt="logo" className="h-5 sm:h-6 w-auto" />
            </div>
            <p className="text-xs text-neutral-300 max-w-sm">
              Connect, collaborate, and grow your professional network. Discover
              opportunities, build your career, and share your expertise with
              others across the world.
            </p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            {[Linkedin, Twitter, Instagram, Youtube].map((Icon, idx) => (
              <Link
                key={idx}
                href="#"
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-neutral-600 rounded-full hover:border-[#0a66c2] hover:text-[#0a66c2] transition-colors"
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <h4 className="text-[#0a66c2] font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
          <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-neutral-300">
            {[
              "About Us",
              "Careers",
              "Contact Us",
              "Privacy Policy",
              "Terms & Conditions",
              "Help Center",
            ].map((item) => (
              <li key={item} className="hover:text-[#0a66c2] cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 md:mt-0">
          <h4 className="text-[#0a66c2] font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Explore</h4>
          <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-neutral-300">
            {[
              "Jobs",
              "People",
              "Companies",
              "Learning",
              "Events",
            ].map((item) => (
              <li key={item} className="hover:text-[#0a66c2] cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 lg:mt-0">
          <h4 className="text-[#0a66c2] font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Resources</h4>
          <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-neutral-300">
            {[
              "Blog",
              "Guides",
              "Community",
              "Developer Tools",
            ].map((item) => (
              <li key={item} className="hover:text-[#0a66c2] cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 lg:mt-0">
          <h4 className="text-[#0a66c2] font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Connect</h4>
          <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-neutral-300">
            {[
              "Join Now",
              "Create Profile",
              "Find Connections",
              "Message Recruiters",
            ].map((item) => (
              <li key={item} className="hover:text-[#0a66c2] cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-800 mt-8 pt-4 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} I2Interfaces — All rights reserved.
      </div>
    </footer>
  )
}
