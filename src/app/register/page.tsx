'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {API_BASE} from '@/lib/config';

export default function RegisterPage() {
  const router = useRouter();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. HARDCODED URL (Para sure na tatama sa Backend mo)
      const res = await fetch(`${API_BASE}/auth/register`,
        {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      // 2. ERROR HANDLING (Kung 500 Error, baka Duplicate)
      if (!res.ok) {
        // Subukang basahin ang error message mula sa server
        try {
            const data = await res.json();
            throw new Error(data.message || 'Registration failed.');
        } catch (jsonError) {
            // Kung hindi JSON ang balik (gaya ng 500 crash), ito ang error:
            throw new Error('Username or Email might already be taken.');
        }
      }

      alert("Registration successful! Please login.");
      router.push('/login');
      
    } catch (err: any) {
      setError(err.message || 'Connection failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 relative bg-[url('/contact-bg.jpg')] bg-cover bg-center">
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

      {/* Glass Card */}
      <Card className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border-white/10 text-white shadow-2xl animate-in fade-in zoom-in duration-500">
        
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Join the Team
          </CardTitle>
          <CardDescription className="text-slate-300">
            Create your account to access the dashboard
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-5">
            
            <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                    id="username"
                    placeholder="Choose a unique username" 
                    className="bg-black/20 border-white/10 text-white placeholder:text-slate-500 focus:border-purple-500"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                    id="email"
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-black/20 border-white/10 text-white placeholder:text-slate-500 focus:border-purple-500"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                    id="password"
                    type="password" 
                    placeholder="Create a password" 
                    className="bg-black/20 border-white/10 text-white placeholder:text-slate-500 focus:border-purple-500"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </div>
            
            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-300 text-sm text-center font-medium">
                    {error}
                </div>
            )}
            
            <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold h-11" 
                type="submit" 
                disabled={loading}
            >
                {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <div className="text-center mt-6 pt-4 border-t border-white/10">
              <span className="text-sm text-slate-400">Already have an account? </span>
              <Button 
                variant="link" 
                className="text-purple-300 hover:text-white p-0 h-auto font-semibold ml-1" 
                onClick={() => router.push('/login')}
              >
                 Log In
              </Button>
          </div>
        </CardContent>

      </Card>
    </div>
  );
}