import Link from "next/link";

export default function Home() {
  // Mock holiday packages inspired by your database destinations
  const packages = [
    {
      id: 1,
      title: "Aman-i-Khas",
      location: "Ranthambore, Rajasthan",
      tag: "Wildlife & Desert",
      duration: "3 Nights / 4 Days",
      image: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=600&q=80",
      description: "A wilderness camp of grand proportions set alongside a tiger reserve."
    },
    {
      id: 2,
      title: "The Oberoi Udaivilas",
      location: "Udaipur, Rajasthan",
      tag: "Lakes & Palaces",
      duration: "4 Nights / 5 Days",
      image: "https://images.unsplash.com/photo-1598977123418-45f04b6144bc?auto=format&fit=crop&w=600&q=80",
      description: "A spectacular palace resort spread over 50 acres on the banks of Lake Pichola."
    },
    {
      id: 3,
      title: "Ananda in the Himalayas",
      location: "Rishikesh, Uttarakhand",
      tag: "Mountains & Wellness",
      duration: "5 Nights / 6 Days",
      image: "https://images.unsplash.com/photo-1545208597-3f9903c55047?auto=format&fit=crop&w=600&q=80",
      description: "A luxury spa resort located in the Himalayan foothills overlooking the Ganges."
    }
  ];

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1C352D]">
      
      {/* 1. HEADER / NAVIGATION */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-[#1C352D]/10">
        <h1 className="text-2xl font-serif tracking-tight font-bold">BEYOND MILES</h1>
        <div className="flex items-center gap-6">
          <Link href="/register" className="text-sm font-medium hover:text-[#C5A880] transition-colors">Sign In</Link>
          <Link href="/register" className="px-5 py-2.5 bg-[#1C352D] text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#1C352D]/90 transition-all">
            Create Profile
          </Link>
        </div>
      </header>

      {/* 2. HERO SEARCH BANNER (EaseMyTrip Style) */}
      <section className="relative bg-[#1C352D] text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold">Exquisite Indian Escapes</span>
          <h2 className="text-4xl md:text-5xl font-serif tracking-wide">Find Your Perfect Boutique Holiday</h2>
          <p className="text-[#FDFBF7]/70 text-sm md:text-base max-w-xl mx-auto font-light">
            Discover curated, premium routes built uniquely around your personal discovery metrics.
          </p>

          {/* Search Engine Bar */}
          <div className="pt-8 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-2xl shadow-xl flex flex-col md:flex-row gap-4 items-center text-[#1C352D]">
              <div className="w-full md:w-1/3 text-left px-4 py-2 border-b md:border-b-0 md:border-r border-[#1C352D]/10">
                <label className="block text-[10px] uppercase tracking-wider text-[#C5A880] font-bold mb-1">Where to?</label>
                <input type="text" placeholder="e.g., Rajasthan, Himalayas" className="w-full text-sm font-medium focus:outline-none bg-transparent" />
              </div>
              <div className="w-full md:w-1/3 text-left px-4 py-2 border-b md:border-b-0 md:border-r border-[#1C352D]/10">
                <label className="block text-[10px] uppercase tracking-wider text-[#C5A880] font-bold mb-1">Holiday Theme</label>
                <select className="w-full text-sm font-medium focus:outline-none bg-transparent appearance-none cursor-pointer">
                  <option>All Luxury Experiences</option>
                  <option>Wildlife & Desert</option>
                  <option>Lakes & Palaces</option>
                  <option>Mountains & Wellness</option>
                </select>
              </div>
              <div className="w-full md:w-1/3 px-2">
                <Link href="/register" className="w-full block text-center py-3.5 bg-[#C5A880] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#B3966E] transition-all">
                  Search Packages
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY TABS */}
      <section className="max-w-7xl mx-auto px-6 pt-12">
        <div className="flex gap-3 overflow-x-auto pb-4 border-b border-[#1C352D]/10 no-scrollbar">
          {["✨ All Holiday Packages", "🐆 Wildlife & Safari", "🏰 Royal Palaces", "🏔️ Mountain Retreats", "🧘 Wellness & Spa"].map((tab, i) => (
            <button 
              key={i} 
              className={`px-5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                i === 0 ? 'bg-[#1C352D] text-white' : 'bg-white text-[#1C352D]/80 border border-[#1C352D]/10 hover:border-[#1C352D]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* 4. HOLIDAY PACKAGES GRID */}
      <section className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <div>
          <h3 className="text-2xl font-serif">Trending Curated Itineraries</h3>
          <p className="text-xs text-[#1C352D]/60 mt-1">Handpicked boutique experiences rated exceptional by modern explorers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#1C352D]/5 transition-all flex flex-col h-full group">
              {/* Image & Floating Duration */}
              <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                <img 
                  src={pkg.image} 
                  alt={pkg.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md text-[#1C352D]">
                  {pkg.duration}
                </span>
              </div>

              {/* Package Details */}
              <div className="p-6 flex flex-col grow space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-semibold text-[#C5A880] uppercase tracking-widest">{pkg.tag}</span>
                  <span className="text-xs text-[#1C352D]/60 font-medium">📍 {pkg.location.split(',')[1].trim()}</span>
                </div>
                <h4 className="text-xl font-serif tracking-wide">{pkg.title}</h4>
                <p className="text-xs text-[#1C352D]/70 font-light leading-relaxed grow">
                  {pkg.description}
                </p>
                
                {/* View Details Call To Action */}
                <div className="pt-4 border-t border-[#1C352D]/5">
                  <Link href="/register" className="w-full block text-center py-3 bg-[#1C352D]/5 hover:bg-[#1C352D] text-[#1C352D] hover:text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all">
                    Explore Route Map
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
