// pages/Transfer.tsx (or wherever your Transfer component is located)
import HeroSection2 from "@/component/sections/HeroSection2";
import TransferSection from "@/component/sections/TransferSection";
import Consideration from "@/component/sections/Consideration";
import React from 'react'; // Ensure React is imported
import { Plane, Clock } from 'lucide-react'; // Import icons for the new section

// New component for Additional Travel Tips
const AdditionalTipsSection: React.FC = () => {
  return (
    <section className="bg-blue-50 py-16 px-4"> {/* Light blue background */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-12 text-center lg:text-left">
          Additional Travel Tips
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Be Prepared Column */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Be Prepared</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Plane className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                <p className="text-gray-700 text-base leading-relaxed">
                  Transfers typically take a minimum of 2.5 hours - plan accordingly and avoid excessive alcohol consumption before travel.
                </p>
              </li>
              <li className="flex items-start">
                <Plane className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                <p className="text-gray-700 text-base leading-relaxed">
                  Consider travel insurance to cover extra expenses from flight delays or cancellations.
                </p>
              </li>
            </ul>
          </div>

          {/* Timing Considerations Column */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Timing Considerations</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Clock className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                <p className="text-gray-700 text-base leading-relaxed">
                  Avoid anti-social arrival/departure times as they may increase transfer costs.
                </p>
              </li>
              <li className="flex items-start">
                <Clock className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                <p className="text-gray-700 text-base leading-relaxed">
                  Consider midweek transfers to avoid weekend traffic congestion.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};


export default function Transfer(){
    return(
        <>
          <HeroSection2
            height="50vh" 
            bgImage="/hero.jpg"
            title="Our Transfer Travelling Advice"
            description="Arranging your airport transfer is a vital step in ensuring your ski trip begins and ends without a hitch."
          />
          <TransferSection/>
          <Consideration/>
          {/* Add the new AdditionalTipsSection here */}
          <AdditionalTipsSection />
        </>
    )
}
