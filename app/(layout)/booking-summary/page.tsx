'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

// Import React Icons
import { MdLocationOn, MdCalendarMonth, MdAccessTime } from 'react-icons/md';
import { FaUsers, FaEuroSign } from 'react-icons/fa';
import Link from 'next/link';

function BookingSummaryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
  const totalPrice = parseFloat(searchParams.get('totalPrice') || '0');
  const returnTotalPrice = parseFloat(searchParams.get('returnTotalPrice') || '0');

  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(price);
  };

  // For background image
  const bgImage = '/ccc.PNG';

  // Calculate total amount
  const totalAmount = tripType === 'roundTrip' 
    ? formatPrice(totalPrice + returnTotalPrice)
    : formatPrice(totalPrice);

  // State for form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    accommodationAddress: '',
    accommodationWebsite: '',
    specialRequests: ''
  });

  // State for terms and conditions checkbox
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      alert('Please agree to the Terms and Conditions.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Prepare the API request data
      const requestData = {
        from_location: pickupLocation,
        to_location: destinationLocation,
        return_from_location: tripType === 'roundTrip' ? destinationLocation : '',
        return_to_location: tripType === 'roundTrip' ? pickupLocation : '',
        date_time: `${selectedDate}T${selectedTime}:00`,
        return_date_time: tripType === 'roundTrip' ? `${returnDate}T${returnTime}:00` : '',
        price: (totalPrice + (tripType === 'roundTrip' ? returnTotalPrice : 0)).toString(),
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone_number: formData.phoneNumber,
        accommodation_address: formData.accommodationAddress,
        accommodation_website: formData.accommodationWebsite,
        special_requests: formData.specialRequests,
        adults: adults,
        children: children
      };

      // Make the API call
      const response = await axios.post(
        'https://devsquare-apis.vercel.app/api/transfers',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        router.push('/booking-confirmation');
      } else {
        throw new Error('Failed to submit booking');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      setSubmitError('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center overflow-hidden md:p-8 p-0">
      {/* Background Image */}
      <Image src={bgImage} alt="Background Image" layout="fill" objectFit="cover" className="z-0" />

      {/* Main Content Container */}
      <div className="relative z-10 bg-white bg-opacity-95 rounded-lg shadow-xl w-full max-w-6xl mx-auto">
        {/* Header Bar */}
        <div className="bg-[#3B82F6] p-4 sm:p-5 rounded-t-lg text-center">
          <h1 className="text-white text-xl sm:text-2xl font-bold">Booking Summary</h1>
        </div>

        {/* Main Content Area */}
        <div className="p-4 sm:p-6">
          {!isMobile && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Journey Summary */}
              <div className="text-gray-800 border border-gray-300 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg sm:text-xl font-bold mb-4">Journey Details</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MdLocationOn className="text-blue-600 text-xl mr-3" />
                    <p className="text-base sm:text-lg">
                      {tripType === 'roundTrip' ? 'Round Trip' : 'One Way'}: {pickupLocation} → {destinationLocation}
                      {tripType === 'roundTrip' && ` → ${pickupLocation}`}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <MdCalendarMonth className="text-blue-600 text-xl mr-3" />
                    <p className="text-base sm:text-lg">Departure: {new Date(selectedDate).toLocaleDateString()} at {selectedTime}</p>
                  </div>
                  {tripType === 'roundTrip' && (
                    <div className="flex items-center">
                      <MdCalendarMonth className="text-blue-600 text-xl mr-3" />
                      <p className="text-base sm:text-lg">Return: {new Date(returnDate).toLocaleDateString()} at {returnTime}</p>
                    </div>
                  )}
                  <div className="flex items-center">
                    <FaUsers className="text-blue-600 text-xl mr-3" />
                    <p className="text-base sm:text-lg">Passengers: {adults} Adults, {children} Children</p>
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              <div className="border border-gray-300 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg sm:text-xl font-bold mb-4">Price Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Outward Journey:</span>
                    <span className="font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                  {tripType === 'roundTrip' && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">Return Journey:</span>
                      <span className="font-medium">{formatPrice(returnTotalPrice)}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span className="text-blue-600">{totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Forms Section */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            {/* Lead Passenger Details */}
            <div className="border border-gray-300 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">Lead Passenger Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder=""
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Travel Details */}
            <div className="border border-gray-300 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">Travel Details</h3>
              <div className="mb-4">
                <label htmlFor="accommodationAddress" className="block text-sm font-medium text-gray-700 mb-1">Accommodation Address</label>
                <textarea
                  id="accommodationAddress"
                  name="accommodationAddress"
                  value={formData.accommodationAddress}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                  
                <div className="mb-4">
                  <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Price Display (Mobile Only) */}
            {isMobile && (
              <div className="border border-gray-300 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Total Price</h3>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{totalAmount}</p>
                </div>
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="border border-gray-300 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">Terms & Conditions</h3>
              <div className="text-sm text-gray-700 space-y-3">
                <p>1. All transfers are subject to availability.</p>
                <p>2. Prices include all taxes and fees.</p>
                <p>3. Cancellations must be made at least 48 hours prior to the scheduled transfer for a full refund.</p>
                <p>4. The company is not responsible for delays caused by weather or traffic conditions.</p>
                <p>5. Children under 12 must be accompanied by an adult.</p>
              </div>
              <div className="flex items-center mt-6">
                <input
                  type="checkbox"
                  id="termsAndConditions"
                  name="termsAndConditions"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  required
                />
                <label htmlFor="termsAndConditions" className="ml-2 block text-sm text-gray-900">
  I agree to the <Link href="/terms"><span className="text-primary underline">Terms and Conditions</span></Link>
</label>

              </div>
            </div>

            {/* Submit Button and Error Message */}
            <div className="px-4 pb-4 sm:px-6 sm:pb-6">
              {submitError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {submitError}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out text-lg disabled:opacity-50"
                disabled={!agreedToTerms || isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function BookingSummary() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingSummaryContent />
    </Suspense>
  );
}