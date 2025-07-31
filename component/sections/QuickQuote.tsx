'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LocationCustom from '../formcomponent/LocationCustom';
import DateTimeInput from '../formcomponent/DateTimeInput';
import PaxSelectorInput from '../formcomponent/PaxSelectorInput';

type PricingData = {
  [key: string]: {
    [pax: number]: number;
  };
};

type PeakPeriod = {
  name: string;
  start: string;
  end: string;
  supplement: number;
};

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
  const [price, setPrice] = useState<number | null>(null);

  const pricingData: PricingData = {
    'CMF': { 1: 317, 2: 317, 3: 317, 4: 317, 5: 317 * 1.05, 6: 317 * 1.04, 7: 317 * 1.03, 8: 317 * 1.02, 9: 317 * 1.8, 10: 317 * 1.05, 11: 317 * 1.04, 12: 317 * 1.03 },
    'GVA': { 1: 360, 2: 360, 3: 360, 4: 360, 5: 360 * 1.05, 6: 360 * 1.04, 7: 360 * 1.03, 8: 360 * 1.02, 9: 360 * 1.8, 10: 360 * 1.05, 11: 360 * 1.04, 12: 360 * 1.03 },
    'Hotel GVA': { 1: 375, 2: 375, 3: 375, 4: 375, 5: 375 * 1.05, 6: 375 * 1.04, 7: 375 * 1.03, 8: 375 * 1.02, 9: 375 * 1.8, 10: 375 * 1.05, 11: 375 * 1.04, 12: 375 * 1.03 },
    'Gen Centre': { 1: 390, 2: 390, 3: 390, 4: 390, 5: 390 * 1.05, 6: 390 * 1.04, 7: 390 * 1.03, 8: 390 * 1.02, 9: 390 * 1.8, 10: 390 * 1.05, 11: 390 * 1.04, 12: 390 * 1.03 },
    'LYS': { 1: 410, 2: 410, 3: 410, 4: 410, 5: 410 * 1.05, 6: 410 * 1.04, 7: 410 * 1.03, 8: 410 * 1.02, 9: 410 * 1.8, 10: 410 * 1.05, 11: 410 * 1.04, 12: 410 * 1.03 },
    'Lyon Centre': { 1: 450, 2: 450, 3: 450, 4: 450, 5: 450 * 1.05, 6: 450 * 1.04, 7: 450 * 1.03, 8: 450 * 1.02, 9: 450 * 1.8, 10: 450 * 1.05, 11: 450 * 1.04, 12: 450 * 1.03 },
    'GNB': { 1: 410, 2: 410, 3: 410, 4: 410, 5: 410 * 1.05, 6: 410 * 1.04, 7: 410 * 1.03, 8: 410 * 1.02, 9: 410 * 1.8, 10: 410 * 1.05, 11: 410 * 1.04, 12: 410 * 1.03 },
    'AIME': { 1: 80, 2: 80, 3: 80, 4: 80, 5: 80 * 1.05, 6: 80 * 1.04, 7: 80 * 1.03, 8: 80 * 1.02, 9: 80 * 1.8, 10: 80 * 1.05, 11: 80 * 1.04, 12: 80 * 1.03 },
    'BSM': { 1: 120, 2: 120, 3: 120, 4: 120, 5: 120 * 1.05, 6: 120 * 1.04, 7: 120 * 1.03, 8: 120 * 1.02, 9: 120 * 1.8, 10: 120 * 1.05, 11: 120 * 1.04, 12: 120 * 1.03 },
  };

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

  const peakPeriods: PeakPeriod[] = [
    { name: 'Christmas & New Year', start: '2025-12-19', end: '2026-01-06', supplement: 0.3 },
    { name: 'February Holidays', start: '2026-02-12', end: '2026-02-23', supplement: 0.1 },
    { name: 'Easter', start: '2026-03-27', end: '2026-04-12', supplement: 0.1 }
  ];

  useEffect(() => {
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

  const calculatePrice = () => {
    if (!isFormValid) return;

    const totalPax = adults + children;
    let priceKey = pickupLocation;

    if (!pricingData[priceKey]) {
      setPrice(null);
      setShowQuoteDetails(false);
      return;
    }

    let basePriceValue: number;
    if (totalPax <= 12) {
      basePriceValue = pricingData[priceKey][totalPax];
    } else {
      basePriceValue = pricingData[priceKey][12];
    }

    let champagnySupplement = 0;
    if (destinationLocation === 'Champagny en Vanoise') {
      champagnySupplement = 50;
    }

    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay();
    const timeParts = selectedTime.split(':');
    const hours = parseInt(timeParts[0], 10);

    let totalPrice = basePriceValue + champagnySupplement;

    // Weekend supplements
    if (dayOfWeek === 6) { // Saturday
      totalPrice += basePriceValue * 0.2;
    } else if (dayOfWeek === 0) { // Sunday
      totalPrice += basePriceValue * 0.15;
    }

    // Peak period supplements
    const currentPeakPeriod = peakPeriods.find(period => {
      const startDate = new Date(period.start);
      const endDate = new Date(period.end);
      return date >= startDate && date <= endDate;
    });

    if (currentPeakPeriod) {
      if (currentPeakPeriod.name === 'Christmas & New Year') {
        totalPrice += basePriceValue * currentPeakPeriod.supplement;
      } else if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        totalPrice += basePriceValue * currentPeakPeriod.supplement;
      }
    }

    // Time-based supplements
    if (hours <= 11) {
      totalPrice += basePriceValue * 0.1;
    } else if (hours >= 19) {
      totalPrice += basePriceValue * 0.1;
    } else if (hours >= 17) {
      totalPrice += basePriceValue * 0.15;
    }

    if (tripType === 'roundTrip') {
      totalPrice = (basePriceValue * 2) + champagnySupplement * 2;
      
      // Reapply all supplements for round trip
      if (dayOfWeek === 6) totalPrice += (basePriceValue * 2) * 0.2;
      if (dayOfWeek === 0) totalPrice += (basePriceValue * 2) * 0.15;
      
      if (currentPeakPeriod) {
        if (currentPeakPeriod.name === 'Christmas & New Year') {
          totalPrice += (basePriceValue * 2) * currentPeakPeriod.supplement;
        } else if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          totalPrice += (basePriceValue * 2) * currentPeakPeriod.supplement;
        }
      }
      
      if (hours <= 11) totalPrice += (basePriceValue * 2) * 0.1;
      if (hours >= 19) totalPrice += (basePriceValue * 2) * 0.1;
      if (hours >= 17) totalPrice += (basePriceValue * 2) * 0.15;
    }

    totalPrice = Math.round(totalPrice * 100) / 100;
    setPrice(totalPrice);
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
              {adults + children} people {tripType === 'oneWay' ? 'traveling' : 'round trip'} from {getLocationLabel(pickupLocation)} to {getLocationLabel(destinationLocation)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Departure: {selectedDate} at {selectedTime}
              {tripType === 'roundTrip' && ` • Return: ${returnDate} at ${returnTime}`}
            </p>
          </div>

          {price !== null ? (
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-primary text-lg">Total Price:</span>
                <span className="font-bold text-lg text-blue-600">€{price.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-700">
                Sorry - we do not have standard pricing available for this route. 
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