import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center py-20 px-4 relative bg-[url('/about-bg.jpg')] bg-cover bg-center bg-fixed">
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-5xl space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* HEADER */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            About Me
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Get to know the person behind the code. Student, Athlete, and Future Innovator.
          </p>
        </div>
        
        {/* MAIN BIO CARD */}
        <Card className="border-none bg-white/10 backdrop-blur-md shadow-2xl overflow-hidden text-white">
          <div className="grid md:grid-cols-3">
            
            {/* --- DITO YUNG BINAGO NATIN (IMAGE SECTION) --- */}
            {/* Nilagyan natin ng padding (p-4) at frame para aesthetic */}
            <div className="relative h-[300px] md:h-auto bg-black/20 p-4 flex items-center justify-center">
              
              {/* AESTHETIC FRAME CONTAINER */}
              <div className="relative w-full h-full overflow-hidden rounded-2xl border-2 border-white/10 shadow-inner group">
                
                {/* PROFILE PICTURE */}
                <img 
                  src="/about-pic.jpg" 
                  alt="Lance Trespeces" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* SOFT GLOW OVERLAY (Optional Aesthetic Touch) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              </div>
            </div>
            {/* ------------------------------------------------ */}

            {/* RIGHT SIDE: BIO TEXT */}
            <div className="md:col-span-2 p-8 space-y-6 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-blue-200">Who is Lance?</h2>
              <div className="space-y-4 text-slate-200 text-lg leading-relaxed">
                <p>
                  I am <strong>Lance Trespeces</strong>, a 2nd-year <strong>Bachelor of Science in Information Technology</strong> student at <strong>Naga College Foundation</strong>.
                </p>
                <p>
                  Beyond the screen, I am fueled by movement and rhythm. Whether it's spiking a <strong>Volleyball</strong>, shooting hoops in <strong>Basketball</strong>, or expressing myself through <strong>Dancing</strong>, I bring the same discipline and energy to my code as I do to my passions.
                </p>
              </div>
            </div>

          </div>
        </Card>

        {/* SKILLS GRID */}
        <div className="grid gap-6 md:grid-cols-2">
          
          {/* Tech Stack */}
          <Card className="bg-black/40 border border-white/10 backdrop-blur-sm text-white p-6 hover:bg-black/50 transition-colors">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl font-bold text-cyan-400 flex items-center gap-3">
                💻 Tech Arsenal
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js", "React", "TypeScript", "Tailwind CSS", 
                  "UI/UX Design", "Networking", "Database Mgmt"
                ].map((skill) => (
                  <span key={skill} className="px-3 py-1.5 rounded-full bg-cyan-500/20 text-cyan-200 text-sm font-medium border border-cyan-500/30">
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Personal Strengths */}
          <Card className="bg-black/40 border border-white/10 backdrop-blur-sm text-white p-6 hover:bg-black/50 transition-colors">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl font-bold text-purple-400 flex items-center gap-3">
                ⚡ Personal Strengths
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-wrap gap-2">
                 {[
                  "Team Leadership", "Athletic Discipline", "Creative Rhythm", 
                  "Adaptability", "Time Management"
                ].map((skill) => (
                  <span key={skill} className="px-3 py-1.5 rounded-full bg-purple-500/20 text-purple-200 text-sm font-medium border border-purple-500/30">
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}