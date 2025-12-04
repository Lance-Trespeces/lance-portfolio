'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent, useEffect } from 'react';
import { saveToken, getToken } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { API_BASE } from '@/lib/config';
import { LogIn, ArrowLeft } from "lucide-react"; 
import Link from 'next/link';


export default function LoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // --- CHECK LOGIN STATUS ---
  useEffect(() => {
    // If user is already logged in, redirect to dashboard immediately
    const token = getToken();
    if (token) {
      router.replace('/dashboard'); // use replace to avoid back button issues
    }
  }, [router]);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        setError(data.message || 'Login failed. Check your email/password.');
        setLoading(false);
        return;
      }

      saveToken(data.accessToken || data.access_token);
      
      // Force a hard navigation to dashboard to ensure state updates
      window.location.href = '/dashboard';
      
    } catch (err) {
      setError('Connection failed. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-slate-950 overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/home-bg.jpg')] bg-cover bg-center opacity-50 scale-105"></div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-950/95 backdrop-blur-[2px]"></div>

      {/* Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>

      {/* CENTERED CARD AREA */}
      <div className="absolute inset-0 flex items-center justify-center p-4 overflow-y-auto">
        
        <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-6">
            
            <Card className="w-full bg-black/30 border border-white/10 text-white backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden ring-1 ring-white/10 animate-in fade-in zoom-in duration-500">
                
                <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                <CardContent className="p-8 text-center">
                  
                  <div className="flex justify-center mb-6">
                     <div className="p-4 bg-white/5 rounded-full border border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                        <LogIn size={32} className="text-blue-400" />
                     </div>
                  </div>

                  <div className="space-y-2 mb-8">
                      <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
                        Welcome Back
                      </h1>
                      <p className="text-slate-400 text-sm">
                        Enter your credentials to access your account
                      </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-5 text-left">
                    
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-300 text-xs uppercase tracking-wide font-semibold pl-1">Email Address</Label>
                        <Input 
                            id="email"
                            type="email" 
                            placeholder="name@example.com" 
                            className="bg-black/20 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500 h-12 rounded-xl transition-all hover:bg-black/30"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-slate-300 text-xs uppercase tracking-wide font-semibold pl-1">Password</Label>
                        <Input 
                            id="password"
                            type="password" 
                            placeholder="••••••••" 
                            className="bg-black/20 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500 h-12 rounded-xl transition-all hover:bg-black/30"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-xs text-center font-medium animate-pulse">
                            {error}
                        </div>
                    )}
                    
                    <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold h-12 rounded-xl shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98] mt-4" 
                        type="submit" 
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Sign In"}
                    </Button>
                  </form>

                  <div className="text-center mt-8 pt-6 border-t border-white/10">
                      <span className="text-sm text-slate-400">Don't have an account? </span>
                      <Button 
                        variant="link" 
                        className="text-blue-300 hover:text-white p-0 h-auto font-semibold ml-1 underline decoration-blue-500/30 hover:decoration-blue-400" 
                        onClick={() => router.push('/register')}
                      >
                         Register here
                      </Button>
                  </div>

                </CardContent>
            </Card>

            {/* --- BACK TO PORTFOLIO LINK (Uses ArrowLeft Icon) --- */}
            <Link 
                href="/" 
                className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors text-sm font-medium opacity-80 hover:opacity-100"
            >
                <ArrowLeft size={16} /> Back to My Portfolio
            </Link>

        </div>

      </div>
    </div>
  );
}