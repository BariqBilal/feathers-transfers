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
    // Other location pricing data...
  };

  const getPriceForPax = (location: string, pax: number) => {
    if (pax > 12) return null; // For 12+ pax, we need to request a custom quote
    return pricingData[location]?.[pax] || null;
  };

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

  const calculatePrice = () => {
    if (!isFormValid) return;

    const totalPax = adults + children;
    let basePrice = getPriceForPax(pickupLocation, totalPax);
    const details: string[] = [];

    if (basePrice === null) {
      // For groups larger than 12, display a custom quote message
      setPrice(null);
      setPriceDetails([]);
      setShowQuoteDetails(false);
      return;
    }

    details.push(`Best price for ${totalPax} passengers from ${pickupLocations.find(l => l.value === pickupLocation)?.label}: €${basePrice.toFixed(2)}`);

    // Check for other adjustments (weekends, destination supplements, etc.)
    // Your other calculations (e.g., weekend supplements, return trip)...

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
                For groups in excess of 12 passengers, please request a custom quote by clicking <a href="mailto:info@featherstransfers.com" className="text-blue-600">info@featherstransfers.com</a>
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
