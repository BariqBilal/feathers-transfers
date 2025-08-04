'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LocationCustom from '../formcomponent/LocationCustom';
import DateTimeInput from '../formcomponent/DateTimeInput';
import PaxSelectorInput from '../formcomponent/PaxSelectorInput';

const QuoteSystem = () => {
  const router = useRouter();
  const [showQuoteDetails, setShowQuoteDetails] = useState(true);
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip'>('roundTrip');
  const [pickupLocation, setPickupLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('09:00');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [minReturnDate, setMinReturnDate] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [priceDetails, setPriceDetails] = useState<string[]>([]);

  const pickupLocations = [
    { value: 'CMF', label: 'Chambery (CMF)', type: 'airport' as const, country: 'FR' as const, code: 'CMF' },
    { value: 'GVA', label: 'Geneva Airport (GVA)', type: 'airport' as const, country: 'CH' as const, code: 'GVA' },
    { value: 'Hotel GVA', label: 'Geneva Hotel', type: 'hotel' as const, country: 'CH' as const },
    { value: 'Gen Centre', label: 'Geneva City Centre', type: 'city' as const, country: 'CH' as const },
    { value: 'LYS', label: 'Lyon (LYS)', type: 'airport' as const, country: 'FR' as const, code: 'LYS' },
    { value: 'Lyon Centre', label: 'Lyon City Centre', type: 'city' as const, country: 'FR' as const },
    { value: 'GNB', label: 'Grenoble (GNB)', type: 'airport' as const, country: 'FR' as const, code: 'GNB' },
    { value: 'AIME', label: 'Aime Train Station', type: 'station' as const, country: 'FR' as const, code: 'GARE AIME' },
    { value: 'BSM', label: 'Bourg Saint Maurice Train Station', type: 'station' as const, country: 'FR' as const, code: 'GARE BSM' },
  ];

  const destinationLocations = [
    { value: 'La Plagne 1800', label: 'La Plagne 1800', type: 'resort' as const, country: 'FR' as const },
    { value: 'La Plagne Centre', label: 'La Plagne Centre', type: 'resort' as const, country: 'FR' as const },
    { value: 'Belle Plagne', label: 'Belle Plagne', type: 'resort' as const, country: 'FR' as const },
    { value: 'La Plagne Bellecote', label: 'La Plagne Bellecote', type: 'resort' as const, country: 'FR' as const },
    { value: 'La Plagne Aime 2000', label: 'La Plagne - Aime 2000', type: 'resort' as const, country: 'FR' as const },
    { value: 'La Plagne Villages', label: 'La Plagne Villages', type: 'resort' as const, country: 'FR' as const },
    { value: 'La Plagne Soleil', label: 'La Plagne Soleil', type: 'resort' as const, country: 'FR' as const },
    { value: 'La Plagne La Roche', label: 'La Plagne La Roche', type: 'resort' as const, country: 'FR' as const },
    { value: 'La Plagne Crete Cote', label: 'La Plagne Crete Cote', type: 'resort' as const, country: 'FR' as const },
    { value: 'La Plagne Montablert', label: 'La Plagne Montablert', type: 'resort' as const, country: 'FR' as const },
    { value: 'Montchavin', label: 'Montchavin', type: 'resort' as const, country: 'FR' as const },
    { value: 'Les Coches', label: 'Les Coches', type: 'resort' as const, country: 'FR' as const },
    { value: 'Champagny en Vanoise', label: 'Champagny en Vanoise', type: 'resort' as const, country: 'FR' as const },
    { value: 'Other', label: 'Other: Please specify', type: 'other' as const },
  ];

  // Exact pricing data from the spreadsheet
  const pricingData: Record<string, Record<number, number>> = {
    'CMF': {1: 317, 2: 317, 3: 317, 4: 317, 5: 332.85, 6: 346.16, 7: 356.55, 8: 363.68, 9: 654.62, 10: 687.36, 11: 714.85, 12: 736.29},
    'GVA': {1: 360, 2: 360, 3: 360, 4: 360, 5: 378, 6: 393.12, 7: 404.91, 8: 413.01, 9: 743.42, 10: 780.59, 11: 811.82, 12: 836.17},
    'Hotel GVA': {1: 375, 2: 375, 3: 375, 4: 375, 5: 393.75, 6: 409.5, 7: 421.79, 8: 430.22, 9: 774.4, 10: 813.12, 11: 845.64, 12: 871.01},
    'Gen Centre': {1: 390, 2: 390, 3: 390, 4: 390, 5: 409.5, 6: 425.88, 7: 438.66, 8: 447.43, 9: 805.37, 10: 845.64, 11: 879.47, 12: 905.85},
    'LYS': {1: 410, 2: 410, 3: 410, 4: 410, 5: 430.5, 6: 447.72, 7: 461.15, 8: 470.37, 9: 846.67, 10: 889.01, 11: 924.57, 12: 952.31},
    'Lyon Centre': {1: 450, 2: 450, 3: 450, 4: 450, 5: 472.5, 6: 491.4, 7: 506.14, 8: 516.26, 9: 929.28, 10: 975.74, 11: 1014.77, 12: 1045.21},
    'GNB': {1: 410, 2: 410, 3: 410, 4: 410, 5: 430.5, 6: 447.72, 7: 461.15, 8: 470.37, 9: 846.67, 10: 889.01, 11: 924.57, 12: 952.31},
    'AIME': {1: 80, 2: 80, 3: 80, 4: 80, 5: 84, 6: 87.36, 7: 89.98, 8: 91.78, 9: 165.2, 10: 173.46, 11: 180.4, 12: 185.82},
    'BSM': {1: 120, 2: 120, 3: 120, 4: 120, 5: 126, 6: 131.04, 7: 134.97, 8: 137.67, 9: 247.81, 10: 260.2, 11: 270.61, 12: 278.72}
  };

  const getPriceForPax = (location: string, pax: number) => {
    if (pax > 12) return null; // For 12+ pax, we need to request a custom quote
    return pricingData[location]?.[pax] || null;
  };

  useEffect(() => {
    // Set minimum return date to selected date
    if (selectedDate) {
      setMinReturnDate(selectedDate);
      
      if (returnDate && returnDate < selectedDate) {
        setReturnDate(selectedDate);
        
        if (returnDate === selectedDate && returnTime < selectedTime) {
          setReturnTime(selectedTime);
        }
      }
    }
  }, [selectedDate, selectedTime]);

  useEffect(() => {
    const isValid = (
      pickupLocation !== '' &&
      destinationLocation !== '' &&
      selectedDate !== '' &&
      selectedTime !== '' &&
      adults > 0 &&
      (tripType === 'oneWay' || (
        returnDate !== '' && 
        returnTime !== '' &&
        (returnDate > selectedDate || 
         (returnDate === selectedDate && returnTime >= selectedTime))
      ))
    );
    setIsFormValid(isValid);
  }, [
    pickupLocation,
    destinationLocation,
    selectedDate,
    selectedTime,
    returnDate,
    returnTime,
    adults,
    tripType
  ]);

  useEffect(() => {
    // if (!selectedDate) {
    //   const today = new Date();
    //   const year = today.getFullYear();
    //   const month = String(today.getMonth() + 1).padStart(2, '0');
    //   const day = String(today.getDate()).padStart(2, '0');
    //   setSelectedDate(`${year}-${month}-${day}`);
    // }
  }, []);

  const calculatePrice = () => {
    if (!isFormValid) return;

    const totalPax = adults + children;
    let basePrice = getPriceForPax(pickupLocation, totalPax);
    const details: string[] = [];

    if (basePrice === null) {
      // For groups larger than 12, we need a custom quote
      setPrice(null);
      setPriceDetails([]);
      setShowQuoteDetails(false);
      return;
    }

    details.push(`Best price for ${totalPax} passengers from ${pickupLocations.find(l => l.value === pickupLocation)?.label}: €${basePrice.toFixed(2)}`);

    // Check if destination is Champagny en Vanoise
    if (destinationLocation === 'Champagny en Vanoise') {
      basePrice += 50;
      details.push(`Champagny supplement: +€50.00`);
    }

    // Calculate date supplements
    const departureDate = new Date(selectedDate);
    const dayOfWeek = departureDate.getDay(); // 0 = Sunday, 6 = Saturday

    // Apply weekend supplements
    if (dayOfWeek === 6) { // Saturday
      const supplement = basePrice * 0.2;
      basePrice *= 1.2;
      details.push(`Saturday supplement: +€${supplement.toFixed(2)} (20%)`);
    } else if (dayOfWeek === 0) { // Sunday
      const supplement = basePrice * 0.15;
      basePrice *= 1.15;
      details.push(`Sunday supplement: +€${supplement.toFixed(2)} (15%)`);
    }

    // For round trips, calculate return price as well
    let returnPrice = 0;
    if (tripType === 'roundTrip') {
      returnPrice = getPriceForPax(pickupLocation, totalPax) || 0;
      
      // Apply Champagny supplement for return if needed
      if (destinationLocation === 'Champagny en Vanoise') {
        returnPrice += 50;
      }
      
      const returnDateObj = new Date(returnDate);
      const returnDayOfWeek = returnDateObj.getDay();
      
      // Apply weekend supplements for return
      if (returnDayOfWeek === 6) { // Saturday
        const supplement = returnPrice * 0.2;
        returnPrice *= 1.2;
        // details.push(`Return Saturday supplement: +€${supplement.toFixed(2)} (20%)`);
      } else if (returnDayOfWeek === 0) { // Sunday
        const supplement = returnPrice * 0.15;
        returnPrice *= 1.15;
        details.push(`Return Sunday supplement: +€${supplement.toFixed(2)} (15%)`);
      }
      
      basePrice += returnPrice;
    }

    setPrice(basePrice);
    setPriceDetails(details);
    setShowQuoteDetails(false);
  };

  const handleGetQuote = () => {
    calculatePrice();
  };

  const handleBookNow = () => {
    router.push('/book-now');
  };

  const handleChangeDetails = () => {
    setShowQuoteDetails(true);
  };

  const handleDateTimeChange = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleReturnDateTimeChange = (date: string, time: string) => {
    setReturnDate(date);
    setReturnTime(time);
  };

  const handlePaxChange = (newAdults: number, newChildren: number) => {
    setAdults(newAdults);
    setChildren(newChildren);
  };

  const handleTripTypeChange = (type: 'oneWay' | 'roundTrip') => {
    setTripType(type);
  };

  const getLocationLabel = (value: string) => {
    const allLocations = [...pickupLocations, ...destinationLocations];
    return allLocations.find(loc => loc.value === value)?.label || value;
  };

  const getDayName = (dateString: string) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:min-w-md xs:w-full mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Quote – for an idea of price</h2>

      <div className="flex gap-3 mb-4">
            <button
              onClick={() => handleTripTypeChange('roundTrip')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                tripType === 'roundTrip' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              Round Trip
            </button>
            <button
              onClick={() => handleTripTypeChange('oneWay')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                tripType === 'oneWay' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              One Way
            </button>
          </div>
      {showQuoteDetails ? (
        <>
          
          <div className="mb-4">
            <LocationCustom
              id="pickup-location"
              label="Pickup Location"
              value={pickupLocation}
              options={pickupLocations}
              onChange={setPickupLocation}
            />
          </div>

          <div className="mb-4">
            <LocationCustom
              id="destination-location"
              label="Destination Location"
              value={destinationLocation}
              options={destinationLocations}
              onChange={setDestinationLocation}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 mb-4">
            <div className={tripType === 'roundTrip' ? 'md:col-span-1' : 'md:col-span-2'}>
              <DateTimeInput
                date={selectedDate}
                time={selectedTime}
                onChange={handleDateTimeChange}
                placeholder="Departure Date"
              />
            </div>
            {tripType === 'roundTrip' && (
              <div className="md:col-span-1">
                <DateTimeInput
                  date={returnDate}
                  time={returnTime}
                  onChange={handleReturnDateTimeChange}
                  placeholder="Return Date"
                  minDate={minReturnDate}
                  minTime={returnDate === selectedDate ? selectedTime : undefined}
                />
              </div>
            )}
          </div>

          <div className="mb-6">
            <PaxSelectorInput
              adults={adults}
              children={children}
              onChange={handlePaxChange}
            />
          </div>

          

          <button
            onClick={handleGetQuote}
            disabled={!isFormValid}
            className={`w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors ${
              !isFormValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            Get Quick Quote
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">QuickQuote</h2>
          
          <div className="mb-4">
            <p className="text-gray-700">
              {adults + children} people departing from {getLocationLabel(pickupLocation)} to {getLocationLabel(destinationLocation)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {getDayName(selectedDate)}, {selectedDate} at {selectedTime}
              {tripType === 'roundTrip' && (
                <>
                  <br />
                  Return: {getDayName(returnDate)}, {returnDate} at {returnTime}
                </>
              )}
            </p>
          </div>

          {price !== null ? (
            <>
              <div className="mb-4">
                <div className="text-xl font-bold text-blue-600">
                  Price starting from: €{price.toFixed(2)}
                </div>
                {tripType === 'roundTrip' && (
                  <div className="text-sm text-gray-600">
                    (€{(price / 2).toFixed(2)} each way)
                  </div>
                )}
              </div>

              {priceDetails.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold mb-2 text-primary">Price Breakdown:</h3>
                  <ul className="text-sm space-y-1 text-black">
                    {priceDetails.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-700">
                {adults + children > 12 ? 
                  'For groups larger than 12 passengers, please request a custom quote.' : 
                  'Sorry - we do not have standard pricing available for this route.'}
                <br />
                Please request a Personal Quote and we'll give you our best price!
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleBookNow}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              {price !== null ? 'Book Now' : 'Get a Personal Quote'}
            </button>
            <button
              onClick={handleChangeDetails}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Change Quote Details
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuoteSystem;