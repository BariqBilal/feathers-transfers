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
  disabled?: boolean;
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
  const [pricingData, setPricingData] = useState<Record<string, Record<number, number>>>({});
  const [loadingPrices, setLoadingPrices] = useState(true);
  const [isSwapping, setIsSwapping] = useState(false);
  const [percentageRules, setPercentageRules] = useState<
    { start_date: string; end_date: string; price: string }[]
  >([]);
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

  const allLocations: LocationOption[] = [
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

    return categoriesOrder.flatMap(type => grouped[type] || []);
  };

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

    return categoriesOrder.flatMap(type => grouped[type] || []);
  };

  const [pickupLocations, setPickupLocations] = useState<LocationOption[]>(getPickupLocations('', ''));
  const [destinationLocations, setDestinationLocations] = useState<LocationOption[]>(getDestinationLocations('', ''));

  useEffect(() => {
    const initialPickupLocations = getPickupLocations('', '');
    const initialDestinationLocations = getDestinationLocations('', '');
    setPickupLocations(getPickupLocations(pickupLocation, destinationLocation));
    setDestinationLocations(getDestinationLocations(destinationLocation, pickupLocation));
    if (!pickupLocation && initialPickupLocations.length > 0) {
      setPickupLocation(initialPickupLocations[1].value);
    }
    // if (!destinationLocation && initialDestinationLocations.length > 0) {
    //   setDestinationLocation(initialPickupLocations[.value);
    // }
  }, [pickupLocation, destinationLocation]);

  const validPickupLocations = new Set(Object.keys(pricingData));

  const handleSwapLocations = async () => {
    setIsSwapping(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    const tempLocation = pickupLocation;
    setPickupLocation(destinationLocation);
    setDestinationLocation(tempLocation);
    setIsSwapping(false);
  };

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
  toLocation: string
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

  if (date && percentageRules.length > 0) {
    const journeyDate = new Date(date);

    percentageRules.forEach(rule => {
      const start = new Date(rule.start_date);
      const end = new Date(rule.end_date);
      const percent = parseFloat(rule.price);

      if (journeyDate >= start && journeyDate <= end) {
        const extra = (totalPrice * percent) / 100;
        supplements += extra;
        totalPrice += extra;
        supplementDetails.push(`Admin price increase: +${percent}% (€${extra.toFixed(2)})`);
      }
    });
  }

  if (date) {
    const day = new Date(date).getDay();
    const dayName = day === 6 ? 'saturday' : day === 0 ? 'sunday' : null;

    if (dayName && Array.isArray(weekendPrice) && weekendPrice.length > 0) {
      const dayPrice = weekendPrice.find((item: {day: string, price: string}) => item.day === dayName);
      if (dayPrice) {
        console.log(basePrice,'basePrice')
        const percentageFromApi = parseFloat(dayPrice.price);
        const surcharge = (basePrice * percentageFromApi) / 100;
        console.log(surcharge,'surcharge')
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

  useEffect(() => {
    if (isFormValid && !showQuoteDetails) {
      const totalPax = adults + children;

      if (totalPax > 12) {
        setPrice(null);
        setPriceDetails(['For groups in excess of 12 passengers, please request a custom quote by clicking info@featherstransfers.com']);
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

      setPrice(departurePrice.canPrice && (tripType === 'oneWay' || (returnPrice?.canPrice ?? true)) ? totalPrice : null);
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
      adults > 0 &&
      (tripType === 'oneWay' || (
        returnDate !== '' &&
        (returnDate > selectedDate ||
          (returnDate === selectedDate))
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

    if (totalPax > 12) {
      setPrice(null);
      setPriceDetails(['For groups in excess of 12 passengers, please request a custom quote by clicking info@featherstransfers.com']);
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

    setPrice(departurePrice.canPrice && (tripType === 'oneWay' || (returnPrice?.canPrice ?? true)) ? totalPrice : null);
    setPriceDetails(allDetails);
    setShowQuoteDetails(false);
  };

  const handleBookNow = () => {
    if (!isFormValid) return;

    if (price === null) {
      router.push('/contact');
      return;
    }

    router.push(`/book-now`);
  };

  const handleChangeDetails = () => {
    setShowQuoteDetails(true);
  };

  const handleDateTimeChange = (date: string, time: string) => {
    setSelectedDate(date);
  };

  const handleReturnDateTimeChange = (date: string, time: string) => {
    setReturnDate(date);
  };

  const handlePaxChange = (newAdults: number, newChildren: number) => {
    setAdults(newAdults);
    setChildren(newChildren);
  };

  const handleTripTypeChange = (type: 'oneWay' | 'roundTrip') => {
    setTripType(type);
  };

  const getLocationLabel = (value: string) => {
    return allLocations.find(loc => loc.value === value)?.label || value;
  };


  const formatDate = (dateString: string) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const suffix = (day % 10 === 1 && day !== 11) ? 'st' :
      (day % 10 === 2 && day !== 12) ? 'nd' :
        (day % 10 === 3 && day !== 13) ? 'rd' : 'th';

    return `${dayName}, ${day}${suffix} ${month} ${year}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:min-w-md xs:w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Quote – for an idea of price</h2>

      <div className="flex gap-3 mb-4">
        <button
          onClick={() => handleTripTypeChange('roundTrip')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium ${tripType === 'roundTrip' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
            }`}
        >
          Round Trip
        </button>
        <button
          onClick={() => handleTripTypeChange('oneWay')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium ${tripType === 'oneWay' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
            }`}
        >
          One Way
        </button>
      </div>

      {showQuoteDetails ? (
        <>
          <div className="flex flex-col md:flex-row gap-3 mb-4">
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
                className={`bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-all duration-200 ${isSwapping ? 'animate-spin' : ''
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
                time={''}
                showTimeAfterDate={false}
                onChange={handleDateTimeChange}
                placeholder="Departure Date"
              />
            </div>
            {tripType === 'roundTrip' && (
              <div className="md:col-span-1">
                <DateTimeInput
                  date={returnDate}
                  showTimeAfterDate={false}
                  time={''}
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
            className={`w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors ${!isFormValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
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
              {adults + children} {adults + children === 1 ? 'person' : 'people'} from {getLocationLabel(pickupLocation)} to {getLocationLabel(destinationLocation)}
            </p>
            <div className="text-sm text-gray-500 mt-2 space-y-1">
              <div>Arrive: {formatDate(selectedDate)}</div>
              {tripType === 'roundTrip' && (
                <div>Depart: {formatDate(returnDate)}</div>
              )}
            </div>
          </div>

          {price !== null ? (
            <div className="mb-6">
              <div className="text-xl font-bold text-blue-600">
                Price starting from: €{price?.toFixed(2)}
              </div>
              {tripType === 'roundTrip' && (
                <div className="text-sm text-gray-600">
                  Total for round trip
                </div>
              )}
            </div>
          ) : (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">

         <div className="mb-3 p-2 bg-yellow-100 border border-yellow-400 rounded text-yellow-800 text-sm">
  For other resorts please contact{" "}
  <a
    href="https://mail.google.com/mail/?view=cm&fs=1&to=info@featherstransfers.com"
    target="_blank"
    rel="noopener noreferrer"
    className="underline text-blue-500"
  >
    info@featherstransfers.com
  </a>
</div>

            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleBookNow}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              {price !== null ? 'Book Now' : 'Contact Us'}
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