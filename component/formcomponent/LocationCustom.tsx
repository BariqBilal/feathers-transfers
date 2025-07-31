'use client';
import React, { useState, useEffect, useRef } from 'react';
import { CiLocationOn, CiSearch } from 'react-icons/ci';
import { FaPlane, FaTrain, FaHotel, FaCity } from 'react-icons/fa';
import { GiWoodCabin } from 'react-icons/gi';
import { MdOutlineOtherHouses } from 'react-icons/md';
import ReactCountryFlag from 'react-country-flag';

interface LocationOption {
  value: string;
  label: string;
  type?: 'airport' | 'station' | 'resort' | 'city' | 'hotel' | 'other';
  country?: 'FR' | 'CH'; // ISO 2-letter country codes
  code?: string;
}

interface LocationCustomProps {
  id: string;
  label: string;
  value: string;
  options: LocationOption[];
  onChange: (value: string) => void;
}

const LocationCustom: React.FC<LocationCustomProps> = ({ id, label, value, options, onChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showModal && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [showModal]);

  useEffect(() => {
    if (showModal && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showModal]);

  const selectedLabel = options.find(option => option.value === value)?.label || label;
  const selectedOption = options.find(option => option.value === value);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setShowModal(false);
    setSearchTerm('');
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(!showModal);
  };

  const getLocationIcon = (type?: string) => {
    switch (type) {
      case 'airport': return <FaPlane className="text-blue-500 text-lg" />;
      case 'station': return <FaTrain className="text-green-500 text-lg" />;
      case 'resort': return <GiWoodCabin className="text-amber-600 text-lg" />;
      case 'city': return <FaCity className="text-purple-500 text-lg" />;
      case 'hotel': return <FaHotel className="text-red-500 text-lg" />;
      default: return <MdOutlineOtherHouses className="text-gray-500 text-lg" />;
    }
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (option.code && option.code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const groupedOptions = filteredOptions.reduce((acc, option) => {
    let category = 'Other';
    if (option.type === 'airport') category = 'Airports';
    if (option.type === 'station') category = 'Train Stations';
    if (option.type === 'resort') category = 'Ski Resorts';
    if (option.type === 'city') category = 'City Centers';
    if (option.type === 'hotel') category = 'Hotels';

    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(option);
    return acc;
  }, {} as Record<string, LocationOption[]>);

  return (
    <div className="relative flex-1 min-w-[200px]" ref={modalRef}>
      <div
        className="flex items-center px-3 py-3 bg-white rounded-md border border-gray-200 h-full cursor-pointer"
        onClick={handleTriggerClick}
      >
        <div className="flex items-center gap-2 w-full">
          {/* {selectedOption ? getLocationIcon(selectedOption.type) : <CiLocationOn className="text-gray-600 text-lg" />} */}
          <div className="flex-1 min-w-0">
            <div className="text-gray-800 text-sm truncate">
              {value ? selectedLabel : `Select ${label}`}
            </div>
          </div>
          {selectedOption?.country && (
            <ReactCountryFlag 
              countryCode={selectedOption.country}
              svg
              style={{
                width: '1.5em',
                height: '1.5em',
              }}
              title={selectedOption.country}
            />
          )}
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${showModal ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {showModal && (
        <div 
          className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg z-50 min-w-60 w-full max-h-96 overflow-y-auto border border-gray-200"
          onClick={(e) => e.stopPropagation()} 
        >
          <div className="p-3">
            {/* Search Bar */}
            <div className="relative mb-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CiSearch className="text-gray-400" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                className="block w-full pl-10 pr-3 text-black py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {Object.entries(groupedOptions).length > 0 ? (
              Object.entries(groupedOptions).map(([category, categoryOptions]) => (
                <div key={category} className="mb-3">
                  <h4 className="text-xs font-semibold text-gray-500 mb-2 px-1 uppercase tracking-wider">
                    {category}
                  </h4>
                  {categoryOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center p-2 cursor-pointer hover:bg-gray-50 text-sm text-gray-800 rounded-md"
                      onClick={() => handleOptionClick(option.value)}
                    >
                      <div className="mr-3 flex-shrink-0">
                        {getLocationIcon(option.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{option.label}</div>
                        {option.code && (
                          <div className="text-xs text-gray-500 truncate">{option.code}</div>
                        )}
                      </div>
                      {option.country && (
                        <ReactCountryFlag 
                          countryCode={option.country}
                          svg
                          style={{
                            width: '1.5em',
                            height: '1.5em',
                          }}
                          title={option.country}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                No locations found matching your search
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationCustom;