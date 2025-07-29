import React from 'react';
import LocationInput from '../locationInput/LocationInput';

interface HeroSectionProps {
  height?: string;
  bgImage: string;
  title: string;
  description: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ height = '80vh', bgImage, title, description }) => {
  return (
    <section
      className="relative h-full bg-cover bg-center flex flex-col justify-between items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        minHeight: height,
      }}
    >
      <div className="bg-black/20 absolute inset-0"></div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 text-white md:text-center text-left md:pt-32 pt-8">
        <h1 className=" lg:block text-2xl md:text-5xl font-bold mb-2">{title}</h1>
        <p className=" lg:block text-md md:text-xl pb-4">{description}</p>
      </div>

      <div className="relative z-10 w-full md:pb-10 mx-auto mt-auto md:top-20 top-4">
        <LocationInput />
      </div>
    </section>
  );
};

export default HeroSection;
