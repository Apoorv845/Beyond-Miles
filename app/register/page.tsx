"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false); // Controls the toggle
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isLogin) {
      // SIGN IN LOGIC
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setError(signInError.message);
      } else {
        router.push("/dashboard");
      }
    } else {
      // REGISTER LOGIC
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (signUpError) {
        setError(signUpError.message);
      } else if (data.user) {
        // Save name to database
        const { error: profileError } = await supabase
          .from("profiles")
          .insert([{ id: data.user.id, first_name: firstName, last_name: lastName }]);
        
        if (profileError) setError(profileError.message);
        else router.push("/dashboard");
      }
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-warm-white p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-sand-tone/20">
        
        {/* Dynamic Header */}
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold tracking-widest text-sand-tone uppercase mb-2">
            {isLogin ? "Welcome Back" : "Step 1 of 2"}
          </p>
          <h1 className="text-3xl font-serif text-forest-green mb-2">
            {isLogin ? "Sign In" : "Create Your Profile"}
          </h1>
          <p className="text-sm text-charcoal-accent/60">
            {isLogin ? "Access your curated itineraries." : "Secure your personalization metrics permanently."}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          
          {/* Only show Name fields if they are Registering */}
          {!isLogin && (
            <div className="flex gap-4">
              <div className="space-y-1 w-1/2">
                <label className="text-xs font-medium text-charcoal-accent/70 uppercase tracking-wide">First Name</label>
                <input 
                  type="text" 
                  required={!isLogin} 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sand-tone/30 bg-warm-white/50 focus:outline-none focus:border-forest-green focus:ring-1 focus:ring-forest-green transition-all"
                />
              </div>
              <div className="space-y-1 w-1/2">
                <label className="text-xs font-medium text-charcoal-accent/70 uppercase tracking-wide">Last Name</label>
                <input 
                  type="text" 
                  required={!isLogin} 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sand-tone/30 bg-warm-white/50 focus:outline-none focus:border-forest-green focus:ring-1 focus:ring-forest-green transition-all"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-medium text-charcoal-accent/70 uppercase tracking-wide">Email Address</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value.trim())}
              className="w-full px-4 py-3 rounded-xl border border-sand-tone/30 bg-warm-white/50 focus:outline-none focus:border-forest-green focus:ring-1 focus:ring-forest-green transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-charcoal-accent/70 uppercase tracking-wide">Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-sand-tone/30 bg-warm-white/50 focus:outline-none focus:border-forest-green focus:ring-1 focus:ring-forest-green transition-all"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-6 py-4 bg-forest-green text-white rounded-full text-sm font-medium tracking-wide hover:bg-forest-green/90 transition-all shadow-md"
          >
            {loading ? "Processing..." : (isLogin ? "Sign In & View Map" : "Register & View Map")}
          </button>
        </form>

        {/* The Toggle Button */}
        <div className="mt-8 text-center">
          <button 
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError(""); // Clear errors when toggling
            }}
            className="text-sm text-forest-green font-medium hover:underline transition-all"
          >
            {isLogin ? "Need an account? Create a Profile" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </main>
  );
}
