'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

// Import React Icons
import { MdLocationOn, MdCalendarMonth, MdAccessTime } from 'react-icons/md';
import { FaUsers, FaEuroSign } from 'react-icons/fa';

export default function BookingSummary() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract all the parameters from the URL
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
  const bgImage = '/hero.jpg';

  // Journey 1 details (using defaults for demonstration if params are not set)
  const journey1 = {
    route: `${pickupLocation || 'Plagne 1800'} → ${destinationLocation || 'Geneva Airport'}`,
    departureDate: selectedDate || '27th Dec 25',
    departureTime: selectedTime || '16h00',
    passengers: `${adults || 2} Adults, ${children || 0} Children`,
    price: '549.81€',
  };

  // Journey 2 details for round trips (if available)
  const journey2 = returnDate
    ? {
        route: `${destinationLocation || 'Geneva Airport'} → ${pickupLocation || 'Plagne 1800'}`,
        departureDate: returnDate,
        departureTime: returnTime,
        passengers: `${adults || 2} Adults, ${children || 0} Children`,
        price: '549.81€',
      }
    : null;

  // Calculate total price
  const totalAmount = journey2 ? (parseFloat(journey1.price) + parseFloat(journey2.price)).toFixed(2) + '€' : journey1.price;

  // State for terms and conditions checkbox
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Handle form submission (placeholder for now)
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!agreedToTerms) {
      console.log('Please agree to the Terms and Conditions.');
      return;
    }
    console.log('Booking submitted!', {
      journey1,
      journey2,
      totalAmount,
    });
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center overflow-hidden md:p-8 p-0">
      {/* Background Image */}
      <Image src={bgImage} alt="Background Image" layout="fill" objectFit="cover" className="z-0" />

      {/* Main Content Container */}
      <div className="relative z-10 bg-white bg-opacity-95 rounded-lg shadow-xl w-full max-w-6xl mx-auto ">
        {/* Header Bar */}
        <div className="bg-[#3B82F6] p-4 sm:p-5 rounded-t-lg text-center">
          <h1 className="text-white text-xl sm:text-2xl font-bold">Booking Summary</h1>
        </div>

        {/* Main Content Area */}
        <div className="p-4 sm:p-6">
          {/* Journey Details Section */}
          <div className={`grid ${journey2 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-6 mb-8`}>
            {/* Journey 1 Card */}
            <div className="text-gray-800 md:border border-gray-300 rounded-xl md:p-6 p-2 md:shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold mb-1">Journey No 1</h2>
              <h3 className="text-md sm:text-lg font-normal text-gray-600 mb-5">Booking Summary Journey #1</h3>
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
            </div>

            {/* Journey 2 Card (conditionally rendered) */}
            {journey2 && (
              <div className="text-gray-800 md:border border-gray-300 rounded-xl md:p-6 p-2 md:shadow-sm">
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
              </div>
            )}
          </div>

          {/* Forms Section */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Lead Passenger Details */}
            <div className="md:border border-gray-300 rounded-xl md:p-6 p-2 md:shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">Lead Passenger Details</h3>
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">Surname</label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+44"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Travel Details */}
            <div className="md:border border-gray-300 rounded-xl md:p-6 p-2 md:shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">Travel Details</h3>
              <div className="mb-4">
                <label htmlFor="accommodationAddress" className="block text-sm font-medium text-gray-700 mb-1">Accommodation Address</label>
                <textarea
                  id="accommodationAddress"
                  name="accommodationAddress"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="accommodationWebsite" className="block text-sm font-medium text-gray-700 mb-1">Accommodation Website</label>
                <input
                  type="url"
                  id="accommodationWebsite"
                  name="accommodationWebsite"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
            </div>
          </form>

          {/* Transfer Recap and Terms */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Transfer Recap */}
            <div className="md:border border-gray-300 rounded-xl md:p-6 p-2 md:shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">Transfer Recap</h3>
              <div className="flex justify-between items-center mb-2">
                <p className="text-base sm:text-lg text-gray-700">Journey #1</p>
                <p className="text-base sm:text-lg font-semibold text-gray-800">{journey1.price}</p>
              </div>
              {journey2 && (
                <div className="flex justify-between items-center mb-2">
                  <p className="text-base sm:text-lg text-gray-700">Journey #2</p>
                  <p className="text-base sm:text-lg font-semibold text-gray-800">{journey2.price}</p>
                </div>
              )}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <p className="text-lg sm:text-xl font-bold text-gray-800">Transfer Total</p>
                <p className="text-lg sm:text-xl font-bold text-blue-600">{totalAmount}</p>
              </div>
            </div>

            {/* Empty column or other content if needed for layout symmetry */}
            <div className="hidden lg:block"></div>
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-center mt-6 mb-8">
            <input
              type="checkbox"
              id="termsAndConditions"
              name="termsAndConditions"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
            <label htmlFor="termsAndConditions" className="ml-2 block text-sm text-gray-900">
              I agree to Terms and Conditions (check box obligatory)
            </label>
          </div>

          {/* Submit Button */}
          <div className="px-4 pb-4 sm:px-6 sm:pb-6">
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out text-lg"
            >
              Click Here to request your transfer enquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
