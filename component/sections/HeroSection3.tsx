import React from 'react';
    import QuoteSystem from './QuickQuote';

interface HeroSectionProps {
  height?: string;
  bgImage: string;
  title: string;
  description: string;
}

const HeroSection3: React.FC<HeroSectionProps> = ({ height = '70vh', bgImage, title, description }) => {
  return (
    <section
      className="relative h-full bg-cover bg-center flex flex-col justify-between items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        minHeight: height,
      }}
    >
      <div className="bg-black/20 absolute inset-0"></div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 text-white md:text- text-left  pb-8 pt-8 w-full">
        <div className=" flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 flex justify-center md:justify-end">
            <QuoteSystem />
          </div>
          <div className="md:w-1/2 mb-8 md:mb-0 hidden md:block">
            <h1 className="text-2xl md:text-5xl font-bold mb-2">{title}</h1>
            <p className="text-md md:text-xl pb-4">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection3;