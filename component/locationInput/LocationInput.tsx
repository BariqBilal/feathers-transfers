'use client';
import React, { useState, useEffect } from 'react';
import LocationCustom from '../formcomponent/LocationCustom';
import DateTimeInput from '../formcomponent/DateTimeInput';
import PaxSelectorInput from '../formcomponent/PaxSelectorInput';
import { useRouter } from 'next/navigation';

export default function LocationInput() {
  const router = useRouter();
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip'>('roundTrip');
  const [pickupLocation, setPickupLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('09:00');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [minReturnDate, setMinReturnDate] = useState('');

  const pickupLocations = [
    { value: 'CMF', label: 'Chambery (CMF)' },
    { value: 'GVA', label: 'Geneva Airport (GVA)' },
    { value: 'Hotel GVA', label: 'Geneva Hotel' },
    { value: 'Gen Centre', label: 'Geneva City Centre' },
    { value: 'LYS', label: 'Lyon (LYS)' },
    { value: 'Lyon Centre', label: 'Lyon City Centre' },
    { value: 'GNB', label: 'Grenoble (GNB)' },
    { value: 'AIME', label: 'Aime Train Station (GARE AIME)' },
    { value: 'BSM', label: 'Bourg Saint Maurice Train Station (GARE BSM)' },
  ];

  const destinationLocations = [
    { value: 'La Plagne 1800', label: 'La Plagne 1800' },
    { value: 'La Plagne Centre', label: 'La Plagne Centre' },
    { value: 'Belle Plagne', label: 'Belle Plagne' },
    { value: 'La Plagne Bellecote', label: 'La Plagne Bellecote' },
    { value: 'La Plagne Aime 2000', label: 'La Plagne - Aime 2000' },
    { value: 'La Plagne Villages', label: 'La Plagne Villages' },
    { value: 'La Plagne Soleil', label: 'La Plagne Soleil' },
    { value: 'La Plagne La Roche', label: 'La Plagne La Roche' },
    { value: 'La Plagne Crete Cote', label: 'La Plagne Crete Cote' },
    { value: 'La Plagne Montablert', label: 'La Plagne Montablert' },
    { value: 'Montchavin', label: 'Montchavin' },
    { value: 'Les Coches', label: 'Les Coches' },
    { value: 'Champagny en Vanoise', label: 'Champagny en Vanoise' },
    { value: 'Other', label: 'Other: Please specify' },
  ];

  const basePrices: Record<string, Record<number, number>> = {
    'CMF': { 1: 317, 2: 317, 3: 317, 4: 317, 5: 317*1.05, 6: 317*1.04, 7: 317*1.03, 8: 317*1.02, 9: 317*1.8, 10: 317*1.05, 11: 317*1.04, 12: 317*1.03 },
    'GVA': { 1: 360, 2: 360, 3: 360, 4: 360, 5: 360*1.05, 6: 360*1.04, 7: 360*1.03, 8: 360*1.02, 9: 360*1.8, 10: 360*1.05, 11: 360*1.04, 12: 360*1.03 },
    'Hotel GVA': { 1: 375, 2: 375, 3: 375, 4: 375, 5: 375*1.05, 6: 375*1.04, 7: 375*1.03, 8: 375*1.02, 9: 375*1.8, 10: 375*1.05, 11: 375*1.04, 12: 375*1.03 },
    'Gen Centre': { 1: 390, 2: 390, 3: 390, 4: 390, 5: 390*1.05, 6: 390*1.04, 7: 390*1.03, 8: 390*1.02, 9: 390*1.8, 10: 390*1.05, 11: 390*1.04, 12: 390*1.03 },
    'LYS': { 1: 410, 2: 410, 3: 410, 4: 410, 5: 410*1.05, 6: 410*1.04, 7: 410*1.03, 8: 410*1.02, 9: 410*1.8, 10: 410*1.05, 11: 410*1.04, 12: 410*1.03 },
    'Lyon Centre': { 1: 450, 2: 450, 3: 450, 4: 450, 5: 450*1.05, 6: 450*1.04, 7: 450*1.03, 8: 450*1.02, 9: 450*1.8, 10: 450*1.05, 11: 450*1.04, 12: 450*1.03 },
    'GNB': { 1: 410, 2: 410, 3: 410, 4: 410, 5: 410*1.05, 6: 410*1.04, 7: 410*1.03, 8: 410*1.02, 9: 410*1.8, 10: 410*1.05, 11: 410*1.04, 12: 410*1.03 },
    'AIME': { 1: 80, 2: 80, 3: 80, 4: 80, 5: 80*1.05, 6: 80*1.04, 7: 80*1.03, 8: 80*1.02, 9: 80*1.8, 10: 80*1.05, 11: 80*1.04, 12: 80*1.03 },
    'BSM': { 1: 120, 2: 120, 3: 120, 4: 120, 5: 120*1.05, 6: 120*1.04, 7: 120*1.03, 8: 120*1.02, 9: 120*1.8, 10: 120*1.05, 11: 120*1.04, 12: 120*1.03 },
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Set minimum return date to selected date
    if (selectedDate) {
      setMinReturnDate(selectedDate);
      
      // If return date is before selected date, reset it
      if (returnDate && returnDate < selectedDate) {
        setReturnDate(selectedDate);
        
        // If return date is same as selected date but time is before, reset time
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
    if (!pickupLocation && pickupLocations.length > 0) {
      setPickupLocation(pickupLocations[1].value); 
    }
    if (!destinationLocation && destinationLocations.length > 0) {
      setDestinationLocation(destinationLocations[4].value); 
    }
    if (!selectedDate) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      setSelectedDate(`${year}-${month}-${day}`);
    }
  }, [pickupLocation, destinationLocation, selectedDate]);

  const handleDateTimeChange = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleReturnDateTimeChange = (date: string, time: string) => {
    setReturnDate(date);
    setReturnTime(time);
  };

  const handlePaxChange = (adults: number, children: number) => {
    setAdults(adults);
    setChildren(children);
  };

  const handleTripTypeChange = (type: 'oneWay' | 'roundTrip') => {
    setTripType(type);
  };

  const calculatePrice = () => {
    const totalPax = adults + children;
    let basePrice = 0;
    
    if (pickupLocation && totalPax > 0) {
      const priceMap = basePrices[pickupLocation];
      if (priceMap) {
        basePrice = totalPax <= 12 ? priceMap[totalPax] : priceMap[12];
      }
    }

    if (destinationLocation === 'Champagny en Vanoise') {
      basePrice += 50;
    }

    let supplements = 0;
    let supplementDetails: string[] = [];
    
    if (selectedDate) {
      const date = new Date(selectedDate);
      const dayOfWeek = date.getDay();
      
      if (dayOfWeek === 6) {
        supplements += basePrice * 0.2;
        supplementDetails.push('Saturday +20%');
      } else if (dayOfWeek === 0) {
        supplements += basePrice * 0.15;
        supplementDetails.push('Sunday +15%');
      }
      
      const peakPeriods = [
        { start: new Date('2025-12-19'), end: new Date('2026-01-06'), supplement: 0.3, name: 'Christmas/New Year +30%' },
        { start: new Date('2026-02-07'), end: new Date('2026-02-07'), supplement: 0.3, name: 'February Peak +30%' },
        { start: new Date('2026-02-12'), end: new Date('2026-02-23'), supplement: 0.2, name: 'February Holidays +20%' },
        { start: new Date('2026-02-28'), end: new Date('2026-02-28'), supplement: 0.1, name: 'February Weekend +10%' },
        { start: new Date('2026-03-27'), end: new Date('2026-04-12'), supplement: 0.3, name: 'Easter +30%' },
      ];
      
      for (const period of peakPeriods) {
        if (date >= period.start && date <= period.end) {
          supplements += basePrice * period.supplement;
          supplementDetails.push(period.name);
          break;
        }
      }
    }
    
    if (selectedTime) {
      const [hours] = selectedTime.split(':').map(Number);
      
      if (hours <= 11) {
        supplements += basePrice * 0.1;
        supplementDetails.push('Early departure (≤11:00) +10%');
      } else if (hours >= 19) {
        supplements += basePrice * 0.1;
        supplementDetails.push('Late departure (≥19:00) +10%');
      }
      
      if (hours >= 17) {
        supplements += basePrice * 0.15;
        supplementDetails.push('Late arrival (≥17:00) +15%');
      }
    }
    
    const totalPrice = basePrice + supplements;
    
    return {
      basePrice: parseFloat(basePrice.toFixed(2)),
      supplements: parseFloat(supplements.toFixed(2)),
      totalPrice: parseFloat(totalPrice.toFixed(2)),
      supplementDetails,
    };
  };

  const handleSubmit = () => {
    if (!isFormValid) return;
    
    const priceDetails = calculatePrice();
    
    let query: Record<string, string> = {
      tripType,
      pickupLocation,
      destinationLocation,
      selectedDate,
      selectedTime,
      adults: adults.toString(),
      children: children.toString(),
      basePrice: priceDetails.basePrice.toString(),
      supplements: priceDetails.supplements.toString(),
      totalPrice: priceDetails.totalPrice.toString(),
      supplementDetails: JSON.stringify(priceDetails.supplementDetails),
    };

    if (tripType === 'roundTrip') {
      query.returnDate = returnDate;
      query.returnTime = returnTime;
      
      const returnPriceDetails = calculatePrice();
      query.returnBasePrice = returnPriceDetails.basePrice.toString();
      query.returnSupplements = returnPriceDetails.supplements.toString();
      query.returnTotalPrice = returnPriceDetails.totalPrice.toString();
      query.returnSupplementDetails = JSON.stringify(returnPriceDetails.supplementDetails);
    }

    const params = new URLSearchParams(query).toString();
    router.push(`/journey?${params}`);
  };

  return (
    <div className="relative flex items-center justify-center">
      <div className="bg-white p-4 rounded-xl md:shadow-lg md:w-auto w-full md:min-w-4xl pt-12">
        <div className="flex absolute -top-6 bg-textprimary rounded-full p-1 mb-6 w-fit overflow-hidden">
          <button
            onClick={() => handleTripTypeChange('roundTrip')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              tripType === 'roundTrip' ? 'bg-white text-textprimary shadow' : 'text-white'
            }`}
          >
            Round trip
          </button>
          <button
            onClick={() => handleTripTypeChange('oneWay')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              tripType === 'oneWay' ? 'bg-white text-textprimary shadow' : 'text-white'
            }`}
          >
            One way
          </button>
        </div>

        <div className="flex md:flex-row flex-col gap-3 justify-between">
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 md:hidden">Pickup Location</label>
            <LocationCustom
              id="pickup-location"
              label="Pickup Location"
              value={pickupLocation}
              options={pickupLocations}
              onChange={setPickupLocation}
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 md:hidden">Destination Location</label>
            <LocationCustom
              id="destination-location"
              label="Destination Location"
              value={destinationLocation}
              options={destinationLocations}
              onChange={setDestinationLocation}
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 md:hidden">Date & Time</label>
            <DateTimeInput
              date={selectedDate}
              time={selectedTime}
              onChange={handleDateTimeChange}
              placeholder="Select Date & time"
            />
          </div>

          {tripType === 'roundTrip' && (
            <div className="col-span-1">
              <label className="block text-sm font-medium md:hidden mb-1">Return Date & Time</label>
              <DateTimeInput
                date={returnDate}
                time={returnTime}
                onChange={handleReturnDateTimeChange}
                placeholder="Select Return Date & Time"
                minDate={minReturnDate}
                minTime={returnDate === selectedDate ? selectedTime : undefined}
              />
            </div>
          )}

          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 md:hidden">Passengers</label>
            <PaxSelectorInput
              adults={adults}
              children={children}
              onChange={handlePaxChange}
            />
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-blue-700 transition-colors duration-200 w-full h-full ${
                isMobile ? 'text-sm py-2' : ''
              } ${
                !isFormValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {isMobile ? 'Book Now' : 'Book Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}