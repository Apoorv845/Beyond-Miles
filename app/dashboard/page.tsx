"use client";

import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  // Interactive State for the Calculator
  const [travelers, setTravelers] = useState(2);
  const [days, setDays] = useState(5);
  const [tier, setTier] = useState("Premium");

  // Dynamic Calculation Logic
  const getBaseRate = () => (tier === "Premium" ? 15000 : 35000);
  const totalEstimate = travelers * days * getBaseRate();

  // Mock Suggested Packages
  const suggestions = [
    {
      id: 1,
      title: "The Oberoi Vanyavilas",
      location: "Ranthambore",
      tier: "Ultra-Luxury",
      image: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "Taj Lake Palace",
      location: "Udaipur",
      tier: "Premium",
      image: "https://images.unsplash.com/photo-1598977123418-45f04b6144bc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      title: "Wildflower Hall",
      location: "Shimla",
      tier: "Premium",
      image: "https://images.unsplash.com/photo-1545208597-3f9903c55047?auto=format&fit=crop&w=600&q=80",
    }
  ];

  // Filter recommendations based on user's selected tier
  const filteredSuggestions = suggestions.filter(pkg => pkg.tier === tier || tier === "Ultra-Luxury");

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C352D] font-sans pb-12">
      {/* HEADER */}
      <header className="bg-[#1C352D] text-white py-6 px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-serif tracking-widest font-bold">BEYOND MILES</Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#C5A880] tracking-wider uppercase font-semibold">Welcome Back</span>
            <Link href="/" className="text-xs bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all">Sign Out</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10">
        
        {/* LEFT PANEL: INTERACTIVE CALCULATOR */}
        <section className="w-full lg:w-1/3">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-[#1C352D]/10 sticky top-10">
            <h2 className="text-2xl font-serif mb-6">Trip Estimator</h2>
            
            {/* Travelers Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1C352D]/60">Travelers</label>
                <span className="text-xl font-serif text-[#C5A880]">{travelers} {travelers === 1 ? 'Person' : 'People'}</span>
              </div>
              <input 
                type="range" min="1" max="10" value={travelers} 
                onChange={(e) => setTravelers(parseInt(e.target.value))}
                className="w-full accent-[#1C352D]"
              />
            </div>

            {/* Days Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1C352D]/60">Duration</label>
                <span className="text-xl font-serif text-[#C5A880]">{days} Days</span>
              </div>
              <input 
                type="range" min="2" max="21" value={days} 
                onChange={(e) => setDays(parseInt(e.target.value))}
                className="w-full accent-[#1C352D]"
              />
            </div>

            {/* Luxury Tier Selection */}
            <div className="mb-10">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1C352D]/60 block mb-3">Experience Tier</label>
              <div className="flex gap-2">
                <button 
                  onClick={() => setTier("Premium")}
                  className={`flex-grow py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${tier === "Premium" ? "bg-[#1C352D] text-white" : "bg-gray-100 text-[#1C352D]/60 hover:bg-gray-200"}`}
                >
                  Premium
                </button>
                <button 
                  onClick={() => setTier("Ultra-Luxury")}
                  className={`flex-grow py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${tier === "Ultra-Luxury" ? "bg-[#C5A880] text-white shadow-md" : "bg-gray-100 text-[#1C352D]/60 hover:bg-gray-200"}`}
                >
                  Ultra-Luxury
                </button>
              </div>
            </div>

            {/* Live Estimate Result */}
            <div className="bg-[#1C352D]/5 p-6 rounded-2xl border border-[#1C352D]/10 text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#1C352D]/60 mb-1">Estimated Budget</p>
              <h3 className="text-4xl font-serif text-[#1C352D] mb-2">
                ₹{totalEstimate.toLocaleString('en-IN')}
              </h3>
              <p className="text-xs text-[#1C352D]/50 font-medium">Excluding international flights & taxes</p>
            </div>
            
            <button className="w-full mt-6 py-4 bg-[#1C352D] text-white rounded-xl text-sm font-semibold uppercase tracking-wider shadow-lg hover:bg-[#1C352D]/90 transition-all">
              Save Itinerary Profile
            </button>
          </div>
        </section>

        {/* RIGHT PANEL: SMART RECOMMENDATIONS */}
        <section className="w-full lg:w-2/3">
          <div className="mb-8 border-b border-[#1C352D]/10 pb-4">
            <h1 className="text-3xl font-serif">Tailored For You</h1>
            <p className="text-sm text-[#1C352D]/60 mt-2">Based on a {days}-day journey for {travelers} seeking {tier} experiences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSuggestions.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#1C352D]/10 transition-all group cursor-pointer">
                <div className="h-48 w-full overflow-hidden relative">
                  <img src={pkg.image} alt={pkg.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-3 left-3 bg-[#1C352D] text-white px-2 py-1 text-[9px] font-bold uppercase tracking-widest rounded-md">
                    {pkg.tier} Match
                  </span>
                </div>
                <div className="p-5">
                  <h4 className="text-xl font-serif text-[#1C352D] mb-1">{pkg.title}</h4>
                  <p className="text-xs font-bold text-[#C5A880] uppercase tracking-wider mb-4">📍 {pkg.location}</p>
                  <Link href="/packages" className="inline-block text-xs font-bold border-b border-[#1C352D] text-[#1C352D] pb-1 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors">
                    Explore Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 p-8 bg-[#1C352D] text-white rounded-3xl text-center relative overflow-hidden">
             <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[200%] bg-[#C5A880]/20 blur-3xl rotate-45 pointer-events-none" />
             <h3 className="text-2xl font-serif mb-3 relative z-10">Need a custom route?</h3>
             <p className="text-sm text-white/70 max-w-md mx-auto mb-6 relative z-10">Our luxury concierges are ready to draft a bespoke itinerary matching your exact calculated metrics.</p>
             <button className="px-8 py-3 bg-[#C5A880] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#B3966E] transition-all relative z-10">
               Contact Concierge
             </button>
          </div>

        </section>
      </main>
    </div>
  );
}
