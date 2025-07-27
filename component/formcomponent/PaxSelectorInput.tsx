'use client';
import React, { useState, useEffect, useRef } from 'react';

interface PaxSelectorInputProps {
  adults: number;
  children: number;
  onChange: (adults: number, children: number) => void;
}

const PaxSelectorInput: React.FC<PaxSelectorInputProps> = ({ adults, children, onChange }) => {
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

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        id="pax-selector"
        className="w-full flex items-center justify-start px-3 py-3 border border-gray-300 rounded-md  bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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

            {/* Adults Counter */}
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <div>
                <p className="font-medium text-gray-800">Adults</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setTempAdults(prev => Math.max(0, prev - 1))}
                  disabled={tempAdults === 0}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-lg font-semibold text-gray-900 w-6 text-center">{tempAdults}</span>
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                  onClick={() => setTempAdults(prev => prev + 1)}
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
                  onClick={() => setTempChildren(prev => Math.max(0, prev - 1))}
                  disabled={tempChildren === 0}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-lg font-semibold text-gray-900 w-6 text-center">{tempChildren}</span>
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                  onClick={() => setTempChildren(prev => prev + 1)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaxSelectorInput;