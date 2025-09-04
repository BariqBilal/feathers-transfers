'use client';
import React, { useState, useEffect } from 'react';
import LocationCustom from '../formcomponent/LocationCustom';
import DateTimeInput from '../formcomponent/DateTimeInput';
import PaxSelectorInput from '../formcomponent/PaxSelectorInput';
import { useRouter, useSearchParams } from 'next/navigation';

type LocationOption = {
  value: string;
  label: string;
  type: 'airport' | 'hotel' | 'city' | 'station' | 'resort' | 'other';
  country?: 'FR' | 'CH';
  code?: string;
  disabled?: boolean;
};

export default function LocationInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL parameters if available
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip'>(
    searchParams.get('tripType') as 'oneWay' | 'roundTrip' || 'roundTrip'
  );
  const [pickupLocation, setPickupLocation] = useState(
    searchParams.get('pickupLocation') || ''
  );
  const [destinationLocation, setDestinationLocation] = useState(
    searchParams.get('destinationLocation') || ''
  );
  const [selectedDate, setSelectedDate] = useState(
    searchParams.get('selectedDate') || ''
  );
  const [selectedTime, setSelectedTime] = useState(
    searchParams.get('selectedTime') || '09:00'
  );
  const [returnDate, setReturnDate] = useState(
    searchParams.get('returnDate') || ''
  );
  const [returnTime, setReturnTime] = useState(
    searchParams.get('returnTime') || '09:00'
  );
  const [adults, setAdults] = useState(
    parseInt(searchParams.get('adults') || '1')
  );
  const [children, setChildren] = useState(
    parseInt(searchParams.get('children') || '0')
  );
  const [isMobile, setIsMobile] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [minReturnDate, setMinReturnDate] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);
  const [showLargeGroupMessage, setShowLargeGroupMessage] = useState(false);
  const [pricingData, setPricingData] = useState<Record<string, Record<number, number>>>({});
  const [loadingPrices, setLoadingPrices] = useState(true);
  const [nightRule, setNightRule] = useState<{ start_time: string; end_time: string; charge: number } | null>(null);
  // --- state for weekend price ---
  const [weekendPrice, setWeekendPrice] = useState<number>(0);

useEffect(() => {
    const fetchWeekendPrice = async () => {
      try {
        const res = await fetch("https://devsquare-apis.vercel.app/api/transfers/weekend-price", {
          cache: "no-store",
        });
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setWeekendPrice(json.data);
        }
      } catch (err) {
        console.error("Error fetching weekend price:", err);
      }
    };

    fetchWeekendPrice();
  }, []);

  useEffect(() => {
    const fetchNightRule = async () => {
      try {
        const res = await fetch("https://devsquare-apis.vercel.app/api/transfers/midnight-pricing", { cache: "no-store" });
        const json = await res.json();
        if (json.success && json.data) {
          setNightRule({
            start_time: json.data.start_time,
            end_time: json.data.end_time,
            charge: parseFloat(json.data.charge),
          });
        }
      } catch (err) {
        console.error("Error fetching night charge rule:", err);
      }
    };
    fetchNightRule();
  }, []);

  const [percentageRules, setPercentageRules] = useState<
    { start_date: string; end_date: string; price: string }[]
  >([]);
  useEffect(() => {
    const fetchPercentageRules = async () => {
      try {
        const res = await fetch("https://devsquare-apis.vercel.app/api/transfers/date-based-price", {
          cache: "no-store",
        });
        const json = await res.json();
        if (json.data) {
          setPercentageRules(json.data);
        }
      } catch (err) {
        console.error("Error fetching percentage rules:", err);
      }
    };

    fetchPercentageRules();
  }, []);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        setLoadingPrices(true);
        const res = await fetch("https://devsquare-apis.vercel.app/api/transfers/pricing", {
          cache: "no-store",
        });
        const json = await res.json();

        if (json.success && Array.isArray(json.data)) {
          const grouped: Record<string, Record<number, number>> = {};

          json.data.forEach((row: { location: string; passengers: number; price: string }) => {
            if (!grouped[row.location]) grouped[row.location] = {};
            grouped[row.location][row.passengers] = parseFloat(row.price);
          });

          setPricingData(grouped);
        }
      } catch (err) {
        console.error("Error fetching pricing:", err);
      } finally {
        setLoadingPrices(false);
      }
    };

    fetchPricing();
  }, []);
  const isWithinNightHours = (timeStr: string, rule: { start_time: string; end_time: string }) => {
    if (!timeStr) return false;

    const [h, m] = timeStr.split(":").map(Number);
    const bookingMinutes = h * 60 + m;

    const [startH, startM] = rule.start_time.split(":").map(Number);
    const [endH, endM] = rule.end_time.split(":").map(Number);

    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    if (startMinutes < endMinutes) {
      // e.g. 20:00 → 23:59 (same day range)
      return bookingMinutes >= startMinutes && bookingMinutes <= endMinutes;
    } else {
      // e.g. 20:00 → 05:00 (crosses midnight)
      return bookingMinutes >= startMinutes || bookingMinutes <= endMinutes;
    }
  };

  // All locations that can be selected in either pickup or destination
  const allLocations: LocationOption[] = [
    // Airports and stations
   { value: 'Chambery CMF', label: 'Chambery (CMF)', type: 'airport', country: 'FR', code: 'CMF' },
    { value: 'Geneva GVA', label: 'Geneva Airport (GVA)', type: 'airport', country: 'CH', code: 'GVA' },
    { value: 'Lyon LYS', label: 'Lyon (LYS)', type: 'airport', country: 'FR', code: 'LYS' },
    { value: 'Grenoble GNB', label: 'Grenoble (GNB)', type: 'airport', country: 'FR', code: 'GNB' },
    { value: 'Gare AIME', label: 'GARE (AIME)', type: 'airport', country: 'FR', code: 'AIME' },
    { value: 'Gare BSM', label: 'GARE (BSM)', type: 'airport', country: 'FR', code: 'BSM' },
    { value: 'Hotel GVA', label: 'Geneva Hotel', type: 'hotel', country: 'CH' },
    { value: 'Gen Centre', label: 'Geneva City Centre', type: 'city', country: 'CH' },
    { value: 'Lyon Centre', label: 'Lyon City Centre', type: 'city', country: 'FR' },
    { value: 'AIME', label: 'Aime Train Station', type: 'station', country: 'FR', code: 'GARE AIME' },
    { value: 'BSM', label: 'Bourg St Maurice Train station', type: 'station', country: 'FR', code: 'GARE BSM' },
    { value: 'Plagne 1800', label: 'Plagne 1800', type: 'resort', country: 'FR' },
    { value: 'Plagne Centre', label: 'Plagne Centre', type: 'resort', country: 'FR' },
    { value: 'Belle Plagne', label: 'Belle Plagne', type: 'resort', country: 'FR' },
    { value: 'La Plagne Bellecote', label: 'La Plagne Bellecote', type: 'resort', country: 'FR' },
    { value: 'La Plagne Aime 2000', label: 'La Plagne Aime 2000', type: 'resort', country: 'FR' },
    { value: 'La Plagne Villages', label: 'La Plagne Villages', type: 'resort', country: 'FR' },
    { value: 'La Plagne Soleil', label: 'La Plagne Soleil', type: 'resort', country: 'FR' },
    { value: 'La Plagne La Roche', label: 'La Plagne La Roche', type: 'resort', country: 'FR' },
    { value: 'La Plagne Crete Cote', label: 'La Plagne Crête Cote', type: 'resort', country: 'FR' },
    { value: 'Montchavin', label: 'Montchavin', type: 'resort', country: 'FR' },
    { value: 'Les Coches', label: 'Les Coches', type: 'resort', country: 'FR' },
    { value: 'Champagny en Vanoise', label: 'Champagny en Vanoise', type: 'resort', country: 'FR' },
    {
      value: 'other-resort',
      label: 'For other resorts please contact info@featherstransfers.com',
      type: 'other',
      disabled: true
    }
  ];

  // Function to organize locations for pickup (Airports, Hotels/Cities, Stations first, then Resorts)
  const getPickupLocations = (currentValue: string, oppositeValue: string) => {
    const categoriesOrder = ['airport', 'hotel', 'city', 'station', 'resort', 'other'];
    const grouped = allLocations.reduce((acc, loc) => {
      if (!acc[loc.type]) acc[loc.type] = [];
      acc[loc.type].push({
        ...loc,
        disabled: loc.value === oppositeValue && oppositeValue !== ''
      });
      return acc;
    }, {} as Record<string, LocationOption[]>);

    // Sort according to our preferred order
    return categoriesOrder.flatMap(type => grouped[type] || []);
  };

  // Function to organize locations for destination (Resorts first, then others)
  const getDestinationLocations = (currentValue: string, oppositeValue: string) => {
    const categoriesOrder = ['resort', 'airport', 'hotel', 'city', 'station', 'other'];
    const grouped = allLocations.reduce((acc, loc) => {
      if (!acc[loc.type]) acc[loc.type] = [];
      acc[loc.type].push({
        ...loc,
        disabled: loc.value === oppositeValue && oppositeValue !== ''
      });
      return acc;
    }, {} as Record<string, LocationOption[]>);

    // Sort according to our preferred order
    return categoriesOrder.flatMap(type => grouped[type] || []);
  };

  const [pickupLocations, setPickupLocations] = useState<LocationOption[]>([]);
  const [destinationLocations, setDestinationLocations] = useState<LocationOption[]>([]);

  // Initialize with first location selected for pickup
  useEffect(() => {
    const initialPickupLocations = getPickupLocations('', '');
    const initialDestinationLocations = getDestinationLocations('', '');

    setPickupLocations(initialPickupLocations);
    setDestinationLocations(initialDestinationLocations);

    // Only auto-select if no values from URL parameters
    if (!pickupLocation && initialPickupLocations.length > 0) {
      setPickupLocation(initialPickupLocations[1].value);
    }
    // if (!destinationLocation && initialDestinationLocations.length > 0) {
    //   setDestinationLocation(initialPickupLocations[11].value);
    // }
  }, []);

  // Update filtered locations when values change
  useEffect(() => {
    setPickupLocations(getPickupLocations(pickupLocation, destinationLocation));
    setDestinationLocations(getDestinationLocations(destinationLocation, pickupLocation));
  }, [pickupLocation, destinationLocation]);

  // Map of valid pickup locations for pricing (airports and stations)
  const validPickupLocations = new Set(Object.keys(pricingData));

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
    const totalPassengers = adults + children;
    const isValid = (
      pickupLocation !== '' &&
      destinationLocation !== '' &&
      selectedDate !== '' &&
      selectedTime !== '' &&
      adults > 0 &&
      totalPassengers <= 12 &&
      (tripType === 'oneWay' || (
        returnDate !== '' &&
        returnTime !== '' &&
        (returnDate > selectedDate ||
          (returnDate === selectedDate && returnTime >= selectedTime))
      ))
    );
    setIsFormValid(isValid);

    // Show message if group size exceeds 12
    setShowLargeGroupMessage(totalPassengers > 12);
  }, [
    pickupLocation,
    destinationLocation,
    selectedDate,
    selectedTime,
    returnDate,
    returnTime,
    adults,
    children,
    tripType
  ]);

  const handleDateTimeChange = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleReturnDateTimeChange = (date: string, time: string) => {
    setReturnDate(date);
    setReturnTime(time);
  };

  const handlePaxChange = (adults: number, children: number) => {
    const totalPassengers = adults + children;

    // Don't allow more than 12 passengers
    if (totalPassengers > 12) {
      // Calculate how many adults we can add to stay within limit
      const maxAdults = 12 - children;
      if (maxAdults > 0) {
        setAdults(maxAdults);
      } else {
        // If children already exceed limit, reduce children instead
        setAdults(1);
        setChildren(0);
      }
      return;
    }

    setAdults(adults);
    setChildren(children);
  };

  const handleTripTypeChange = (type: 'oneWay' | 'roundTrip') => {
    setTripType(type);
  };

  const handleSwapLocations = async () => {
    setIsSwapping(true);

    // Add a small delay for the animation
    await new Promise(resolve => setTimeout(resolve, 200));

    // Swap the values
    const tempLocation = pickupLocation;
    setPickupLocation(destinationLocation);
    setDestinationLocation(tempLocation);

    setIsSwapping(false);
  };

  // Check if both locations are resorts
  const isResortToResort = (fromLocation: string, toLocation: string): boolean => {
    const fromLocationObj = allLocations.find(loc => loc.value === fromLocation);
    const toLocationObj = allLocations.find(loc => loc.value === toLocation);

    return fromLocationObj?.type === 'resort' && toLocationObj?.type === 'resort';
  };

  // Check if at least one location is an airport/station
  const hasPricedLocation = (fromLocation: string, toLocation: string): boolean => {
    const fromIsPriced = validPickupLocations.has(fromLocation);
    const toIsPriced = validPickupLocations.has(toLocation);
    return fromIsPriced || toIsPriced;
  };

  const findPricedLocation = (fromLocation: string, toLocation: string): string | null => {
    if (validPickupLocations.has(fromLocation)) return fromLocation;
    if (validPickupLocations.has(toLocation)) return toLocation;
    return null;
  };

