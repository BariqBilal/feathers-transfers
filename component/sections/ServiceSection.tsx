// components/ServiceSection.tsx
import React from 'react';
import { Plane, Train, Car } from 'lucide-react'; 

const ServiceSection: React.FC = () => {
  const services = [
    {
      icon: Plane,
      title: "Airport Transfers",
      description: "Reliable transfers from Geneva and Lyon airports to La Plagne.",
    },
    {
      icon: Train,
      title: "Train Station Transfers",
      description: "Convenient connections from major train stations to your resort.",
    },
    {
      icon: Car,
      title: "Local Transport",
      description: "Flexible local transport services within La Plagne.",
    },
  ];

  return (
    <section className="py-16 bg-white"> {/* Section container with padding and white background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12 font-inter">
          Our Services
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

export default ServiceSection;
