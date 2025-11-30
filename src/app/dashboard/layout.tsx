"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import { getToken } from "@/lib/auth"; 
// Ensure these imports match your file structure exactly
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

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem("accessToken");
    }
    window.location.href = "/login";
  };

  if (!isMounted || !user) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-950 text-white z-50">
        <p className="animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/home-bg.jpg')] bg-cover bg-center opacity-60 scale-105"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-950/95 backdrop-blur-[2px]"></div>
      
      <div className="absolute inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <div className="relative z-10 w-full max-w-sm animate-in fade-in zoom-in duration-700">
            {/* If Card causes error, this block is the suspect */}
            <Card className="bg-black/30 border border-white/10 text-white backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden ring-1 ring-white/10">
                <div className="h-36 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
                    {/* Noise texture removed to simplify */}
                </div>
                <CardContent className="px-8 pb-8 text-center relative">
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                      <div className="relative group cursor-default">
                        <div className="relative w-32 h-32 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center text-5xl font-bold text-white shadow-2xl overflow-hidden">
                            <span className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
                                {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                            </span>
                        </div>
                      </div>
                  </div>
                  <div className="mt-20 space-y-1">
                      <h2 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
                        {user.username} 
                        <Sparkles size={16} className="text-yellow-400" />
                      </h2>
                      <p className="text-blue-200/80 font-medium text-sm">{user.email}</p>
                  </div>
                  <div className="flex flex-col gap-3 mt-8">
                      <Button onClick={() => router.push('/')} className="w-full bg-white text-slate-950 hover:bg-blue-50 font-bold h-12 rounded-xl">
                        <Home size={18} className="mr-2" /> View My Portfolio
                      </Button>
                      <Button variant="ghost" onClick={handleLogout} className="w-full text-slate-400 hover:text-red-400 hover:bg-red-500/10 h-12 rounded-xl">
                        <LogOut size={18} className="mr-2" /> Log Out
                      </Button>
                  </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}