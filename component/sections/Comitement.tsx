// components/CommitmentSection.tsx
import React from 'react';
import Image from 'next/image';
import { Snowflake, UserCheck, BatteryCharging, CheckCircle } from 'lucide-react'; // Importing icons

const CommitmentSection: React.FC = () => {
  const commitments = [
    {
      icon: Snowflake,
      title: "New Snow Tires",
      description: "All vehicles fitted with new snow tires each winter",
    },
    {
      icon: UserCheck,
      title: "Experienced Drivers",
      description: "Drivers trained in snow chain application",
    },
    {
      icon: BatteryCharging,
      title: "Charging Facilities",
      description: "Android and iPhone chargers available",
    },
    {
      icon: CheckCircle,
      title: "Reliable Transfers",
      description: "Exceptional reliability and personalized service",
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto bg-white  p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Column: Commitment Details */}
        <div className="text-center lg:text-left">
          <h2 className="md:text-4xl text-xl font-extrabold text-gray-800 mb-8 font-inter">
            Our Commitment to Safety and Service
          </h2>
          <div className="space-y-6">
            {commitments.map((item, index) => (
              <div key={index} className="flex items-start lg:items-center flex-col lg:flex-row">
                <item.icon className="w-8 h-8 text-blue-600 mr-4 mb-2 lg:mb-0 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-base">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/FRAME.png" // IMPORTANT: Replace with your actual car image path
            alt="Luxury Car"
            width={600} // Adjust based on your image's intrinsic width
            height={400} // Adjust based on your image's intrinsic height
            layout="responsive"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default CommitmentSection;
