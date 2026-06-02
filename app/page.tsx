import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-warm-white text-forest-green p-6 relative overflow-hidden">
      {/* Decorative premium background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sand-tone/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-forest-green/10 rounded-full blur-3xl" />
      
      <div className="max-w-3xl text-center space-y-8 z-10">
        <p className="text-sm font-semibold tracking-[0.2em] text-sand-tone uppercase">Welcome to</p>
        <h1 className="text-5xl md:text-7xl font-serif tracking-tight text-forest-green">
          Beyond Miles
        </h1>
        <p className="text-lg md:text-xl text-charcoal-accent/70 font-light max-w-2xl mx-auto leading-relaxed">
          Discover India's most extraordinary landscapes. Curated boutique routes designed exclusively for the premium traveler.
        </p>
        
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/register" 
            className="px-8 py-4 bg-forest-green text-white rounded-full text-sm font-medium tracking-wide uppercase hover:bg-forest-green/90 transition-all shadow-lg hover:shadow-xl"
          >
            Let's Start
          </Link>
        </div>
      </div>
    </main>
  );
}
