import Link from "next/link";

export default function Packages() {
  const searchResults = [
    {
      id: 1,
      title: "Royal Rajasthan Expedition",
      location: "Jaipur, Jodhpur, Udaipur",
      duration: "6 Nights / 7 Days",
      price: "₹85,000",
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
      highlights: ["Private Palace Tours", "Thar Desert Glamping", "Vintage Car Transfers"],
    },
    {
      id: 2,
      title: "Himalayan Wellness Retreat",
      location: "Rishikesh, Uttarakhand",
      duration: "4 Nights / 5 Days",
      price: "₹62,000",
      image: "https://images.unsplash.com/photo-1545208597-3f9903c55047?auto=format&fit=crop&w=800&q=80",
      highlights: ["Daily Spa Therapies", "Guided Meditation", "Organic Gourmet Meals"],
    },
    {
      id: 3,
      title: "Wilderness & Tigers",
      location: "Ranthambore, Rajasthan",
      duration: "3 Nights / 4 Days",
      price: "₹45,000",
      image: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=800&q=80",
      highlights: ["Exclusive Jeep Safaris", "Luxury Tent Stay", "Wildlife Expert Guide"],
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C352D] font-sans">
      {/* HEADER */}
      <header className="bg-[#1C352D] text-white py-6 px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-serif tracking-widest font-bold">BEYOND MILES</Link>
          <div className="text-sm text-[#C5A880] tracking-wider uppercase font-semibold">
            Search Results
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* LEFT SIDEBAR: FILTERS */}
        <aside className="w-full lg:w-1/4 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#1C352D]/10">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-[#1C352D]/10 pb-2">Filter By</h3>
            
            {/* Filter Group: Duration */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-[#1C352D]/60 uppercase mb-3">Duration</h4>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2 cursor-pointer hover:text-[#C5A880]">
                  <input type="checkbox" className="accent-[#1C352D]" /> 1-3 Nights
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-[#C5A880]">
                  <input type="checkbox" className="accent-[#1C352D]" /> 4-6 Nights
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-[#C5A880]">
                  <input type="checkbox" className="accent-[#1C352D]" /> 7+ Nights
                </label>
              </div>
            </div>

            {/* Filter Group: Theme */}
            <div>
              <h4 className="text-xs font-semibold text-[#1C352D]/60 uppercase mb-3">Theme</h4>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2 cursor-pointer hover:text-[#C5A880]">
                  <input type="checkbox" className="accent-[#1C352D]" /> Heritage & Culture
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-[#C5A880]">
                  <input type="checkbox" className="accent-[#1C352D]" /> Wildlife Safari
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-[#C5A880]">
                  <input type="checkbox" className="accent-[#1C352D]" /> Wellness & Spa
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT SIDEBAR: RESULTS */}
        <section className="w-full lg:w-3/4 space-y-6">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-3xl font-serif">Curated Experiences</h2>
              <p className="text-sm text-[#1C352D]/60 mt-1">Showing {searchResults.length} exquisite journeys.</p>
            </div>
          </div>

          {/* Package Cards List */}
          <div className="space-y-6">
            {searchResults.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-xl border border-[#1C352D]/10 transition-all">
                {/* Image */}
                <div className="md:w-1/3 h-64 md:h-auto relative">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md text-[#1C352D]">
                    {pkg.duration}
                  </span>
                </div>
                
                {/* Details */}
                <div className="p-6 md:w-2/3 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-[#C5A880] uppercase tracking-widest">{pkg.location}</span>
                      <span className="text-xl font-serif text-[#1C352D] font-bold">{pkg.price} <span className="text-xs font-normal text-[#1C352D]/60">/person</span></span>
                    </div>
                    <h3 className="text-2xl font-serif mb-4">{pkg.title}</h3>
                    
                    {/* Inclusions */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {pkg.highlights.map((highlight, index) => (
                        <span key={index} className="bg-[#FDFBF7] border border-[#1C352D]/10 text-[#1C352D]/70 text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                          ✓ {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-4 border-t border-[#1C352D]/10 pt-4 mt-auto">
                    <button className="flex-1 py-3 border border-[#1C352D] text-[#1C352D] hover:bg-[#1C352D]/5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all">
                      View Itinerary
                    </button>
                    <Link href="/register" className="flex-1 py-3 text-center bg-[#C5A880] text-white hover:bg-[#B3966E] rounded-xl text-xs font-semibold uppercase tracking-wider transition-all">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
