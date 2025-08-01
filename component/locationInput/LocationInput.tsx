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
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
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

  // Exact pricing data from the spreadsheet (1-12 passengers)
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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    // if (!pickupLocation && pickupLocations.length > 0) {
    //   setPickupLocation(pickupLocations[1].value); 
    // }
    // if (!destinationLocation && destinationLocations.length > 0) {
    //   setDestinationLocation(destinationLocations[4].value); 
    // }
    // if (!selectedDate) {
    //   const today = new Date();
    //   const year = today.getFullYear();
    //   const month = String(today.getMonth() + 1).padStart(2, '0');
    //   const day = String(today.getDate()).padStart(2, '0');
    //   setSelectedDate(`${year}-${month}-${day}`);
    // }
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

  const calculatePrice = (date: string, time: string) => {
    const totalPax = adults + children;
    let basePrice = 0;
    const supplementDetails: string[] = [];
    
    if (pickupLocation in pricingData) {
      const pax = totalPax > 12 ? 12 : totalPax; // For 12+ pax, use 12 pax price
      basePrice = pricingData[pickupLocation][pax];
      supplementDetails.push(`Base price for ${pax} passengers: €${basePrice.toFixed(2)}`);
    }

    if (destinationLocation === 'Champagny en Vanoise') {
      basePrice += 50;
      supplementDetails.push(`Champagny supplement: +€50.00`);
    }

    let supplements = 0;

    // Apply weekend supplements only (removed all other supplements)
    if (date) {
      const departureDate = new Date(date);
      const dayOfWeek = departureDate.getDay(); // 0 = Sunday, 6 = Saturday

      if (dayOfWeek === 6) { // Saturday
        const supplement = basePrice * 0.2;
        supplements += supplement;
        supplementDetails.push(`Saturday supplement: +€${supplement.toFixed(2)} (20%)`);
      } else if (dayOfWeek === 0) { // Sunday
        const supplement = basePrice * 0.15;
        supplements += supplement;
        supplementDetails.push(`Sunday supplement: +€${supplement.toFixed(2)} (15%)`);
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
    
    const departurePrice = calculatePrice(selectedDate, selectedTime);
    let returnPrice = tripType === 'roundTrip' ? calculatePrice(returnDate, returnTime) : null;

    let query: Record<string, string> = {
      tripType,
      pickupLocation,
      destinationLocation,
      selectedDate,
      selectedTime,
      adults: adults.toString(),
      children: children.toString(),
      basePrice: departurePrice.basePrice.toString(),
      supplements: departurePrice.supplements.toString(),
      totalPrice: departurePrice.totalPrice.toString(),
      supplementDetails: JSON.stringify(departurePrice.supplementDetails),
    };

    if (tripType === 'roundTrip' && returnPrice) {
      query.returnDate = returnDate;
      query.returnTime = returnTime;
      query.returnBasePrice = returnPrice.basePrice.toString();
      query.returnSupplements = returnPrice.supplements.toString();
      query.returnTotalPrice = returnPrice.totalPrice.toString();
      query.returnSupplementDetails = JSON.stringify(returnPrice.supplementDetails);
      query.grandTotal = (departurePrice.totalPrice + returnPrice.totalPrice).toString();
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