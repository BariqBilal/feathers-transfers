'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const QuoteSection: React.FC = () => {
  const router = useRouter()
  return (
    <section className="bg-white py-16 px-4"> 
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Quick Quote Card */}
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Quick Quote</h3>
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            If you know your party size and are coming to La Plagne, but have not yet booked your flights
          </p>
          <button onClick={() => router.push('/')} className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out">
            Get Quote Now
          </button>
        </div>

        {/* Full Booking Card */}
        
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Online Booking</h3>
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            If you have all your travel details, including party size, and want an exact price
          </p>
          <button onClick={() => router.push('/book-now')} className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out">
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
