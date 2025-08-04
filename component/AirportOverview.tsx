import React from 'react';
import Image from 'next/image';

interface AirportOverviewProps {
  title: string;
  description: string[];
  imageUrl: string;
  imageAlt: string;
}

const AirportOverview: React.FC<AirportOverviewProps> = ({ 
  title, 
  description, 
  imageUrl, 
  imageAlt 
}) => {
  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg py-12 overflow-hidden flex flex-col md:flex-row">
      {/* Image Section - Left Side */}
      <div className="relative w-full md:w-1/2 h-64 md:h-auto">
        <Image
          src={imageUrl}
          alt={imageAlt}
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
          priority
        />
      </div>
      
      {/* Content Section - Right Side */}
      <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          {title}
        </h1>

        <div className="space-y-4 text-gray-600 text-justify">
          {description.map((paragraph, index) => (
            <p 
              key={index} 
              className="text-base md:text-lg leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: paragraph.replace(/<a /g, '<a class="text-blue-500 underline hover:underline " ')
              }} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AirportOverview;
