"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LayoutDashboard, LogIn, User, GraduationCap, Gamepad2, Mail } from "lucide-react"; 

export default function Home() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const token = getToken();

    if (!token) {
      // KUNG WALANG TOKEN, REDIRECT SA LOGIN
      router.push("/login");
    } else {
      // KUNG MAY TOKEN, PWEDE NA MAKITA ANG PORTFOLIO
      setIsAuthenticated(true);
    }
  }, [router]);

  // Habang naglo-load o nagre-redirect, magpakita ng loading screen
  if (!isMounted || !isAuthenticated) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-950 text-white z-50">
        <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-slate-400">Checking access...</p>
        </div>
      </div>
    );
  }

  // ITO NA ANG PORTFOLIO CONTENT (Lalabas lang kapag naka-login)
  return (
    <div className="fixed inset-0 w-full h-full bg-slate-950 overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/home-bg.jpg')] bg-cover bg-center opacity-50 scale-105"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-950/95 backdrop-blur-[2px]"></div>

      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>

      <div className="absolute inset-0 flex items-center justify-center p-4 overflow-y-auto">
        
        <Card className="relative z-10 w-full max-w-lg bg-black/30 border border-white/10 text-white backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden ring-1 ring-white/10 animate-in fade-in zoom-in duration-700">
            
            <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            <CardContent className="p-10 text-center flex flex-col items-center gap-8">
                
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                    <img 
                        src="/profile.jpg" 
                        alt="Lance Trespeces" 
                        className="relative w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-slate-900 shadow-2xl"
                    />
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-xl">
                        Lance <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Trespeces</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-blue-200 font-medium">
                        BSIT-2A Student <span className="text-slate-500 mx-2">|</span> Naga College Foundation
                    </p>
                    
                    <p className="text-slate-300 leading-relaxed italic opacity-90 text-sm md:text-base px-4">
                        "Technology is the future, and I am here to build it." <br/>
                        Welcome to my personal portfolio.
                    </p>
                </div>

                <div className="w-full pt-2">
                    <Link href="/dashboard" className="w-full">
                        <Button className="w-full h-14 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                            <LayoutDashboard size={22} /> Go to Dashboard
                        </Button>
                    </Link>
                </div>

            </CardContent>
        </Card>

        <div className="absolute bottom-6 text-slate-500 text-[10px] tracking-widest uppercase opacity-60">
            Powered by Next.js & NestJS
        </div>

      </div>
    </div>
  );
}