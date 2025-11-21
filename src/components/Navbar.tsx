import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* LOGO SA KALIWA */}
        <Link href="/" className="font-bold text-xl flex items-center">
          Lance<span className="text-blue-600">Portfolio</span>
        </Link>

        {/* LINKS SA KANAN (UPPER RIGHT) */}
        <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
          <Link href="/education" className="hover:text-blue-600 transition-colors">Education</Link>
          <Link href="/hobbies" className="hover:text-blue-600 transition-colors">Hobbies</Link>
          
          {/* Contact Button */}
          <Link href="/contact">
            <Button size="sm" className="bg-slate-900 text-white hover:bg-blue-600">
              Contact Me
            </Button>
          </Link>
        </div>

      </div>
    </nav>
  );
}