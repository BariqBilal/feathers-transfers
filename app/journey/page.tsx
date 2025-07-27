'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

// Import React Icons
import { MdLocationOn, MdCalendarMonth, MdAccessTime } from 'react-icons/md';
import { FaUsers, FaEuroSign, FaCar, FaCommentDots, FaSnowflake, FaSkiing, FaShoppingCart } from 'react-icons/fa';

export default function JourneyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract all the parameters from the URL
  // Using defaults for demonstration if params are not set, useful for direct access during development
  const tripType = searchParams.get('tripType');
  const pickupLocation = searchParams.get('pickupLocation');
  const destinationLocation = searchParams.get('destinationLocation');
  const selectedDate = searchParams.get('selectedDate');
  const selectedTime = searchParams.get('selectedTime');
  const returnDate = searchParams.get('returnDate');
  const returnTime = searchParams.get('returnTime');
  const adults = searchParams.get('adults');
  const children = searchParams.get('children');

  // For background image
  // Assuming /hero.jpg is in your public directory
  const bgImage = '/hero.jpg';

  // Journey 1 details
  const journey1 = {
    route: `${pickupLocation || 'Plagne 1800'} → ${destinationLocation || 'Geneva Airport'}`,
    departureDate: selectedDate || '27th Dec 25',
    departureTime: selectedTime || '16h00',
    passengers: `${adults || 2} Adults, ${children || 0} Children`, // Reverted to original passenger format
    price: '549.81€',
  };

  // Journey 2 details for round trips (if available)
  const journey2 = returnDate
    ? {
        route: `${destinationLocation || 'Geneva Airport'} → ${pickupLocation || 'Plagne 1800'}`,
        departureDate: returnDate,
        departureTime: returnTime,
        passengers: `${adults || 2} Adults, ${children || 0} Children`, // Reverted to original passenger format
        price: '549.81€',
      }
    : null;

  // State to handle the journey flow
  const [journeyStep, setJourneyStep] = useState(1);

  // Handle button click for navigating to the booking summary
  const handleSelect = () => {
    // Prepare URL parameters to pass to BookingSummary page
    const params = new URLSearchParams();
    params.append('tripType', tripType || 'oneWay');
    params.append('pickupLocation', pickupLocation || 'Plagne 1800');
    params.append('destinationLocation', destinationLocation || 'Geneva Airport');
    params.append('selectedDate', selectedDate || '27th Dec 25');
    params.append('selectedTime', selectedTime || '16h00');
    params.append('adults', adults || '2');
    params.append('children', children || '0');

    if (tripType === 'oneWay' || !journey2) {
      // For one-way trips or when journey2 is not applicable
      router.push(`/booking-summary?${params.toString()}`);
    } else {
      // For round trips, manage the two steps
      if (journeyStep === 1) {
        setJourneyStep(2); // Go to Journey 2 after Journey 1 select
        // No navigation yet, just update the current page's view
      } else {
        // After Journey 2, navigate to booking-summary, including return journey details
        if (returnDate) params.append('returnDate', returnDate);
        if (returnTime) params.append('returnTime', returnTime);
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
                <p className="text-base sm:text-lg">No Passengers: {journey1.passengers}</p>
              </div>
              <div className="flex items-center mb-4">
                <FaEuroSign className="text-blue-600 text-xl mr-3" />
                <p className="text-base sm:text-lg">Price: {journey1.price}</p>
              </div>

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
                  <p className="text-xl sm:text-2xl font-bold text-blue-600">{journey1.price}</p>
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
              <h3 className="text-md sm:text-lg font-normal text-gray-600 mb-5">Booking Summary Journey #2</h3>
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
                <p className="text-base sm:text-lg">No Passengers: {journey2.passengers}</p>
              </div>
              <div className="flex items-center mb-4">
                <FaEuroSign className="text-blue-600 text-xl mr-3" />
                <p className="text-base sm:text-lg">Price: {journey2.price}</p>
              </div>

              {/* Additional Information (assuming same for both journeys or adjust as needed) */}
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
                  <p className="text-xl sm:text-2xl font-bold text-blue-600">{journey2.price}</p>
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