const calculatePrice = (
  date: string,
  time: string,
  fromLocation: string,
  toLocation: string,
  applyAdminRule: boolean = true
) => {
  const totalPax = adults + children;
  const supplementDetails: string[] = [];

  const pricedLocation = findPricedLocation(fromLocation, toLocation);

  if (!pricedLocation) {
    return {
      basePrice: 0,
      supplements: 0,
      totalPrice: 0,
      supplementDetails: ['Price not available online - please contact us for a quote'],
      canPrice: false,
    };
  }

  const pax = totalPax > 12 ? 12 : totalPax;
  let basePrice = pricingData[pricedLocation][pax] || 0;
  supplementDetails.push(`Base price for ${pax} passengers: €${basePrice.toFixed(2)}`);

  let totalPrice = basePrice;
  let supplements = 0;

  // Apply admin percentage rules
  if (applyAdminRule && date && percentageRules.length > 0) {
    const journeyDate = new Date(date);

    percentageRules.forEach(rule => {
      const start = new Date(rule.start_date);
      const end = new Date(rule.end_date);
      const percent = parseFloat(rule.price);

      if (journeyDate >= start && journeyDate <= end) {
        const extra = (totalPrice * percent) / 100;
        supplements += extra;
        totalPrice += extra;
        supplementDetails.push(
          `Admin price adjustment: ${percent > 0 ? '+' : ''}${percent}% (€${extra.toFixed(2)})`
        );
      }
    });
  }

  // Apply night rule surcharge
  if (nightRule && isWithinNightHours(time, nightRule)) {
    const basePrice = totalPrice;
    const apiPrice = nightRule?.charge;
    const extra = (basePrice * apiPrice )/ 100;
    supplements += extra;
    totalPrice += extra;
    supplementDetails.push(`Night-time charge: +€${extra.toFixed(2)}`);
  }

  // Apply weekend surcharge
  if (date) {
    const day = new Date(date).getDay();
    const dayName = day === 6 ? 'saturday' : day === 0 ? 'sunday' : null;

    if (dayName && Array.isArray(weekendPrice) && weekendPrice.length > 0) {
      const dayPrice = weekendPrice.find((item: {day: string, price: string}) => item.day === dayName);
      if (dayPrice) {
        const percentageFromApi = parseFloat(dayPrice.price);
        const surcharge = (totalPrice * percentageFromApi) / 100;
        
        supplements += surcharge;
        totalPrice += surcharge;
        
        supplementDetails.push(`${dayName.charAt(0).toUpperCase() + dayName.slice(1)} surcharge (${percentageFromApi}%): +€${surcharge.toFixed(2)}`);
      }
    }
  }

  return {
    basePrice: parseFloat(basePrice.toFixed(2)),
    supplements: parseFloat(supplements.toFixed(2)),
    totalPrice: parseFloat(totalPrice.toFixed(2)),
    supplementDetails,
    canPrice: true,
  };
};


  const handleSubmit = () => {
    if (!isFormValid) return;

    const totalPassengers = adults + children;

    // Check if group size exceeds 12
    if (totalPassengers > 12) {
      return; // Should not happen due to validation, but just in case
    }

    // Check if this is a resort-to-resort transfer
    if (isResortToResort(pickupLocation, destinationLocation)) {
      router.push('/contact');
      return;
    }

    const departurePrice = calculatePrice(
      selectedDate,
      selectedTime,
      pickupLocation,
      destinationLocation,
      true // 👈 outbound should include admin %
    );

    
    let returnPrice =
      tripType === 'roundTrip'
        ? calculatePrice(returnDate, returnTime, destinationLocation, pickupLocation, true) // 👈 return leg should NOT include admin %
        : null;

    // If we can't price either leg, redirect to contact page
    if (!departurePrice.canPrice || (tripType === 'roundTrip' && returnPrice && !returnPrice.canPrice)) {
      router.push('/contact');
      return;
    }

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
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${tripType === 'roundTrip' ? 'bg-white text-textprimary shadow' : 'text-white'
              }`}
          >
            Round trip
          </button>
          <button
            onClick={() => handleTripTypeChange('oneWay')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${tripType === 'oneWay' ? 'bg-white text-textprimary shadow' : 'text-white'
              }`}
          >
            One way
          </button>
        </div>

        <div className="flex md:flex-row flex-col gap-3 justify-between">
          <div className={`col-span-1 transition-opacity duration-200 ${isSwapping ? 'opacity-50' : 'opacity-100'}`}>
            <label className="block text-sm font-medium mb-1 md:hidden">Pickup Location</label>
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
              className={`bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-all duration-200 ${isSwapping ? 'animate-spin' : ''
                }`}
              aria-label="Swap locations"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
          </div>

          <div className={`col-span-1 transition-opacity duration-200 ${isSwapping ? 'opacity-50' : 'opacity-100'}`}>
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
              maxTotal={12}
            />
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-blue-700 transition-colors duration-200 w-full h-full ${isMobile ? 'text-sm py-2' : ''
                } ${!isFormValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
            >
              {isMobile ? 'Book Now' : 'Book Now'}
            </button>
          </div>
        </div>

        {/* Large group message */}
        {showLargeGroupMessage && (
          <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 rounded-md text-yellow-800 text-sm">
            For groups in excess of 12 passengers, please request a custom quote by contacting{' '}
            <a href="mailto:info@featherstransfers.com" className="font-semibold underline">
              info@featherstransfers.com
            </a>
          </div>
        )}
      </div>
    </div>
  );
}