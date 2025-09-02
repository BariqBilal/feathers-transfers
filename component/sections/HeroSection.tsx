import React, { Suspense } from 'react';
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
          <Suspense fallback={
              <div className="relative flex items-center justify-center">
                <div className="bg-white p-4 rounded-xl md:shadow-lg md:w-auto w-full md:min-w-4xl pt-12">
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                </div>
              </div>
            }>
        <LocationInput />
            </Suspense>
      </div>
    </section>
  );
};

export default HeroSection;
