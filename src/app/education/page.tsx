import { Card, CardContent } from "@/components/ui/card";

export default function Education() {
  return (
    // 1. BACKGROUND
    <div className="min-h-screen w-full flex flex-col items-center py-20 px-4 relative bg-[url('/campus-bg.jpg')] bg-cover bg-center bg-fixed">
      
      {/* 2. LIGHTER OVERLAY (Binawasan ko ang pagka-dark para kita ang school) */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

      <div className="relative z-10 w-full max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* HEADER */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 drop-shadow-md">
            Academic Journey
          </h1>
          <p className="text-white text-lg max-w-2xl mx-auto drop-shadow-md font-medium">
            My educational background and the foundation of my technical skills.
          </p>
        </div>
        
        {/* MAIN CARD (Semi-Transparent Dark Glass) */}
        <Card className="shadow-2xl overflow-hidden bg-black/60 backdrop-blur-md border-white/10 border-none text-white">
          
          {/* COVER PHOTO INSIDE CARD */}
          <div className="relative h-48 md:h-64">
            <img 
              src="/ncf-bg.jpg" 
              alt="NCF Campus" 
              className="w-full h-full object-cover"
            />
            {/* Gradient sa baba ng cover photo para smooth ang transition */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
          </div>

          <CardContent className="relative px-6 pb-8 pt-0">
            
            {/* LOGO & HEADER */}
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-12 mb-8 gap-6">
              
              {/* LOGO */}
              <div className="w-32 h-32 rounded-full border-4 border-slate-800 shadow-2xl bg-white flex items-center justify-center overflow-hidden shrink-0">
                <img 
                  src="/ncf-logo.png" 
                  alt="NCF Logo" 
                  className="w-full h-full object-contain p-1"
                />
              </div>

              {/* SCHOOL NAME */}
              <div className="text-center md:text-left mb-2 flex-1 space-y-1">
                <h2 className="text-3xl font-bold text-white tracking-tight drop-shadow-lg">Naga College Foundation, Inc.</h2>
                <p className="text-lg text-blue-300 font-medium">Bachelor of Science in Information Technology</p>
                <p className="text-slate-300 text-sm flex items-center justify-center md:justify-start gap-1">
                  📍 Naga City, Camarines Sur
                </p>
              </div>

              {/* YEAR BADGE */}
              <div className="mb-4 md:mb-2">
                 <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg border border-blue-400">
                   2025 - Present
                 </span>
              </div>
            </div>

            {/* INFO GRID */}
            <div className="grid md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
              
              {/* Left Side: Status */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-blue-300 flex items-center gap-2">
                  🎓 Current Status
                </h3>
                <div className="ml-2 pl-4 border-l-2 border-blue-500 space-y-1">
                  <p className="text-xl font-semibold text-white">2nd Year Student</p>
                  <p className="text-slate-300">Section A (BSIT-2A)</p>
                </div>
              </div>

              {/* Right Side: Subjects */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-purple-300 flex items-center gap-2">
                  📚 Relevant Coursework
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Computer Programming", "Data Structures", "Web Systems", "Networking 1", "HCI"].map((subject) => (
                    <span 
                      key={subject} 
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 text-slate-100 text-sm rounded-md border border-white/10 transition-colors cursor-default"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}