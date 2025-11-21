import { Card, CardContent } from "@/components/ui/card";

export default function Hobbies() {
  const hobbies = [
    {
      title: "Volleyball",
      description: "Playing as a team teaches me communication and trust. I love the thrill of every spike and save.",
      image: "/volleyball.jpg", 
    },
    {
      title: "Basketball",
      description: "Whether it's a pick-up game or competitive play, basketball keeps me physically fit and focused.",
      image: "/basketball.jpg", 
    },
    {
      title: "Dancing",
      description: "Dancing is my way of expressing emotions. It combines rhythm, discipline, and creativity.",
      image: "/dancing.jpg", 
    },
    {
      title: "Music",
      description: "Music is my escape. It fuels my study sessions and helps me relax after a long day at school.",
      image: "/music.jpg", 
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col py-20 px-4 relative bg-[url('/hobbies-bg.jpg')] bg-cover bg-center bg-fixed">
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* HEADER (Ginawa nating Gradient para terno sa About Page) */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 pb-2">
            My Passions
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Beyond coding and studying, these are the things that keep me energized.
          </p>
        </div>

        {/* GRID CARDS */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {hobbies.map((hobby, index) => (
            <Card 
              key={index} 
              // Added 'border-white/10' para may manipis na glass border
              className="group relative h-[450px] overflow-hidden rounded-2xl shadow-2xl border border-white/10 cursor-pointer bg-black/40"
            >
              {/* IMAGE */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={hobby.image} 
                  alt={hobby.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
              </div>

              {/* TEXT CONTENT */}
              <CardContent className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-white drop-shadow-md">
                  {hobby.title}
                </h2>
                
                {/* Description lilitaw pag hover */}
                <p className="text-sm text-slate-200 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {hobby.description}
                </p>
                
                {/* Blue Line Animation */}
                <div className="w-12 h-1 bg-blue-500 mt-4 rounded-full group-hover:w-full transition-all duration-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}