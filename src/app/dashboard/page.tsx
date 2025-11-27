"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import { getToken, logoutUser } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Interface para sa Token Data
interface JwtPayload {
  sub: number; 
  username: string; 
  email: string;
  role: string; 
  exp: number; 
  iat: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Para iwas Hydration Error
    const storedToken = getToken();

    // Kung walang token, ibalik sa login
    if (!storedToken) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(storedToken);
      setUser(decoded);
      setToken(storedToken);
    } catch (e) {
      console.error("Token decoding failed:", e);
      logoutUser(); // Kung sira ang token, auto-logout
    }
  }, [router]);

  // Loading state habang inaantay ang client-side render
  if (!isMounted || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-slate-800"></div>
          <div className="h-4 w-32 bg-slate-800 rounded"></div>
          <p className="text-slate-500 text-sm">Loading secure dashboard...</p>
        </div>
      </div>
    );
  }

  // Convert timestamps to readable dates
  const loginTime = new Date(user.iat * 1000).toLocaleString();
  const expiryTime = new Date(user.exp * 1000).toLocaleString();

  return (
    <div className="min-h-screen w-full bg-[url('/home-bg.jpg')] bg-cover bg-center bg-fixed relative">
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>

      <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* HEADER SECTION (Wala nang Sign Out button dito) */}
        <div className="border-b border-white/10 pb-6">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Dashboard
            </h1>
            <p className="text-slate-400 mt-1">
              Welcome back, <span className="text-blue-400 font-semibold">{user.username}</span>. Here is your session overview.
            </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT: PROFILE CARD */}
          <Card className="lg:col-span-1 bg-white/5 border-white/10 text-white backdrop-blur-md overflow-hidden shadow-2xl">
            {/* Gradient Header sa Card */}
            <div className="h-24 bg-gradient-to-r from-blue-600 to-purple-600 relative">
               <div className="absolute -bottom-12 left-6">
                  {/* Avatar Circle */}
                  <div className="w-24 h-24 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center text-4xl font-bold text-white shadow-xl">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
               </div>
            </div>
            
            <CardContent className="pt-16 px-6 pb-6">
              <h2 className="text-2xl font-bold capitalize">{user.username}</h2>
              <p className="text-slate-400 text-sm mb-4">{user.email || 'No email provided'}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                 <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
                    Role: {user.role || 'User'}
                 </span>
                 <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                    Status: Active
                 </span>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10 text-sm">
                <div className="flex justify-between">
                    <span className="text-slate-500">User ID</span>
                    <span className="font-mono text-slate-300">#{user.sub}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-500">Access Level</span>
                    <span className="text-slate-300">Full Access</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RIGHT: SESSION & TOKEN INFO */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Session Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-slate-400">Session Started</CardDescription>
                        <CardTitle className="text-lg font-medium text-emerald-300">
                            {loginTime}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-slate-400">Session Expires</CardDescription>
                        <CardTitle className="text-lg font-medium text-amber-300">
                            {expiryTime}
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>

            {/* TOKEN TERMINAL */}
            <Card className="bg-black/40 border-white/10 text-white overflow-hidden shadow-2xl">
                <CardHeader className="bg-white/5 border-b border-white/5 py-3 px-6 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-2 text-xs font-mono text-slate-400">auth_token.json</span>
                    </div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Developer Mode</div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="p-6 overflow-x-auto max-h-[200px] scrollbar-thin scrollbar-thumb-slate-700">
                        <p className="text-xs text-slate-500 mb-2">// This is your encrypted JWT Access Token</p>
                        <code className="font-mono text-xs text-blue-400 break-all leading-relaxed">
                            {token}
                        </code>
                    </div>
                </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}