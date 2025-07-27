import React from 'react';

interface HeroSectionProps {
  height?: string;
  bgImage: string;
  title: string;
  description: string;
}

const HeroSection2: React.FC<HeroSectionProps> = ({ height = '100vh', bgImage, title, description }) => {
  return (
    <section
      className="relative h-full bg-cover bg-center flex flex-col justify-between items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        height: height,
      }}
    >
      {/* Dark overlay */}
      <div className="bg-black/50 absolute inset-0"></div>

      {/* Content at the top */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 text-white text-center pt-20">
        {/* Title and Description: visible only on large screens */}
        <h1 className="hidden lg:block text-2xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="hidden lg:block text-xl sm:text-xl">{description}</p>
      </div>
    </section>
  );
};

export default HeroSection2;
