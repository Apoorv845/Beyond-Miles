"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      // 1. Create the user account in Supabase Authentication
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData?.user) {
        const userId = authData.user.id;

        // 2. Get the saved survey answers from the browser's memory
        const cachedSurvey = localStorage.getItem("beyond_miles_discovery");
        const surveyData = cachedSurvey ? JSON.parse(cachedSurvey) : null;

        // 3. Save the user's name to the profiles table
        const { error: profileError } = await supabase
          .from("profiles")
          .insert([
            {
              id: userId,
              first_name: firstName,
              last_name: lastName,
              travel_mode: "standard",
            },
          ]);

        if (profileError) throw profileError;

        // 4. Save the survey answers to the travel_preferences table
        if (surveyData) {
          const { error: prefError } = await supabase
            .from("travel_preferences")
            .insert([
              {
                user_id: userId,
                traveler_type: surveyData.travelerTypes,
                preferred_landscapes: surveyData.landscapes,
                travel_style: surveyData.travelStyle,
                accommodation_preference: surveyData.accommodation,
              },
            ]);

          if (prefError) throw prefError;
          
          // Clear the browser's memory now that data is safe in the database
          localStorage.removeItem("beyond_miles_discovery");
        }

        // 5. Send the user to the Dashboard Map
        router.push("/dashboard");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-md w-full border border-sand-tone/30 p-8 rounded-2xl shadow-xl bg-white/50">
        <p className="text-sm font-medium tracking-widest text-sand-tone uppercase mb-2">Step 2 of 2</p>
        <h1 className="text-3xl font-serif text-forest-green mb-2">Create Your Profile</h1>
        <p className="text-sm text-charcoal-accent/60 mb-6">Secure your personalization metrics permanently.</p>

        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg mb-4 border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-charcoal-accent/70 mb-1">First Name</label>
              <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-4 py-3 text-sm bg-warm-white border border-sand-tone/40 rounded-xl focus:outline-none focus:border-forest-green transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-charcoal-accent/70 mb-1">Last Name</label>
              <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-4 py-3 text-sm bg-warm-white border border-sand-tone/40 rounded-xl focus:outline-none focus:border-forest-green transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-charcoal-accent/70 mb-1">Email Address</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 text-sm bg-warm-white border border-sand-tone/40 rounded-xl focus:outline-none focus:border-forest-green transition-colors" />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-charcoal-accent/70 mb-1">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 text-sm bg-warm-white border border-sand-tone/40 rounded-xl focus:outline-none focus:border-forest-green transition-colors" />
          </div>

          <button type="submit" disabled={loading} className="w-full mt-4 py-3 bg-forest-green text-warm-white font-medium rounded-full hover:bg-charcoal-accent transition-colors shadow-md disabled:opacity-50 cursor-pointer">
            {loading ? "Establishing Profile..." : "Register & View Map"}
          </button>
        </form>
      </div>
    </main>
  );
}