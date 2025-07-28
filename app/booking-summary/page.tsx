'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

// Import React Icons
import { MdLocationOn, MdCalendarMonth, MdAccessTime } from 'react-icons/md';
import { FaUsers, FaEuroSign } from 'react-icons/fa';

function BookingSummaryContent() {
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
  const catTitle = searchParams.get('catTitle') || 'Standard Sedan';
  
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

  // Calculate total amount
  const totalAmount = journey2 
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
        cat_title: catTitle,
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
          {/* Journey Details Section */}
          <div className={`grid ${journey2 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-6 mb-8`}>
            {/* Journey 1 Card */}
            <div className="text-gray-800 md:border border-gray-300 rounded-xl md:p-6 p-2 md:shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold mb-1">Journey No 1</h2>
              <h3 className="text-md sm:text-lg font-normal text-gray-600 mb-5">Outward Journey</h3>
              
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
            </div>

            {/* Journey 2 Card (conditionally rendered) */}
            {journey2 && (
              <div className="text-gray-800 md:border border-gray-300 rounded-xl md:p-6 p-2 md:shadow-sm">
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
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+44"
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

            {/* Travel Details */}
            <div className="md:border border-gray-300 rounded-xl md:p-6 p-2 md:shadow-sm">
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
              <div className="mb-4">
                <label htmlFor="accommodationWebsite" className="block text-sm font-medium text-gray-700 mb-1">Accommodation Website</label>
                <input
                  type="url"
                  id="accommodationWebsite"
                  name="accommodationWebsite"
                  value={formData.accommodationWebsite}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
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
          </form>

          {/* Transfer Recap and Terms */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Transfer Recap */}
            <div className="md:border border-gray-300 rounded-xl md:p-6 p-2 md:shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">Transfer Recap</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-base sm:text-lg text-gray-700">Journey #1 Base Price</p>
                  <p className="text-base sm:text-lg font-semibold text-gray-800">{journey1.basePrice}</p>
                </div>
                {journey1.supplementDetails.length > 0 && (
                  <div className="flex justify-between items-center">
                    <p className="text-base sm:text-lg text-gray-700">Journey #1 Supplements</p>
                    <p className="text-base sm:text-lg font-semibold text-gray-800">{journey1.supplements}</p>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2 border-t">
                  <p className="text-base sm:text-lg font-medium text-gray-800">Journey #1 Total</p>
                  <p className="text-base sm:text-lg font-semibold text-blue-600">{journey1.totalPrice}</p>
                </div>

                {journey2 && (
                  <>
                    <div className="flex justify-between items-center pt-4">
                      <p className="text-base sm:text-lg text-gray-700">Journey #2 Base Price</p>
                      <p className="text-base sm:text-lg font-semibold text-gray-800">{journey2.basePrice}</p>
                    </div>
                    {journey2.supplementDetails.length > 0 && (
                      <div className="flex justify-between items-center">
                        <p className="text-base sm:text-lg text-gray-700">Journey #2 Supplements</p>
                        <p className="text-base sm:text-lg font-semibold text-gray-800">{journey2.supplements}</p>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2 border-t">
                      <p className="text-base sm:text-lg font-medium text-gray-800">Journey #2 Total</p>
                      <p className="text-base sm:text-lg font-semibold text-blue-600">{journey2.totalPrice}</p>
                    </div>
                  </>
                )}
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <p className="text-lg sm:text-xl font-bold text-gray-800">Transfer Total</p>
                <p className="text-lg sm:text-xl font-bold text-blue-600">{totalAmount}</p>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="md:border border-gray-300 rounded-xl md:p-6 p-2 md:shadow-sm">
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
                  I agree to the Terms and Conditions
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button and Error Message */}
          <div className="px-4 pb-4 sm:px-6 sm:pb-6 mt-8">
            {submitError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {submitError}
              </div>
            )}
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out text-lg disabled:opacity-50"
              disabled={!agreedToTerms || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : agreedToTerms ? 'Confirm Booking' : 'Please accept Terms & Conditions'}
            </button>
          </div>
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