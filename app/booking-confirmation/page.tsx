'use client';
import { useRouter } from 'next/navigation';
import { FiCheckCircle, FiHome } from 'react-icons/fi';

export default function BookingConfirmation() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <FiCheckCircle className="h-10 w-10 text-green-600" />
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Booking Confirmed!</h2>
        <p className="text-gray-600 mb-6">
          Your office space has been successfully booked. We've sent a confirmation to your email.
        </p>

     

        {/* Action Button */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
        >
          <FiHome className="w-5 h-5" />
          Back to Home
        </button>
      </div>
    </div>
  );
}