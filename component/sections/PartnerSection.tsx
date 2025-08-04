// components/PartnerSection.tsx
import React from 'react';
import Image from 'next/image'; // Import Next.js Image component

const PartnerSection: React.FC = () => {
  return (
    <section className="bg-blue-50 py-10 px-4"> {/* Light blue background */}
      <div className="max-w-7xl mx-auto bg-blue-50 rounded-lg p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Image Column */}
        <div className="flex justify-center lg:justify-start">
          <Image
            src="/aboutsec.jpg" // IMPORTANT: Replace with your actual image path (e.g., /images/la-plagne-ski.jpg)
            alt="La Plagne Ski Resort"
            width={600} // Specify the width of the image
            height={400} // Specify the height of the image
            layout="responsive" // Makes the image responsive, filling its parent container
            objectFit="cover" // Ensures the image covers the area without distortion
            className="rounded-lg shadow-lg" // Tailwind classes for styling
            // For external images, you would need to add them to next.config.js domains
            // For local images, ensure they are in the public directory or imported
          />
        </div>

        {/* Text Content Column */}
        <div className="text-center lg:text-left">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6 font-inter">
            Your Trusted Partner in La Plagne
          </h2>
          <p className="text-gray-700 text-justify text-lg leading-relaxed mb-4">
            La Plagne is a collection of eleven small, purpose-built ski resorts and traditional villages located on the edge of the Vanoise National Park. Renowned as a family-friendly resort, it has a good selection of beginner pistes but also some great choices for the more advanced skier or snowboarder.
          </p>
          <p className="text-gray-700 text-lg text-justify leading-relaxed">
           Getting around is easy thanks to free shuttle buses and a great network of ski lifts that connect all the resorts and villages. Some of these links are open at night to help visitors get from their accommodation to the different restaurants, shops and bars in the neighbouring resorts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
