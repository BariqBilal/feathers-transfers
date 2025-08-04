// components/ServiceSection.tsx
import React from 'react';
import {   Car } from 'lucide-react'; 
import { GrGraphQl, GrSecure } from 'react-icons/gr';

const FeatureSection: React.FC = () => {
  const services = [
    {
      icon: GrGraphQl,
      title: "Local Expertise",
      description: "30 years association with La Plagne",
    },
    {
      icon: GrSecure,
      title: "Local Advantage",
      description: "73 (Savoie) registered vehicles allowing access to back roads on peak weeks.",
    },
    {
      icon: Car,
      title: "Premium Service",
      description: "Personalized attention and exceptional reliability",
    },
  ];

  return (
    <section className="py-16 bg-[#F1F6FF"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12 font-inter">
         Why Choose Feathers Transfers?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-blue-50 p-8 rounded-lg shadow-md flex flex-col items-center text-center transition-transform transform hover:scale-105 duration-300 ease-in-out"
            >
              {/* Icon */}
              <div className="mb-6">
                <service.icon className="w-16 h-16 text-blue-600" />
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 text-base leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
