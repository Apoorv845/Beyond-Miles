"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SurveyData {
  travelerTypes: string[];
  landscapes: string[];
  travelStyle: string;
  accommodation: string;
}

export default function TravelerDiscovery() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [surveyData, setSurveyData] = useState<SurveyData>({
    travelerTypes: [],
    landscapes: [],
    travelStyle: "",
    accommodation: "",
  });

  const travelerTypes = [
    "Nature Explorer", "Mountain Lover", "Spiritual Traveler", 
    "Luxury Traveler", "Slow Traveler", "Cultural Explorer", 
    "Adventure Traveler", "Food Explorer", "Photography Traveler"
  ];

  const landscapes = [
    "Mountains", "Greenery", "Forests", "Rivers", 
    "Villages", "Beaches", "Snow", "Deserts", "Temples"
  ];

  const travelStyles = ["Solo", "Couple", "Family", "Friends", "Premium Travel"];
  const accommodations = ["Premium 3-Star", "Boutique Stay", "Luxury Stay", "Curated Homestays"];

  const handleMultiSelect = (key: 'travelerTypes' | 'landscapes', value: string) => {
    setSurveyData(prev => {
      const currentValues = prev[key];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      return { ...prev, [key]: updatedValues };
    });
  };

  const handleSingleSelect = (key: 'travelStyle' | 'accommodation', value: string) => {
    setSurveyData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const isStepValid = () => {
    if (currentStep === 1) return surveyData.travelerTypes.length > 0;
    if (currentStep === 2) return surveyData.landscapes.length > 0;
    if (currentStep === 3) return surveyData.travelStyle !== "";
    if (currentStep === 4) return surveyData.accommodation !== "";
    return false;
  };

  // This fires when the user clicks "Complete Discovery" on Step 4
  const handleComplete = () => {
    localStorage.setItem("beyond_miles_discovery", JSON.stringify(surveyData));
    router.push("/register");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        
        {/* Progress Tracker */}
        <div className="mb-8">
          <p className="text-sm font-medium tracking-widest text-sand-tone uppercase mb-2">
            Step {currentStep} of 4 — Discovery
          </p>
          <div className="w-full h-0.5 bg-sand-tone/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-forest-green transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1 */}
        {currentStep === 1 && (
          <div>
            <h1 className="text-4xl font-serif text-forest-green mb-4 leading-tight">How do you prefer to experience the world?</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {travelerTypes.map(type => (
                <button key={type} onClick={() => handleMultiSelect('travelerTypes', type)} className={`text-left px-6 py-4 rounded-xl border transition-all duration-200 ${surveyData.travelerTypes.includes(type) ? "bg-forest-green text-warm-white border-forest-green shadow-sm" : "border-sand-tone/60 hover:border-forest-green hover:bg-forest-green/5"}`}>
                  <span className="text-base font-medium">{type}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {currentStep === 2 && (
          <div>
            <h1 className="text-4xl font-serif text-forest-green mb-4 leading-tight">Which landscapes call to you?</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {landscapes.map(landscape => (
                <button key={landscape} onClick={() => handleMultiSelect('landscapes', landscape)} className={`text-left px-6 py-4 rounded-xl border transition-all duration-200 ${surveyData.landscapes.includes(landscape) ? "bg-forest-green text-warm-white border-forest-green shadow-sm" : "border-sand-tone/60 hover:border-forest-green hover:bg-forest-green/5"}`}>
                  <span className="text-base font-medium">{landscape}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {currentStep === 3 && (
          <div>
            <h1 className="text-4xl font-serif text-forest-green mb-4 leading-tight">Who will be sharing this journey?</h1>
            <div className="flex flex-col gap-3">
              {travelStyles.map(style => (
                <button key={style} onClick={() => handleSingleSelect('travelStyle', style)} className={`text-left px-6 py-4 rounded-xl border transition-all duration-200 ${surveyData.travelStyle === style ? "bg-forest-green text-warm-white border-forest-green shadow-sm" : "border-sand-tone/60 hover:border-forest-green hover:bg-forest-green/5"}`}>
                  <span className="text-base font-medium">{style}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {currentStep === 4 && (
          <div>
            <h1 className="text-4xl font-serif text-forest-green mb-4 leading-tight">Where do you find comfort at night?</h1>
            <div className="flex flex-col gap-3">
              {accommodations.map(acc => (
                <button key={acc} onClick={() => handleSingleSelect('accommodation', acc)} className={`text-left px-6 py-4 rounded-xl border transition-all duration-200 ${surveyData.accommodation === acc ? "bg-forest-green text-warm-white border-forest-green shadow-sm" : "border-sand-tone/60 hover:border-forest-green hover:bg-forest-green/5"}`}>
                  <span className="text-base font-medium">{acc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons Footer */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-sand-tone/20">
          <div>
            {currentStep > 1 && (
              <button onClick={prevStep} className="text-sm font-medium tracking-wide text-charcoal-accent/60 hover:text-charcoal-accent transition-colors">
                Back
              </button>
            )}
          </div>
          <div>
            {isStepValid() && (
              <button 
                onClick={currentStep === 4 ? handleComplete : nextStep}
                className="px-8 py-3 bg-forest-green text-warm-white rounded-full font-medium tracking-wide hover:bg-charcoal-accent transition-all duration-300 shadow-md"
              >
                {currentStep === 4 ? "Complete Discovery" : "Continue"}
              </button>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}