'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LocationCustom from '../formcomponent/LocationCustom';
import DateTimeInput from '../formcomponent/DateTimeInput';
import PaxSelectorInput from '../formcomponent/PaxSelectorInput';

type LocationOption = {
  value: string;
  label: string;
  type: 'airport' | 'hotel' | 'city' | 'station' | 'resort' | 'other';
  country?: 'FR' | 'CH';
  code?: string;
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
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [minReturnDate, setMinReturnDate] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [priceDetails, setPriceDetails] = useState<string[]>([]);
  const [isSwapping, setIsSwapping] = useState(false);

  // Keep original location arrays separate from current state
  const originalPickupLocations: LocationOption[] = [
    { value: 'CMF', label: 'Chambery (CMF)', type: 'airport', country: 'FR', code: 'CMF' },
    { value: 'GVA', label: 'Geneva Airport (GVA)', type: 'airport', country: 'CH', code: 'GVA' },
    { value: 'Hotel GVA', label: 'Geneva Hotel', type: 'hotel', country: 'CH' },
    { value: 'Gen Centre', label: 'Geneva City Centre', type: 'city', country: 'CH' },
    { value: 'LYS', label: 'Lyon (LYS)', type: 'airport', country: 'FR', code: 'LYS' },
    { value: 'Lyon Centre', label: 'Lyon City Centre', type: 'city', country: 'FR' },
    { value: 'GNB', label: 'Grenoble (GNB)', type: 'airport', country: 'FR', code: 'GNB' },
    { value: 'AIME', label: 'Aime Train Station', type: 'station', country: 'FR', code: 'GARE AIME' },
    { value: 'BSM', label: 'Bourg Saint Maurice Train Station', type: 'station', country: 'FR', code: 'GARE BSM' },
  ];

  const originalDestinationLocations: LocationOption[] = [
    { value: 'La Plagne 1800', label: 'La Plagne 1800', type: 'resort', country: 'FR' },
    { value: 'La Plagne Centre', label: 'La Plagne Centre', type: 'resort', country: 'FR' },
    { value: 'Belle Plagne', label: 'Belle Plagne', type: 'resort', country: 'FR' },
    { value: 'La Plagne Bellecote', label: 'La Plagne Bellecote', type: 'resort', country: 'FR' },
    { value: 'La Plagne Aime 2000', label: 'La Plagne - Aime 2000', type: 'resort', country: 'FR' },
    { value: 'La Plagne Villages', label: 'La Plagne Villages', type: 'resort', country: 'FR' },
    { value: 'La Plagne Soleil', label: 'La Plagne Soleil', type: 'resort', country: 'FR' },
    { value: 'La Plagne La Roche', label: 'La Plagne La Roche', type: 'resort', country: 'FR' },
    { value: 'La Plagne Crete Cote', label: 'La Plagne Crete Cote', type: 'resort', country: 'FR' },
    { value: 'La Plagne Montablert', label: 'La Plagne Montablert', type: 'resort', country: 'FR' },
    { value: 'Montchavin', label: 'Montchavin', type: 'resort', country: 'FR' },
    { value: 'Les Coches', label: 'Les Coches', type: 'resort', country: 'FR' },
    { value: 'Champagny en Vanoise', label: 'Champagny en Vanoise', type: 'resort', country: 'FR' },
    { value: 'Other', label: 'Other: Please specify', type: 'other' },
  ];

  const [pickupLocations, setPickupLocations] = useState<LocationOption[]>(originalPickupLocations);
  const [destinationLocations, setDestinationLocations] = useState<LocationOption[]>(originalDestinationLocations);

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

  // Map of valid pickup locations for pricing
  const validPickupLocations = new Set(Object.keys(pricingData));

  const handleSwapLocations = async () => {
    setIsSwapping(true);
    
    // Add a small delay for the animation
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Swap the values
    const tempLocation = pickupLocation;
    setPickupLocation(destinationLocation);
    setDestinationLocation(tempLocation);
    
    // Swap the options
    const tempLocations = [...pickupLocations];
    setPickupLocations([...destinationLocations]);
    setDestinationLocations(tempLocations);
    
    setIsSwapping(false);
  };

  // Helper function to find the airport/station location from both pickup and destination
  const findAirportOrStationLocation = (fromLocation: string, toLocation: string): string | null => {
    const allOriginalPickupValues = originalPickupLocations.map(loc => loc.value);
    
    // Check if fromLocation is an original pickup location (airport/station)
    if (allOriginalPickupValues.includes(fromLocation)) {
      return fromLocation;
    }
    
    // Check if toLocation is an original pickup location (airport/station)
    if (allOriginalPickupValues.includes(toLocation)) {
      return toLocation;
    }
    
    return null;
  };

  // Helper function to find the resort location from both pickup and destination
  const findResortLocation = (fromLocation: string, toLocation: string): string | null => {
    const allOriginalDestinationValues = originalDestinationLocations.map(loc => loc.value);
    
    // Check if fromLocation is an original destination location (resort)
    if (allOriginalDestinationValues.includes(fromLocation)) {
      return fromLocation;
    }
    
    // Check if toLocation is an original destination location (resort)
    if (allOriginalDestinationValues.includes(toLocation)) {
      return toLocation;
    }
    
    return null;
  };

  const calculatePrice = (date: string, time: string, fromLocation: string, toLocation: string) => {
    const totalPax = adults + children;
    let basePrice = 0;
    const supplementDetails: string[] = [];
    
    // Find the airport/station location regardless of direction
    const airportLocation = findAirportOrStationLocation(fromLocation, toLocation);
    const resortLocation = findResortLocation(fromLocation, toLocation);
    
    // Get the correct pricing key based on the airport/station location
    let pricingKey = airportLocation;
    
    if (pricingKey) {
      if (validPickupLocations.has(pricingKey)) {
        const pax = totalPax > 12 ? 12 : totalPax;
        basePrice = pricingData[pricingKey][pax];
        supplementDetails.push(`Base price for ${pax} passengers: €${basePrice.toFixed(2)}`);
      } else {
        // Fallback for unmapped locations
        basePrice = 300;
        supplementDetails.push(`Default base price: €${basePrice.toFixed(2)}`);
      }
    } else {
      // If no airport/station location found, use default
      basePrice = 300;
      supplementDetails.push(`Default base price: €${basePrice.toFixed(2)}`);
    }

    // Apply destination supplements based on the resort location
    if (resortLocation === 'Champagny en Vanoise') {
      basePrice += 50;
      supplementDetails.push(`Champagny supplement: +€50.00`);
    }

    let supplements = 0;

    // Apply time-based supplements
    if (date) {
      const departureDate = new Date(date);
      const dayOfWeek = departureDate.getDay();

      if (dayOfWeek === 6) {
        const supplement = basePrice * 0.2;
        supplements += supplement;
        supplementDetails.push(`Saturday supplement: +€${supplement.toFixed(2)} (20%)`);
      } else if (dayOfWeek === 0) {
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

  // Auto-calculate price when form values change
  useEffect(() => {
    if (isFormValid && !showQuoteDetails) {
      const departurePrice = calculatePrice(selectedDate, selectedTime, pickupLocation, destinationLocation);
      let returnPrice = tripType === 'roundTrip' ? calculatePrice(returnDate, returnTime, destinationLocation, pickupLocation) : null;
      
      let totalPrice = departurePrice.totalPrice;
      let allDetails = [...departurePrice.supplementDetails];
      
      if (tripType === 'roundTrip' && returnPrice) {
        totalPrice += returnPrice.totalPrice;
        allDetails.push('---Return Journey---');
        allDetails.push(...returnPrice.supplementDetails);
      }
      
      setPrice(totalPrice);
      setPriceDetails(allDetails);
    }
  }, [
    pickupLocation,
    destinationLocation,
    selectedDate,
    selectedTime,
    returnDate,
    returnTime,
    adults,
    children,
    tripType,
    isFormValid,
    showQuoteDetails
  ]);

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

  const handleGetQuote = () => {
    if (!isFormValid) return;
    
    const totalPax = adults + children;
    
    // Check if group is larger than 12
    if (totalPax > 12) {
      setPrice(null);
      setPriceDetails([]);
      setShowQuoteDetails(false);
      return;
    }

    const departurePrice = calculatePrice(selectedDate, selectedTime, pickupLocation, destinationLocation);
    let returnPrice = tripType === 'roundTrip' ? calculatePrice(returnDate, returnTime, destinationLocation, pickupLocation) : null;
    
    let totalPrice = departurePrice.totalPrice;
    let allDetails = [...departurePrice.supplementDetails];
    
    if (tripType === 'roundTrip' && returnPrice) {
      totalPrice += returnPrice.totalPrice;
      allDetails.push('---Return Journey---');
      allDetails.push(...returnPrice.supplementDetails);
    }
    
    setPrice(totalPrice);
    setPriceDetails(allDetails);
    setShowQuoteDetails(false);
  };

  const handleBookNow = () => {
    if (!isFormValid) return;
    
    const departurePrice = calculatePrice(selectedDate, selectedTime, pickupLocation, destinationLocation);
    let returnPrice = tripType === 'roundTrip' ? calculatePrice(returnDate, returnTime, destinationLocation, pickupLocation) : null;

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
    const allLocations = [...originalPickupLocations, ...originalDestinationLocations];
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
          {/* Locations with Swap Button */}
          <div className="flex flex-col md:flex-row gap-3 items-center mb-4">
            <div className={`flex-1 transition-opacity duration-200 ${isSwapping ? 'opacity-50' : 'opacity-100'}`}>
              <LocationCustom
                id="pickup-location"
                label="Pickup Location"
                value={pickupLocation}
                options={pickupLocations}
                onChange={setPickupLocation}
              />
            </div>

            <div className="flex items-center justify-center">
              <button 
                onClick={handleSwapLocations}
                disabled={isSwapping}
                className={`bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-all duration-200 ${
                  isSwapping ? 'animate-spin' : ''
                }`}
                aria-label="Swap locations"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>
            </div>

            <div className={`flex-1 transition-opacity duration-200 ${isSwapping ? 'opacity-50' : 'opacity-100'}`}>
              <LocationCustom
                id="destination-location"
                label="Destination Location"
                value={destinationLocation}
                options={destinationLocations}
                onChange={setDestinationLocation}
              />
            </div>
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
                    Total for round trip
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
                For groups in excess of 12 passengers, please request a custom quote by clicking <a target="_blank" href="mailto:info@featherstransfers.com" className="text-blue-600">info@featherstransfers.com</a>
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