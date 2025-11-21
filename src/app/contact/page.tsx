import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function Contact() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center py-20 px-4 relative bg-[url('/contact-bg.jpg')] bg-cover bg-center bg-fixed">
      
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-6xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Get in Touch
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* LEFT SIDE: CONTACT INFO */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-md shadow-2xl border-none overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <CardContent className="p-8 space-y-8">
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">Contact Information</h2>
                <p className="text-slate-400">Click below to connect with me.</p>
              </div>

              <div className="space-y-6">
                
                {/* 1. FACEBOOK LINK (Palitan mo yung href) */}
                <a 
                  href="https://www.facebook.com/lance.trespeces07"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group cursor-pointer p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                >
                  <div className="h-12 w-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    f
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Facebook</p>
                    <p className="text-lg font-medium text-white group-hover:text-blue-300 transition-colors">Lance B. Trespeces</p>
                  </div>
                </a>

                {/* 2. EMAIL LINK (Automatic na magbubukas ng Email app) */}
                <a 
                  href="mailto:lancetrespeces1234@gmail.com"
                  className="flex items-center gap-4 group cursor-pointer p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                >
                  <div className="h-12 w-12 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    @
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</p>
                    <p className="text-lg font-medium text-white group-hover:text-red-300 transition-colors break-all">
                      lancetrespeces1234@gmail.com
                    </p>
                  </div>
                </a>

                {/* 3. PHONE LINK (Automatic dial sa cellphone) */}
                <a 
                  href="tel:09928180082"
                  className="flex items-center gap-4 group cursor-pointer p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                >
                  <div className="h-12 w-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    📞
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</p>
                    <p className="text-lg font-medium text-white group-hover:text-green-300 transition-colors">0992 818 0082</p>
                  </div>
                </a>

              </div>

            </CardContent>
          </Card>

          {/* RIGHT SIDE: MESSAGE FORM */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-md shadow-2xl border-none">
             <div className="h-2 w-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
             <CardContent className="p-8">
               <form className="space-y-6">
                 <div className="grid gap-6 md:grid-cols-2">
                   <div className="space-y-2">
                     <Label htmlFor="name" className="text-slate-300">Name</Label>
                     <Input id="name" placeholder="John Doe" className="bg-black/20 border-white/10 text-white focus:border-purple-500 placeholder:text-slate-600" />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="email" className="text-slate-300">Email</Label>
                     <Input id="email" type="email" placeholder="john@example.com" className="bg-black/20 border-white/10 text-white focus:border-purple-500 placeholder:text-slate-600" />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="message" className="text-slate-300">Message</Label>
                   <Textarea id="message" placeholder="Write your message here..." className="min-h-[150px] bg-black/20 border-white/10 text-white focus:border-purple-500 placeholder:text-slate-600 resize-none" />
                 </div>
                 <Button className="w-full h-12 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-purple-500/25 transition-all">
                   Send Message 🚀
                 </Button>
               </form>
             </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}