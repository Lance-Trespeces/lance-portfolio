import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 relative bg-[url('/home-bg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px]"></div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-8 max-w-3xl px-4 animate-in fade-in zoom-in duration-1000">
        
        {/* PROFILE PICTURE */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <img 
            src="/profile.jpg" 
            alt="Lance Trespeces" 
            className="relative w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-slate-900 shadow-2xl"
          />
        </div>

        {/* HEADLINES */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Lance</span>
          </h1>
          
          {/* --- DITO NATIN PINALITAN --- */}
          <p className="text-xl md:text-2xl font-medium text-blue-200">
            Aspiring Web Developer & UI/UX Enthusiast
          </p>
          {/* --------------------------- */}
          
          <p className="text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            "Technology is the future, and I am here to build it." <br/>
            Welcome to my personal space where I showcase my journey, skills, and passion.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
          
          <Link href="/contact">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20 transition-all hover:scale-105">
              Let's Talk 🚀
            </Button>
          </Link>

          <Link href="/about">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 transition-all hover:scale-105">
              More About Me
            </Button>
          </Link>
        
        </div>

      </div>
    </main>
  );
}