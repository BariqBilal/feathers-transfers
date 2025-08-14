import Link from 'next/link';

export default function Links() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Feathers Transfers</h1>
        <p className="text-gray-700 mb-8 text-center">
          We are the transfer specialists for La Plagne with over 20yrs of transfers safely undertaken to and from the resort.
        </p>

        <div className="space-y-4">
          <Link 
            href="/book-now" 
            className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg text-center transition duration-200"
          >
            Airport Transfers
          </Link>

          <a
            href="https://www.facebook.com/featherstransfers"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition duration-200"
          >
            Facebook
          </a>

          <a
            href="https://www.x.com/featherstrans"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-black hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg text-center transition duration-200"
          >
            Twitter / X
          </a>

          <Link
            href="/contact"
            className="block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg text-center transition duration-200"
          >
            Contact Us
          </Link>
        </div>

        <p className="text-gray-500 text-sm mt-8 text-center">
          © {new Date().getFullYear()} Feathers Transfers. All rights reserved.
        </p>
      </div>
    </div>
  );
}