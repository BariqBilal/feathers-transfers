'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import Image from 'next/image';

// Import React Icons
import { MdLocationOn, MdCalendarMonth, MdAccessTime } from 'react-icons/md';
import { FaUsers, FaEuroSign, FaCar, FaCommentDots, FaSnowflake, FaSkiing, FaShoppingCart } from 'react-icons/fa';

function JourneyPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract all the parameters from the URL
  const tripType = searchParams.get('tripType') || 'oneWay';
  const pickupLocation = searchParams.get('pickupLocation') || '';
  const destinationLocation = searchParams.get('destinationLocation') || '';
  const selectedDate = searchParams.get('selectedDate') || '';
  const selectedTime = searchParams.get('selectedTime') || '';
  const returnDate = searchParams.get('returnDate') || '';
  const returnTime = searchParams.get('returnTime') || '';
  const adults = searchParams.get('adults') || '2';
  const children = searchParams.get('children') || '0';

  // Pricing information
  const basePrice = parseFloat(searchParams.get('basePrice') || '0');
  const supplements = parseFloat(searchParams.get('supplements') || '0');
  const totalPrice = parseFloat(searchParams.get('totalPrice') || '0');
  const supplementDetails = JSON.parse(searchParams.get('supplementDetails') || '[]');
  
  // Return journey pricing (if applicable)
  const returnBasePrice = parseFloat(searchParams.get('returnBasePrice') || '0');
  const returnSupplements = parseFloat(searchParams.get('returnSupplements') || '0');
  const returnTotalPrice = parseFloat(searchParams.get('returnTotalPrice') || '0');
  const returnSupplementDetails = JSON.parse(searchParams.get('returnSupplementDetails') || '[]');

  // Format date for display
  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(price);
  };

  // For background image
  const bgImage = '/hero.jpg';

  // Journey 1 details
  const journey1 = {
    route: `${pickupLocation} → ${destinationLocation}`,
    departureDate: formatDisplayDate(selectedDate),
    departureTime: selectedTime,
    passengers: `${adults} Adults, ${children} Children`,
    basePrice: formatPrice(basePrice),
    supplements: formatPrice(supplements),
    totalPrice: formatPrice(totalPrice),
    supplementDetails,
  };

  // Journey 2 details for round trips (if available)
  const journey2 = tripType === 'roundTrip' ? {
    route: `${destinationLocation} → ${pickupLocation}`,
    departureDate: formatDisplayDate(returnDate),
    departureTime: returnTime,
    passengers: `${adults} Adults, ${children} Children`,
    basePrice: formatPrice(returnBasePrice),
    supplements: formatPrice(returnSupplements),
    totalPrice: formatPrice(returnTotalPrice),
    supplementDetails: returnSupplementDetails,
  } : null;

  // State to handle the journey flow
  const [journeyStep, setJourneyStep] = useState(1);

  // Handle button click for navigating to the booking summary
  const handleSelect = () => {
    // Prepare URL parameters to pass to BookingSummary page
    const params = new URLSearchParams();
    params.append('tripType', tripType);
    params.append('pickupLocation', pickupLocation);
    params.append('destinationLocation', destinationLocation);
    params.append('selectedDate', selectedDate);
    params.append('selectedTime', selectedTime);
    params.append('adults', adults);
    params.append('children', children);
    params.append('basePrice', basePrice.toString());
    params.append('supplements', supplements.toString());
    params.append('totalPrice', totalPrice.toString());
    params.append('supplementDetails', JSON.stringify(supplementDetails));

    if (tripType === 'roundTrip') {
      params.append('returnDate', returnDate);
      params.append('returnTime', returnTime);
      params.append('returnBasePrice', returnBasePrice.toString());
      params.append('returnSupplements', returnSupplements.toString());
      params.append('returnTotalPrice', returnTotalPrice.toString());
      params.append('returnSupplementDetails', JSON.stringify(returnSupplementDetails));
    }

    if (tripType === 'oneWay' || !journey2) {
      router.push(`/booking-summary?${params.toString()}`);
    } else {
      if (journeyStep === 1) {
        setJourneyStep(2);
      } else {
        router.push(`/booking-summary?${params.toString()}`);
      }
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center overflow-hidden md:p-8 p-0">
      {/* Background Image */}
      <Image src={bgImage} alt="Background Image" layout="fill" objectFit="cover" className="z-0" />

      {/* Main Content Container */}
      <div className="relative z-10 bg-white bg-opacity-95 rounded-lg shadow-xl w-full max-w-5xl mx-auto">
        {/* Header Bar */}
        <div className="bg-[#3B82F6] p-4 sm:p-5 rounded-t-lg text-center">
          <h1 className="text-white text-xl sm:text-2xl font-bold">JOURNEY #{journeyStep}</h1>
        </div>

        {/* Main Content Area */}
        <div className="p-4 sm:p-6">
          {journeyStep === 1 && (
            <div className="text-gray-800 border border-gray-300 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold mb-1">Journey No 1</h2>
              {tripType !== 'oneWay' && journey2 && (
                <h3 className="text-md sm:text-lg font-normal text-gray-600 mb-5">Booking Summary Journey #2</h3>
              )}
              
              <div className="flex items-center mb-2">
                <MdLocationOn className="text-blue-600 text-xl mr-3" />
                <p className="text-base sm:text-lg">Route: {journey1.route}</p>
              </div>
              <div className="flex items-center mb-2">
                <MdCalendarMonth className="text-blue-600 text-xl mr-3" />
                <p className="text-base sm:text-lg">Departure Date: {journey1.departureDate}</p>
              </div>
              <div className="flex items-center mb-2">
                <MdAccessTime className="text-blue-600 text-xl mr-3" />
                <p className="text-base sm:text-lg">Flight Departure Time: {journey1.departureTime}</p>
              </div>
              <div className="flex items-center mb-2">
                <FaUsers className="text-blue-600 text-xl mr-3" />
                <p className="text-base sm:text-lg">Passengers: {journey1.passengers}</p>
              </div>

              {/* Pricing Details */}
              <div className="mt-4 border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">Pricing Breakdown</h3>
                <div className="flex justify-between mb-1">
                  <span>Base Price:</span>
                  <span>{journey1.basePrice}</span>
                </div>
                {journey1.supplementDetails.length > 0 && (
                  <div className="mb-2">
                    <p className="font-medium">Supplements Applied:</p>
                    <ul className="list-disc pl-5 text-sm">
                      {journey1.supplementDetails.map((detail: string, index: number) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                    <div className="flex justify-between mt-1">
                      <span>Total Supplements:</span>
                      <span>{journey1.supplements}</span>
                    </div>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                  <span>Total Price:</span>
                  <span className="text-blue-600">{journey1.totalPrice}</span>
                </div>
              </div>

              {/* Additional Information */}
              <h3 className="text-lg sm:text-xl font-bold mt-6 mb-3 text-gray-800">Additional Information</h3>
              <div className="flex items-start mb-2">
                <FaCar className="text-blue-600 text-xl mr-3 flex-shrink-0" />
                <p className="text-sm sm:text-base text-gray-700 leading-tight">Locally registered vehicle allowing access to back roads on peak weeks thus avoiding queues</p>
              </div>
              <div className="flex items-start mb-2">
                <FaCommentDots className="text-blue-600 text-xl mr-3 flex-shrink-0" />
                <p className="text-sm sm:text-base text-gray-700 leading-tight">English speaking experienced driver</p>
              </div>
              <div className="flex items-start mb-2">
                <FaSnowflake className="text-blue-600 text-xl mr-3 flex-shrink-0" />
                <p className="text-sm sm:text-base text-gray-700 leading-tight">Vehicles equipped for winter conditions</p>
              </div>
              <div className="flex items-start mb-2">
                <FaSkiing className="text-blue-600 text-xl mr-3 flex-shrink-0" />
                <p className="text-sm sm:text-base text-gray-700 leading-tight">Free Ski Carriage</p>
              </div>
              <div className="flex items-start mb-4">
                <FaShoppingCart className="text-blue-600 text-xl mr-3 flex-shrink-0" />
                <p className="text-sm sm:text-base text-gray-700 leading-tight">Option to add a supermarket stop when requesting your transfer</p>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <div className="mb-4 md:mb-0">
                  <p className="text-base sm:text-lg font-bold text-gray-800">Transfer Price Journey No {journeyStep}</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-600">{journey1.totalPrice}</p>
                </div>
                <div className='w-full md:w-auto'>
                  <button
                    onClick={handleSelect}
                    className="bg-blue-600 w-full hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out whitespace-nowrap"
                  >
                    SELECT
                  </button>
                </div>
              </div>
            </div>
          )}

          {journeyStep === 2 && journey2 && (
            <div className="text-gray-800 border border-gray-300 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold mb-1">Journey No 2</h2>
              <h3 className="text-md sm:text-lg font-normal text-gray-600 mb-5">Return Journey</h3>
              
              <div className="flex items-center mb-2">
                <MdLocationOn className="text-blue-600 text-xl mr-3" />
                <p className="text-base sm:text-lg">Route: {journey2.route}</p>
              </div>
              <div className="flex items-center mb-2">
                <MdCalendarMonth className="text-blue-600 text-xl mr-3" />
                <p className="text-base sm:text-lg">Departure Date: {journey2.departureDate}</p>
              </div>
              <div className="flex items-center mb-2">
                <MdAccessTime className="text-blue-600 text-xl mr-3" />
                <p className="text-base sm:text-lg">Flight Departure Time: {journey2.departureTime}</p>
              </div>
              <div className="flex items-center mb-2">
                <FaUsers className="text-blue-600 text-xl mr-3" />
                <p className="text-base sm:text-lg">Passengers: {journey2.passengers}</p>
              </div>

              {/* Pricing Details */}
              <div className="mt-4 border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">Pricing Breakdown</h3>
                <div className="flex justify-between mb-1">
                  <span>Base Price:</span>
                  <span>{journey2.basePrice}</span>
                </div>
                {journey2.supplementDetails.length > 0 && (
                  <div className="mb-2">
                    <p className="font-medium">Supplements Applied:</p>
                    <ul className="list-disc pl-5 text-sm">
                      {journey2.supplementDetails.map((detail: string, index: number) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                    <div className="flex justify-between mt-1">
                      <span>Total Supplements:</span>
                      <span>{journey2.supplements}</span>
                    </div>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                  <span>Total Price:</span>
                  <span className="text-blue-600">{journey2.totalPrice}</span>
                </div>
              </div>

              {/* Additional Information */}
              <h3 className="text-lg sm:text-xl font-bold mt-6 mb-3 text-gray-800">Additional Information</h3>
              <div className="flex items-start mb-2">
                <FaCar className="text-blue-600 text-xl mr-3 flex-shrink-0" />
                <p className="text-sm sm:text-base text-gray-700 leading-tight">Locally registered vehicle allowing access to back roads on peak weeks thus avoiding queues</p>
              </div>
              <div className="flex items-start mb-2">
                <FaCommentDots className="text-blue-600 text-xl mr-3 flex-shrink-0" />
                <p className="text-sm sm:text-base text-gray-700 leading-tight">English speaking experienced driver</p>
              </div>
              <div className="flex items-start mb-2">
                <FaSnowflake className="text-blue-600 text-xl mr-3 flex-shrink-0" />
                <p className="text-sm sm:text-base text-gray-700 leading-tight">Vehicles equipped for winter conditions</p>
              </div>
              <div className="flex items-start mb-2">
                <FaSkiing className="text-blue-600 text-xl mr-3 flex-shrink-0" />
                <p className="text-sm sm:text-base text-gray-700 leading-tight">Free Ski Carriage</p>
              </div>
              <div className="flex items-start mb-4">
                <FaShoppingCart className="text-blue-600 text-xl mr-3 flex-shrink-0" />
                <p className="text-sm sm:text-base text-gray-700 leading-tight">Option to add a supermarket stop when requesting your transfer</p>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <div className="mb-4 md:mb-0">
                  <p className="text-base sm:text-lg font-bold text-gray-800">Transfer Price Journey No {journeyStep}</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-600">{journey2.totalPrice}</p>
                </div>
                <div className='w-full md:w-auto'>
                  <button
                    onClick={handleSelect}
                    className="bg-blue-600 w-full hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out whitespace-nowrap"
                  >
                    SELECT
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function JourneyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JourneyPageContent />
    </Suspense>
  );
}