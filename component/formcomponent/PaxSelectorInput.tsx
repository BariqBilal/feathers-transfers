'use client';
import React, { useState, useEffect, useRef } from 'react';

interface PaxSelectorInputProps {
  adults: number;
  children: number;
  onChange: (adults: number, children: number) => void;
  maxTotal?: number;
}

const PaxSelectorInput: React.FC<PaxSelectorInputProps> = ({
  adults,
  children,
  onChange,
  maxTotal = 12
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [tempAdults, setTempAdults] = useState(adults);
  const [tempChildren, setTempChildren] = useState(children);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Sync with props
  useEffect(() => {
    setTempAdults(adults);
    setTempChildren(children);
  }, [adults, children]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (showDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)) {
        setShowDropdown(false);
        // Apply changes immediately when clicking outside
        onChange(tempAdults, tempChildren);
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, [showDropdown, tempAdults, tempChildren, onChange]);

  const displayPax = `${tempAdults} adult${tempAdults > 1 ? 's' : ''} • ${tempChildren} child${tempChildren > 1 ? 'ren' : ''}`;
  const totalPassengers = tempAdults + tempChildren;
  const maxAdultsReached = totalPassengers >= maxTotal;
  const maxChildrenReached = totalPassengers >= maxTotal;

  const handleAdultsChange = (newAdults: number) => {
    const newTotal = newAdults + tempChildren;
    if (newTotal <= maxTotal) {
      setTempAdults(newAdults);
    } else if (tempChildren > 0) {
      // If adding an adult would exceed the limit, but we have children,
      // reduce children first if possible
      const availableSpace = maxTotal - newAdults;
      if (availableSpace >= 0) {
        setTempAdults(newAdults);
        setTempChildren(Math.min(tempChildren, availableSpace));
      }
    }
  };

  const handleChildrenChange = (newChildren: number) => {
    const newTotal = tempAdults + newChildren;
    if (newTotal <= maxTotal) {
      setTempChildren(newChildren);
    } else if (tempAdults > 0) {
      // If adding a child would exceed the limit, but we have adults,
      // reduce adults first if possible
      const availableSpace = maxTotal - newChildren;
      if (availableSpace >= 0) {
        setTempChildren(newChildren);
        setTempAdults(Math.min(tempAdults, availableSpace));
      }
    }
  };

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        id="pax-selector"
        className="w-full flex items-center justify-start px-3 py-3 border border-gray-300 rounded-md bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={(e) => {
          e.stopPropagation();
          setShowDropdown(prev => !prev);
        }}
      >
        <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        {displayPax}
      </button>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-[1000] mt-2 w-full min-w-3xs bg-white border border-gray-300 rounded-lg shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Passengers</h3>

            {/* Max passengers warning */}
            {totalPassengers >= maxTotal && (
              <div className="mb-3 p-2 bg-yellow-100 border border-yellow-400 rounded text-yellow-800 text-sm">
                Maximum {maxTotal} passengers allowed. For larger groups, please contact us. <a href="mailto:info@featherstransfers.com" className='underline text-blue-500'>info@featherstransfers.com</a>
              </div>
            )}

            {/* Adults Counter */}
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <div>
                <p className="font-medium text-gray-800">Adults</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleAdultsChange(tempAdults - 1)}
                  disabled={tempAdults === 0}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-lg font-semibold text-gray-900 w-6 text-center">{tempAdults}</span>
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleAdultsChange(tempAdults + 1)}
                  disabled={maxAdultsReached}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Children Counter */}
            <div className="flex justify-between items-center py-3">
              <div>
                <p className="font-medium text-gray-800">Children</p>
                <p className="text-xs text-gray-500">Aged up to 16</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleChildrenChange(tempChildren - 1)}
                  disabled={tempChildren === 0}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-lg font-semibold text-gray-900 w-6 text-center">{tempChildren}</span>
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleChildrenChange(tempChildren + 1)}
                  disabled={maxChildrenReached}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700">
                Total passengers: <span className={totalPassengers > maxTotal ? "text-red-600" : "text-green-600"}>
                  {totalPassengers}/{maxTotal}
                </span>
              </p>
              <button
                onClick={() => setShowDropdown(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaxSelectorInput;