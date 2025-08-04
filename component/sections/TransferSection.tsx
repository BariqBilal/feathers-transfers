// components/ServiceSection.tsx
import React from 'react';
import { Watch, Calendar } from 'lucide-react'; 
import { GrSecure } from 'react-icons/gr';

const TransferSection: React.FC = () => {
  const services = [
    {
      icon: GrSecure,
      title: "Choose a Legal Transfer Company",
      description: "When booking your transfer, be cautious of deals that seem too good to be true. Verify through official platforms and resort recommendations.",
    },
    {
      icon: Calendar,
      title: "Book Well in Advance",
      description: "Early booking helps you secure reliable transfer options and can avoid last-minute hassles and unnecessary stress.",
    },
    {
      icon: Watch,
      title: "Consider Transfer Timing",
      description: "Try to book midweek or Sunday transfers to avoid peak traffic. Consider the timing carefully to ensure a smooth journey.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12 font-inter">
         Key Transfer Guidelines
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-blue-50 p-8 rounded-lg shadow-md flex flex-col items-start text-left transition-transform transform hover:scale-105 duration-300 ease-in-out"
            >
              {/* Icon */}
              <div className="mb-6">
                <service.icon className="w-16 h-16 text-blue-600" /> {/* Large blue icon */}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-base leading-relaxed text-justify">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransferSection;
