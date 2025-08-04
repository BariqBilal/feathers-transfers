// components/PartnerSection.tsx
import React from 'react';
import Image from 'next/image'; // Import Next.js Image component

const AboutSection: React.FC = () => {
  return (
    <section className=" py-10 px-4"> {/* Light blue background */}
      <div className="max-w-7xl mx-auto rounded-lg p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
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
            Our Alpine Journey
          </h2>
          <p className="text-gray-700 text-justify text-lg leading-relaxed mb-4">
          With a love of France and particularly its spectacular mountains, we have been based in the French Alps for thirty years. During this time, we have been running Travel and Tourism companies: an apartment rental business (pre Air BnB!), catered chalets, property renovations and hotel management.
          </p>
          <p className="text-gray-700 text-lg text-justify leading-relaxed mb-4">
          When the opportunity came to sell our Spitting Feathers Après Ski Bar in La Plagne Bellecote, we jumped at the chance to concentrate solely on airport transfers and out of this has been born 'Feathers Transfers.
          </p>
          <p className="text-gray-700 text-lg text-justify leading-relaxed">
         As a small, yet very experienced operator, we take pride in our ability to offer exceptional reliability, personalised attention, and a level of service perhaps unmatched by larger competitors.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
