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
      className="relative h-full bg-cover bg-center flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        height: height,
      }}
    >
      {/* Dark overlay */}
      <div className="bg-black/50 absolute inset-0"></div>

      {/* Content in the center */}
      <div className="relative z-10 px-6 sm:px-8 lg:px-12 text-white text-center py-20">
        {/* Title and Description */}
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-base sm:text-lg md:text-xl max-w-4xl mx-auto">{description}</p>
      </div>
    </section>
  );
};

export default HeroSection2;
