// components/AirportDetail.tsx
import React from 'react';
import { MapPin, Clock, Wifi } from 'lucide-react'; // Importing icons

// Define the props interface for better type safety in TypeScript
interface AirportDetailProps {
  location: string;
  transferTime: string;
  amenities: string;
}

const AirportDetail: React.FC<AirportDetailProps> = ({ location, transferTime, amenities }) => {
  return (
    <section className="bg-blue-50"> {/* Light blue background */}
      <div className=" mx-auto max-w-7xl rounded-lg  p-8 grid grid-cols-1 md:grid-cols-3 gap-8 ">
        {/* Location */}
        <div className="flex flex-col items-left">
            <div className='flex items-center gap-2'>

          <MapPin className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Location</h3>
            </div>
          <p className="text-gray-700 text-base">{location}</p>
        </div>

        {/* Transfer Time */}
        <div className="flex flex-col items-left">
            <div className='flex items-center gap-2'>

          <Clock className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Transfer Time</h3>
            </div>
          <p className="text-gray-700 text-base">{transferTime}</p>
        </div>

        {/* Amenities */}
        <div className="flex flex-col items-left">
            <div className='flex items-center gap-2'>

          <Wifi className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Amenities</h3>
            </div>
          <p className="text-gray-700 text-base">{amenities}</p>
        </div>
      </div>
    </section>
  );
};

export default AirportDetail;
