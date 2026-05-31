"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import { premiumDestinations, Destination } from "../../lib/destinations";
import "leaflet/dist/leaflet.css";

export default function Dashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("Traveler");
  const [loading, setLoading] = useState(true);
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    async function getUserProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/register");
        return;
      }
      const { data } = await supabase
        .from("profiles")
        .select("first_name")
        .eq("id", user.id)
        .single();

      if (data?.first_name) {
        setUserName(data.first_name);
      }
      setLoading(false);
    }
    getUserProfile();
  }, [router]);

  useEffect(() => {
    if (loading || !mapContainerRef.current || mapRef.current) return;

    async function initMap() {
      const L = (await import("leaflet")).default;

      // Reset default asset paths for standard markers
      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      });

      // Init map centered on India
      mapRef.current = L.map(mapContainerRef.current!).setView([22.5937, 78.9629], 5);

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(mapRef.current);

      // Add pins to map dynamically from destinations list
      premiumDestinations.forEach((dest) => {
        const marker = L.marker(dest.coordinates)
          .addTo(mapRef.current)
          .bindPopup(`<b>${dest.title}</b><br/>${dest.region}`);
        
        markersRef.current.push({ id: dest.id, markerInstance: marker });
      });
    }

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current = [];
      }
    };
  }, [loading]);

  // Function to pan the map over to a specific spot when a sidebar card is clicked
  const handleSelectLocation = (dest: Destination) => {
    setSelectedDest(dest);
    if (mapRef.current) {
      mapRef.current.setView(dest.coordinates, 8, { animate: true, duration: 1.5 });
      
      // Open the corresponding map popup programmatically
      const found = markersRef.current.find(m => m.id === dest.id);
      if (found) {
        found.markerInstance.openPopup();
      }
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-warm-white text-forest-green font-serif text-xl">Loading your personalized escape...</div>;
  }

  return (
    <main className="h-screen w-full flex flex-col md:flex-row bg-warm-white overflow-hidden">
      
      {/* Sidebar Panel */}
      <div className="w-full md:w-1/3 lg:w-1/4 p-6 flex flex-col z-1000white/90 backdrop-blur-md shadow-2xl border-r border-sand-tone/30 overflow-y-auto">
        <h1 className="text-3xl font-serif text-forest-green mb-1">Welcome, {userName}.</h1>
        <p className="text-xs text-charcoal-accent/60 mb-6">
          Handpicked boutique routes crafted unique to premium discovery standards.
        </p>
        
        {/* Destination Cards Container */}
        <div className="grow e-y-3">
          <p className="text-xs font-semibold tracking-widest text-sand-tone uppercase mb-2">Curated for you</p>
          
          {premiumDestinations.map((dest) => (
            <div 
              key={dest.id}
              onClick={() => handleSelectLocation(dest)}
              className={`p-4 border rounded-xl cursor-pointer transition-all ${
                selectedDest?.id === dest.id 
                  ? "border-forest-green bg-forest-green/5 shadow-md" 
                  : "border-sand-tone/30 hover:border-sand-tone bg-white"
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-serif font-medium text-forest-green text-base">{dest.title}</h3>
                <span className="text-[10px] bg-sand-tone/20 text-charcoal-accent/80 px-2 py-0.5 rounded-full uppercase tracking-wider font-medium">
                  {dest.landscape}
                </span>
              </div>
              <p className="text-xs text-charcoal-accent/50 mb-1">{dest.region}</p>
              <p className="text-xs text-charcoal-accent/80 line-clamp-2">{dest.description}</p>
            </div>
          ))}
        </div>

        <button 
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/register");
          }}
          className="mt-6 py-2.5 w-full text-xs font-medium tracking-wide text-charcoal-accent/60 hover:text-charcoal-accent border border-sand-tone/50 rounded-full transition-colors cursor-pointer"
        >
          Sign Out
        </button>
      </div>

      {/* Map Area */}
      <div ref={mapContainerRef} className="grow not-even:ll w-full z-0" />

    </main>
  );
}