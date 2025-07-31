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
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [isFormValid, setIsFormValid] = useState(false);
  const [minReturnDate, setMinReturnDate] = useState('');

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
    if (!selectedDate) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      setSelectedDate(`${year}-${month}-${day}`);
    }
  }, []);

  const handleGetQuote = () => {
    if (!isFormValid) return;
    setShowQuoteDetails(false);
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

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:min-w-md xs:w-full mx-auto">
      {showQuoteDetails ? (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">QuickQuote</h2>
          
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
              {adults + children} people departing from {getLocationLabel(pickupLocation)} to {getLocationLabel(destinationLocation)}...
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {selectedDate} at {selectedTime}
              {tripType === 'roundTrip' && ` • Return: ${returnDate} at ${returnTime}`}
            </p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-yellow-700">
              Sorry - we do not have standard pricing available for this route. 
              Please request a Personal Quote and we'll give you our best price!
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleBookNow}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Get a Personal Quote
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