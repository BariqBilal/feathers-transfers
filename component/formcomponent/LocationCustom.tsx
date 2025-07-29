  'use client';
  import React, { useState, useEffect, useRef } from 'react';
  import { CiLocationOn } from 'react-icons/ci';
  import { FaPlane, FaTrain } from 'react-icons/fa';
  import { GiWoodCabin } from 'react-icons/gi';

  interface LocationOption {
    value: string;
    label: string;
    type?: 'airport' | 'station' | 'resort' | 'city' | 'hotel';
    country?: 'france' | 'switzerland';
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
    const modalRef = useRef<HTMLDivElement>(null);

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

    const selectedLabel = options.find(option => option.value === value)?.label || label;

    const handleOptionClick = (optionValue: string) => {
      onChange(optionValue);
      setShowModal(false);
    };

    const handleTriggerClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setShowModal(!showModal);
    };

    // Get country flag emoji
    const getCountryFlag = (country?: string) => {
      switch (country) {
        case 'france': return '🇫🇷';
        case 'switzerland': return '🇨🇭';
        default: return '';
      }
    };

    // Group options by type
    const groupedOptions = options.reduce((acc, option) => {
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
          <div className="flex items-center gap-1">
            <CiLocationOn className="text-gray-600" />
            <span className="text-gray-800 text-sm truncate">
              {value ? selectedLabel : `Select ${label}`}
            </span>
          </div>
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

        {showModal && (
          <div 
            className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg z-50 min-w-60 w-full max-h-96 overflow-y-auto border border-gray-200"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="p-3">
              {Object.entries(groupedOptions).map(([category, categoryOptions]) => (
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
                        {option.type === 'airport' ? (
                          <FaPlane className="text-blue-500 text-lg" />
                        ) : option.type === 'station' ? (
                          <FaTrain className="text-green-500 text-lg" />
                        ) : option.type === 'resort' ? (
                          <GiWoodCabin className="text-amber-600 text-lg" />
                        ) : (
                          <CiLocationOn className="text-gray-500 text-lg" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">
                          {option.label}
                          {option.country && (
                            <span className="ml-2">{getCountryFlag(option.country)}</span>
                          )}
                        </div>
                        {option.code && (
                          <div className="text-xs text-gray-500">{option.code}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  export default LocationCustom;