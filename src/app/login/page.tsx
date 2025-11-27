'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { saveToken } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { API_BASE } from '@/lib/config';

export default function LoginPage() {
  const router = useRouter();
  
  // 1. EMAIL STATE (Dapat email ang gamit pang-login)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Siguraduhin na tama ang URL
      const url = API_BASE ? `${API_BASE}/login` : 'https://nestjs-jnff.onrender.com/auth/login';

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 2. IPADALA ANG EMAIL SA BACKEND
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        setError(data.message || 'Login failed. Check your email/password.');
        setLoading(false);
        return;
      }

      // 3. SAVE TOKEN AT REDIRECT
      saveToken(data.accessToken || data.access_token);
      router.push('/dashboard');
      
    } catch (err) {
      setError('Connection failed. Please try again.');
      setLoading(false);
    }
  }

  return (
    // 1. BACKGROUND IMAGE (Consistent sa Register Page)
    <div className="min-h-screen w-full flex items-center justify-center px-4 relative bg-[url('/contact-bg.jpg')] bg-cover bg-center">
      
      {/* 2. DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

      {/* 3. GLASS CARD */}
      <Card className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border-white/10 text-white shadow-2xl animate-in fade-in zoom-in duration-500">
        
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-slate-300">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Email Input */}
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                    id="email"
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-black/20 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                    id="password"
                    type="password" 
                    placeholder="Enter your password" 
                    className="bg-black/20 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </div>
            
            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-300 text-sm text-center">
                    {error}
                </div>
            )}
            
            <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold h-11" 
                type="submit" 
                disabled={loading}
            >
                {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          <div className="text-center mt-6 pt-4 border-t border-white/10">
              <span className="text-sm text-slate-400">Don't have an account? </span>
              <Button 
                variant="link" 
                className="text-blue-300 hover:text-white p-0 h-auto font-semibold ml-1" 
                onClick={() => router.push('/register')}
              >
                 Register here
              </Button>
          </div>
        </CardContent>

      </Card>

    </div>
  );
}