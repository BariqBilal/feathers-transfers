'use client';
import React, { useState, useEffect } from 'react';
import LocationCustom from '../formcomponent/LocationCustom';
import DateTimeInput from '../formcomponent/DateTimeInput';
import PaxSelectorInput from '../formcomponent/PaxSelectorInput';
import { useRouter } from 'next/navigation';

export default function LocationInput() {
  const router = useRouter()
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip'>('oneWay');
  const [pickupLocation, setPickupLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('09:00');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Static list of pickup locations
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

  // Static list of destination locations
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

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
const handleSubmit = () => {
  let query: Record<string, string> = {};

  if (tripType === 'oneWay') {
    query = {
      tripType,
      pickupLocation,
      destinationLocation,
      selectedDate,
      selectedTime,
      adults: adults.toString(),
      children: children.toString(),
    };
  } else if (tripType === 'roundTrip') {
    query = {
      tripType,
      pickupLocation,
      destinationLocation,
      selectedDate,
      selectedTime,
      returnDate,
      returnTime,
      adults: adults.toString(),
      children: children.toString(),
    };
  }

  const params = new URLSearchParams(query).toString();
  router.push(`/journey?${params}`);
};



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
      // setReturnDate(`${year}-${month}-${day}`);
    }
  }, [pickupLocation, destinationLocation, selectedDate]);

  return (
    <div className="relative flex items-center justify-center">
      <div className="bg-white p-4 rounded-xl shadow-lg md:w-auto w-full md:min-w-4xl pt-12">
        {/* Trip Type Tabs */}
        <div className="flex absolute -top-6 bg-textprimary rounded-full p-1 mb-6 w-fit overflow-hidden">
          <button
            onClick={() => handleTripTypeChange('oneWay')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              tripType === 'oneWay' ? 'bg-white text-textprimary shadow' : 'text-white'
            }`}
          >
            One way
          </button>
          <button
            onClick={() => handleTripTypeChange('roundTrip')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              tripType === 'roundTrip' ? 'bg-white text-textprimary shadow' : 'text-white'
            }`}
          >
            Round trip
          </button>
        </div>

        {/* Form Inputs Grid */}
        <div className="flex md:flex-row flex-col gap-3 justify-between">
          {/* Pickup Location Dropdown */}
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

          {/* Destination Location Dropdown */}
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

          {/* Date and Time Picker */}
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 md:hidden">Date & Time</label>
            <DateTimeInput
              date={selectedDate}
              time={selectedTime}
              onChange={handleDateTimeChange}
              placeholder="Select Date & time"
            />
          </div>

          {/* Return Date & Time Picker for Round Trip (shown for all screens when round trip is selected) */}
          {tripType === 'roundTrip' && (
            <div className="col-span-1">
              <label className="block text-sm font-medium md:hidden mb-1">Return Date & Time</label>
              <DateTimeInput
                date={returnDate}
                time={returnTime}
                onChange={handleReturnDateTimeChange}
                placeholder="Select Return Date & Time"
              />
            </div>
          )}

          {/* Pax Selector (Adults and Children) */}
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 md:hidden">Passengers</label>
            <PaxSelectorInput
              adults={adults}
              children={children}
              onChange={handlePaxChange}
            />
          </div>

          {/* Book Now Button */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <button
              onClick={handleSubmit}
              className={`bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-blue-700 transition-colors duration-200 w-full h-full ${
                isMobile ? 'text-sm py-2' : ''
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