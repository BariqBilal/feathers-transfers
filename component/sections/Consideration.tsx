// components/Consideration.tsx
import React from 'react';
import { TriangleAlert, Briefcase, Clock } from 'lucide-react'; // Importing icons

const Consideration: React.FC = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-12 text-center lg:text-left">
          Important Considerations
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Travel Sickness Prevention Card */}
            <div className="bg-orange-50 border-l-4 border-orange-400 rounded-lg p-6 shadow-sm">
              <div className="flex items-start mb-3">
                <TriangleAlert className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0 mt-1" />
                <h3 className="text-xl font-semibold text-gray-800">Travel Sickness Prevention</h3>
              </div>
              <p className="text-gray-700 text-base leading-relaxed">
                The altitude resorts are situated at the top of a hill climb. You will gain 1,800m in altitude. We strongly advise you to prepare your party members and count down/up the bends to eliminate car sickness.
              </p>
            </div>

            {/* Ski Bags Handling Card */}
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-6 shadow-sm">
              <div className="flex items-start mb-3">
                <Briefcase className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
                <h3 className="text-xl font-semibold text-gray-800">Ski Bags Handling</h3>
              </div>
              <p className="text-gray-700 text-base leading-relaxed">
                Pad your ski bag with clothes/underwear to maximize baggage allowance. Be prepared for roof rack transport and use plastic bags to protect items from snow or rain.
              </p>
            </div>
          </div>

          {/* Right Column: Airport Facilities Card */}
          <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Airport Facilities</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Clock className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-base">Geneva Airport has some good shops and restaurants to while away waiting time.</p>
                </li>
                <li className="flex items-start">
                  <Clock className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-base">Chambery Airport features an Italian Restaurant called Italoria with convenient dining options.</p>
                </li>
                <li className="flex items-start">
                  <Clock className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-base">Grenoble has a supermarket, cafe and various food options at the entrance.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Consideration;
