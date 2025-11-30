"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User, GraduationCap, Gamepad2, Mail, LayoutDashboard, LogIn } from "lucide-react"; 
import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check kung may token (Naka-login ba?)
  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, []);

  return (
    // 1. FULL SCREEN FIXED BACKGROUND
    <div className="fixed inset-0 w-full h-full bg-slate-950 overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/home-bg.jpg')] bg-cover bg-center opacity-50 scale-105"></div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/70 to-slate-950"></div>

      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>

      {/* 2. MAIN CONTENT (Centered) */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 space-y-8 animate-in fade-in zoom-in duration-1000">
        
        {/* Profile Picture */}
        <div className="relative mb-4 group cursor-pointer">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
          <img 
            src="/profile.jpg" 
            alt="Lance Trespeces" 
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-slate-900 shadow-2xl"
          />
        </div>

        {/* HEADLINES */}
        <div className="space-y-4 max-w-3xl">
          <h2 className="text-blue-400 font-semibold tracking-widest uppercase text-sm md:text-base">
          </h2>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-2xl">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Lance</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 font-light">
            Aspiring <span className="text-white font-medium">Web Developer</span> & <span className="text-white font-medium">IT Student</span>
          </p>
          
          <p className="text-base md:text-lg text-slate-400 max-w-lg mx-auto leading-relaxed pt-2">
            Building modern, accessible, and secure web applications. 
            Turning complex problems into simple, beautiful designs.
          </p>
        </div>

        {/* NOTE: Removed redundant navigation buttons here as requested since you have a top navbar */}

        {/* Footer */}
        <div className="absolute bottom-10 flex gap-6 opacity-60">
           <div className="text-slate-400 text-sm tracking-widest uppercase">
              • • • • • • • • • • • 
           </div>
        </div>

      </div>
    </div>
  );
}