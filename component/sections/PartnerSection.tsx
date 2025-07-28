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
            src="/sec1.PNG" // IMPORTANT: Replace with your actual image path (e.g., /images/la-plagne-ski.jpg)
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
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            We started operating transfers from Les Gets to Geneva in 2004 and since 2007 have been based in
            La Plagne owning and running an English Pub 'Spitting Feathers' and establishing 'Spitting Feathers
            Airport Transfers' under the same brand.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Having sold the pub, now with Feathers Transfers,
            we have a renewed enthusiasm, a fresh identity and
            a greater dedication to undertake your transfer.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
