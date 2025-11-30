"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import { getToken } from "@/lib/auth"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, LogOut, User, ShieldCheck, Sparkles } from "lucide-react"; 

interface JwtPayload {
  username: string; 
  email: string;
  role: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedToken = getToken();

    if (!storedToken) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(storedToken);
      setUser(decoded);
    } catch (e) {
      handleLogout();
    }
  }, [router]);

  // --- MANUAL LOGOUT FUNCTION ---
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem("accessToken");
    }
    window.location.href = "/login"; 
  };

  if (!isMounted || !user) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-950 text-white z-50">
        <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-blue-200 font-medium tracking-wide animate-pulse">LOADING PROFILE...</p>
        </div>
      </div>
    );
  }

  return (
    // 1. FULL SCREEN BACKGROUND (Fixed position)
    <div className="fixed inset-0 w-full h-full bg-slate-950 overflow-hidden">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 bg-[url('/home-bg.jpg')] bg-cover bg-center opacity-60 scale-105"></div>
      
      {/* Dark Overlay Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-950/95 backdrop-blur-[2px]"></div>

      {/* Decorative Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>

      {/* 2. CENTERED CARD AREA */}
      <div className="absolute inset-0 flex items-center justify-center p-4 overflow-y-auto">
        
        {/* MAIN CARD */}
        <div className="relative z-10 w-full max-w-sm animate-in fade-in zoom-in duration-700">
            
            {/* Glass Card Container */}
            <Card className="bg-black/30 border border-white/10 text-white backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden ring-1 ring-white/10">
                
                {/* Banner */}
                <div className="h-36 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                </div>
                
                <CardContent className="px-8 pb-8 text-center relative">
                  
                  {/* Floating Avatar */}
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                      <div className="relative group cursor-default">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
                        <div className="relative w-32 h-32 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center text-5xl font-bold text-white shadow-2xl overflow-hidden">
                            <span className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
                                {user.username.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 border-4 border-slate-900 rounded-full" title="Online"></div>
                      </div>
                  </div>

                  {/* User Details */}
                  <div className="mt-20 space-y-1">
                      <h2 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
                        {user.username} 
                        <Sparkles size={16} className="text-yellow-400" fill="currentColor" />
                      </h2>
                      <p className="text-blue-200/80 font-medium text-sm">{user.email}</p>
                      
                      {/* Badges */}
                      <div className="flex justify-center gap-2 mt-5">
                         <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5 text-xs font-medium text-slate-300">
                            <User size={12} className="text-blue-400" />
                            {user.role || 'Member'}
                         </div>
                         <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5 text-xs font-medium text-slate-300">
                            <ShieldCheck size={12} className="text-emerald-400" />
                            Verified
                         </div>
                      </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full flex items-center gap-4 my-8">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1"></div>
                    <span className="text-xs text-slate-500 font-mono uppercase tracking-widest">Options</span>
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1"></div>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex flex-col gap-3">
                      
                      {/* Button 1: View Portfolio */}
                      <Button 
                        onClick={() => router.push('/')}
                        className="w-full bg-white text-slate-950 hover:bg-blue-50 font-bold h-12 rounded-xl shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
                      >
                        <Home size={18} className="group-hover:text-blue-600 transition-colors" />
                        View My Portfolio
                      </Button>

                      {/* Button 2: Log Out */}
                      <Button 
                        variant="ghost" 
                        onClick={handleLogout}
                        className="w-full text-slate-400 hover:text-red-400 hover:bg-red-500/10 h-12 rounded-xl transition-all flex items-center justify-center gap-2 group cursor-pointer"
                      >
                        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Log Out
                      </Button>

                  </div>

                </CardContent>
            </Card>

            <p className="text-center text-slate-600 text-[10px] mt-8 tracking-widest uppercase opacity-60">
                Secured by NestJS & Next.js
            </p>

        </div>
      </div>
    </div>
  );
}