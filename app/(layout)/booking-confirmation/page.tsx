'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiCheckCircle, FiHome } from 'react-icons/fi';
import { Suspense, useEffect, useState } from 'react';
import { MdLocationOn, MdCalendarMonth, MdAccessTime, MdEmail, MdPhone } from 'react-icons/md';
import { FaUsers, FaEuroSign, FaShoppingCart } from 'react-icons/fa';

function BookingConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  // Extract all the parameters from the URL
  const firstName = searchParams.get('firstName') || '';
  const lastName = searchParams.get('lastName') || '';
  const email = searchParams.get('email') || '';
  const phoneNumber = searchParams.get('phoneNumber') || '';
  const tripType = searchParams.get('tripType') || 'oneWay';
  const pickupLocation = searchParams.get('pickupLocation') || '';
  const destinationLocation = searchParams.get('destinationLocation') || '';
  const selectedDate = searchParams.get('selectedDate') || '';
  const selectedTime = searchParams.get('selectedTime') || '';
  const returnDate = searchParams.get('returnDate') || '';
  const returnTime = searchParams.get('returnTime') || '';
  const adults = searchParams.get('adults') || '2';
  const children = searchParams.get('children') || '0';
  const totalPrice = searchParams.get('totalPrice') || '0';
  const returnTotalPrice = searchParams.get('returnTotalPrice') || '0';
  const includeSupermarketStop = searchParams.get('includeSupermarketStop') === 'true';
  const accommodationAddress = searchParams.get('accommodationAddress') || '';
  const specialRequests = searchParams.get('specialRequests') || '';

  // Format price for display
  const formatPrice = (price: string) => {
    const numericPrice = parseFloat(price);
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(numericPrice);
  };

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

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-2xl w-full">
        {/* Success Icon */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <FiCheckCircle className="h-10 w-10 text-green-600" />
          </div>
          
          {/* Success Message */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 text-center mb-4">
            Hello {firstName} {lastName},
          </p>
          <p className="text-gray-600 text-center mb-6">
            Thank you for your airport transfer booking enquiry. Based on the information submitted below, 
            we will check availability and get back to you within the next couple of hours.
          </p>
        </div>

        {/* Booking Summary */}
        <div className="border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Booking Summary</h3>
          
          {/* Passenger Details */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Passenger Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Name:</span>
                <span className="font-medium">{firstName} {lastName}</span>
              </div>
              <div className="flex items-center">
                <MdEmail className="text-gray-500 mr-2" />
                <span className="text-gray-600">{email}</span>
              </div>
              <div className="flex items-center">
                <MdPhone className="text-gray-500 mr-2" />
                <span className="text-gray-600">{phoneNumber}</span>
              </div>
              <div className="flex items-center">
                <FaUsers className="text-gray-500 mr-2" />
                <span className="text-gray-600">{adults} Adults, {children} Children</span>
              </div>
            </div>
          </div>

          {/* Journey Details */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Journey Details</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <MdLocationOn className="text-blue-500 mr-3" />
                <div>
                  <p className="font-medium">{tripType === 'roundTrip' ? 'Round Trip' : 'One Way'}</p>
                  <p className="text-gray-600">{pickupLocation} → {destinationLocation}</p>
                  {tripType === 'roundTrip' && (
                    <p className="text-gray-600">{destinationLocation} → {pickupLocation}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center">
                <MdCalendarMonth className="text-blue-500 mr-3" />
                <div>
                  <p className="font-medium">Outward Journey</p>
                  <p className="text-gray-600">{formatDisplayDate(selectedDate)} at {selectedTime}</p>
                </div>
              </div>
              
              {tripType === 'roundTrip' && (
                <div className="flex items-center">
                  <MdCalendarMonth className="text-blue-500 mr-3" />
                  <div>
                    <p className="font-medium">Return Journey</p>
                    <p className="text-gray-600">{formatDisplayDate(returnDate)} at {returnTime}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Additional Information</h4>
            <div className="space-y-3">
              {accommodationAddress && (
                <div>
                  <p className="font-medium">Accommodation Address</p>
                  <p className="text-gray-600">{accommodationAddress}</p>
                </div>
              )}
              
              {includeSupermarketStop && (
                <div className="flex items-center">
                  <FaShoppingCart className="text-blue-500 mr-3" />
                  <span className="text-gray-600">Includes Supermarket Stop</span>
                </div>
              )}
              
              {specialRequests && (
                <div>
                  <p className="font-medium">Special Requests</p>
                  <p className="text-gray-600">{specialRequests}</p>
                </div>
              )}
            </div>
          </div>

          {/* Price Summary */}
          <div className="border-t pt-4">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Price Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Outward Journey:</span>
                <span className="font-medium">{formatPrice(totalPrice)}</span>
              </div>
              
              {tripType === 'roundTrip' && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Return Journey:</span>
                  <span className="font-medium">{formatPrice(returnTotalPrice)}</span>
                </div>
              )}
              
              {includeSupermarketStop && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Supermarket Stop:</span>
                  <span className="font-medium">+ {formatPrice('25')}</span>
                </div>
              )}
              
              <div className="flex justify-between border-t pt-2 mt-2">
                <span className="text-lg font-bold text-gray-800">Total Amount:</span>
                <span className="text-lg font-bold text-blue-600">
                  {tripType === 'roundTrip' 
                    ? formatPrice((parseFloat(totalPrice) + parseFloat(returnTotalPrice) + (includeSupermarketStop ? 25 : 0)).toString())
                    : formatPrice((parseFloat(totalPrice) + (includeSupermarketStop ? 25 : 0)).toString())
                  }
                </span>
              </div>
            </div>
          </div>
        </div>


        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={() => router.push('/')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiHome className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BookingConfirmation() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <BookingConfirmationContent />
    </Suspense>
  );
}