'use client';
import React from 'react';

export default function AirportInfoCards() {
  return (
    <div className="min-h-[65vh] bg-gray-100 flex items-center justify-center font-['Inter'] p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Terminal 1 (Main) Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Terminal 1 (Main)</h2>
          <p className="text-gray-600 mb-4 flex-grow">
            The bigger of the two terminals, serving major airlines including:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>EasyJet</li>
            <li>British Airways</li>
          </ul>
          <div className="bg-blue-50 rounded-lg p-4 text-blue-800 text-sm">
            <h3 className="font-semibold mb-1">Arrival Procedure</h3>
            <p>
             Terminal 1 is the bigger of the two terminals and is the terminal that most airlines such as EasyJet and British Airways use. It is most likely that this is the terminal your flight will arrive at.
            </p>
          </div>
        </div>

        {/* Terminal 2 (Charter) Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Terminal 2 (Charter)</h2>
          <p className="text-gray-600 mb-4 flex-grow">
            A short walk from Terminal 1, used for charter flights. Currently serving:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Jet2 (weekends)</li>
            <li>Charter operations</li>
          </ul>
          <div className="bg-blue-50 rounded-lg p-4 text-blue-800 text-sm">
            <h3 className="font-semibold mb-1">Meeting Point</h3>
            <p>
             Terminal 2 is just a short 100m walk from Terminal 1 and is used for charter flights. It is a hangar with not many facilities and at the time of writing, the budget airline Jet2 use it at weekends. 
            </p>
          </div>
        </div>

        {/* French Sector Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">French Sector</h2>
          <p className="text-gray-600 mb-4 flex-grow">
            Mainly used for internal flights, with some international services.
          </p>
          <div className="bg-blue-50 rounded-lg p-4 text-blue-800 text-sm">
            <h3 className="font-semibold mb-1">Important Notice</h3>
            <p>
              If arriving here, follow signs for Switzerland and transit through Swiss customs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
