'use client';
import React, { useState, useEffect, useRef } from 'react';
import { CiLocationOn } from 'react-icons/ci';

interface LocationCustomProps {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

const LocationCustom: React.FC<LocationCustomProps> = ({ id, label, value, options, onChange }) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is outside the modal and the modal is open
      if (showModal && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    };

    // Use capture phase to catch the event earlier
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [showModal]); // Only re-run when showModal changes

  const selectedLabel = options.find(option => option.value === value)?.label || label;

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setShowModal(false);
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up to document
    setShowModal(!showModal);
  };

  return (
    <div className="relative flex-1 min-w-[200px]" ref={modalRef}>
      <div
        className="flex items-center px-3 py-3 bg-white rounded-md border border-gray-200 h-full cursor-pointer"
        onClick={handleTriggerClick}
      >
        <div className="flex items-center gap-1">
         <CiLocationOn />

          <span className="text-gray-800 text-sm  truncate">
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
          className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg z-50 w-full max-h-60 overflow-y-auto border border-gray-200"
          onClick={(e) => e.stopPropagation()} 
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="p-3 cursor-pointer hover:bg-gray-100 text-sm text-gray-800"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationCustom;