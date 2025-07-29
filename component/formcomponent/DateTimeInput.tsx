'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';

interface DateTimeInputProps {
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  onChange: (date: string, time: string) => void;
  placeholder?: string;
  minDate?: string; // Minimum allowed date (YYYY-MM-DD)
  minTime?: string; // Minimum allowed time when date === minDate (HH:MM)
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({ 
  date, 
  time, 
  onChange,
  placeholder = 'Select Date & Time',
  minDate,
  minTime
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedHour, setSelectedHour] = useState(parseInt(time.split(':')[0]));
  const [selectedMinute, setSelectedMinute] = useState(parseInt(time.split(':')[1]));
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentView, setCurrentView] = useState<'date' | 'time'>('date');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);

  // Initialize with props
  useEffect(() => {
    if (date) setSelectedDate(date);
    if (time) {
      const [hour, minute] = time.split(':').map(Number);
      setSelectedHour(hour);
      setSelectedMinute(minute);
    }
  }, [date, time]);

  // Set initial month view based on selected date or min date
  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(new Date(selectedDate));
    } else if (minDate) {
      setCurrentMonth(new Date(minDate));
    }
  }, [selectedDate, minDate]);

  // Detect outside clicks
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (showDropdown && 
          dropdownRef.current && 
          !dropdownRef.current.contains(target) && 
          triggerRef.current && 
          !triggerRef.current.contains(target)) {
        setShowDropdown(false);
        setCurrentView('date');
      }
    };

    document.addEventListener('click', handleOutsideClick, true);
    return () => document.removeEventListener('click', handleOutsideClick, true);
  }, [showDropdown]);

  // Format display text
  const displayDateTime = useMemo(() => {
    if (!selectedDate) return placeholder;
    const d = new Date(`${selectedDate}T${String(selectedHour).padStart(2, '0')}:${String(selectedMinute).padStart(2, '0')}:00`);
    if (isNaN(d.getTime())) return 'Invalid Date';

    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }, [selectedDate, selectedHour, selectedMinute, placeholder]);

  // Calendar navigation
  const goToPreviousMonth = () => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const goToNextMonth = () => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  // Check if a date is disabled
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Disable dates in the past
    if (date < today) return true;

    // Disable dates before minDate if specified
    if (minDate) {
      const minDateObj = new Date(minDate);
      minDateObj.setHours(0, 0, 0, 0);
      if (date < minDateObj) return true;
    }

    return false;
  };

  // Check if a time is disabled
  const isTimeDisabled = (hour: number, minute: number) => {
    if (!minTime || !minDate || selectedDate !== minDate) return false;
    
    const [minHour, minMinute] = minTime.split(':').map(Number);
    return hour < minHour || (hour === minHour && minute < minMinute);
  };

  // Generate calendar days
  const generateCalendarDays = (month: Date) => {
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const daysInMonth = endOfMonth.getDate();
    const firstDayOfWeek = startOfMonth.getDay();

    const days = [];
    for (let i = 0; i < firstDayOfWeek; i++) days.push(null);

    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(month.getFullYear(), month.getMonth(), i);
      days.push({
        day: i,
        isDisabled: isDateDisabled(dayDate)
      });
    }
    return days;
  };

  const calendarDays = generateCalendarDays(currentMonth);

  // Handle date selection
  const handleDateSelect = (day: number | null, isDisabled: boolean) => {
    if (day && !isDisabled) {
      const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const newDateStr = newDate.toISOString().split('T')[0];
      setSelectedDate(newDateStr);
      setCurrentView('time');
      
      // Reset time if needed when date changes
      let hour = selectedHour;
      let minute = selectedMinute;
      
      if (minDate && newDateStr === minDate && minTime) {
        const [minHour, minMinute] = minTime.split(':').map(Number);
        if (hour < minHour || (hour === minHour && minute < minMinute)) {
          hour = minHour;
          minute = minMinute;
          setSelectedHour(hour);
          setSelectedMinute(minute);
        }
      }
      
      onChange(newDateStr, `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
    }
  };

  // Handle time selection with debounce
  const handleTimeChange = useMemo(() => {
    let timeoutId: NodeJS.Timeout;
    
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        onChange(
          selectedDate,
          `${String(selectedHour).padStart(2, '0')}:${String(selectedMinute).padStart(2, '0')}`
        );
      }, 300);
    };
  }, [selectedDate, selectedHour, selectedMinute, onChange]);

  // Time picker handlers
  const handleHourScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const index = Math.round(e.currentTarget.scrollTop / 48);
    const hour = index % 24;
    if (hour !== selectedHour && !isTimeDisabled(hour, selectedMinute)) {
      setSelectedHour(hour);
      handleTimeChange();
    }
  };

  const handleMinuteScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const index = Math.round(e.currentTarget.scrollTop / 48);
    const minute = (index * 5) % 60;
    if (minute !== selectedMinute && !isTimeDisabled(selectedHour, minute)) {
      setSelectedMinute(minute);
      handleTimeChange();
    }
  };

  // Scroll to selected time
  useEffect(() => {
    if (showDropdown && currentView === 'time') {
      setTimeout(() => {
        hoursRef.current?.scrollTo(0, selectedHour * 48);
        minutesRef.current?.scrollTo(0, (selectedMinute / 5) * 48);
      }, 10);
    }
  }, [showDropdown, currentView, selectedHour, selectedMinute]);

  // Handle responsive positioning
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    const handleResize = () => {
      checkMobile();
      if (showDropdown && triggerRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - triggerRect.bottom;
        setDropdownPosition(spaceBelow < 400 ? 'top' : 'bottom');
      }
    };

    checkMobile();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showDropdown]);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        className="w-full flex items-center justify-start px-3 py-3 border border-gray-300 rounded-md bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={(e) => {
          e.stopPropagation();
          setShowDropdown(!showDropdown);
          setCurrentView('date');
        }}
      >
        <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {displayDateTime}
      </button>

      {showDropdown && (
        <div 
          ref={dropdownRef}
          className={`absolute z-[1000] ${dropdownPosition === 'bottom' ? 'mt-2' : 'bottom-full mb-2'} 
            w-full sm:w-auto min-w-[300px] bg-white border border-gray-300 rounded-lg shadow-lg
            ${isMobile ? 'fixed inset-x-0 mx-4 max-h-[80vh] overflow-y-auto' : ''}`}
          onClick={(e) => e.stopPropagation()}
          style={isMobile ? { 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            maxHeight: '80vh',
            width: 'calc(100% - 2rem)'
          } : {}}
        >
          {currentView === 'date' ? (
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <button onClick={goToPreviousMonth} className="p-2 rounded-full hover:bg-gray-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-lg font-medium">
                  {currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <button onClick={goToNextMonth} className="p-2 rounded-full hover:bg-gray-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day}>{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 text-center text-sm">
                {calendarDays.map((dayObj, index) => (
                  <div key={index} className="p-1">
                    {dayObj ? (
                      <button
                        className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors
                          ${dayObj.isDisabled ? 'text-gray-300 cursor-default' : 
                            selectedDate === new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayObj.day).toISOString().split('T')[0]
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-900 hover:bg-gray-200'}`}
                        onClick={() => handleDateSelect(dayObj.day, dayObj.isDisabled)}
                        disabled={dayObj.isDisabled}
                      >
                        {dayObj.day}
                      </button>
                    ) : (
                      <div className="w-8 h-8"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="p-4 border-b border-gray-200">
                <button 
                  onClick={() => setCurrentView('date')}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to date selection
                </button>
              </div>
              <div className="flex justify-center gap-4 p-4">
                <div className="flex flex-col items-center">
                  <span className="text-xs font-medium text-gray-500 mb-2">Hour</span>
                  <div
                    ref={hoursRef}
                    className="w-20 h-32 overflow-y-scroll no-scrollbar border border-gray-300 rounded-md py-2 text-center"
                    onScroll={handleHourScroll}
                  >
                    {Array.from({ length: 24 * 3 }, (_, i) => {
                      const hour = i % 24;
                      const disabled = isTimeDisabled(hour, selectedMinute);
                      return (
                        <div
                          key={i}
                          className={`py-3 text-lg font-medium ${
                            disabled ? 'text-gray-300 cursor-default' :
                            hour === selectedHour ? 'text-blue-600 bg-blue-100 rounded-md' : 'text-gray-700 cursor-pointer'
                          }`}
                          onClick={() => {
                            if (!disabled) {
                              setSelectedHour(hour);
                              onChange(selectedDate, `${String(hour).padStart(2, '0')}:${String(selectedMinute).padStart(2, '0')}`);
                            }
                          }}
                        >
                          {String(hour).padStart(2, '0')}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-xs font-medium text-gray-500 mb-2">Minute</span>
                  <div
                    ref={minutesRef}
                    className="w-20 h-32 overflow-y-scroll no-scrollbar border border-gray-300 rounded-md py-2 text-center"
                    onScroll={handleMinuteScroll}
                  >
                    {Array.from({ length: 12 * 3 }, (_, i) => {
                      const minute = (i * 5) % 60;
                      const disabled = isTimeDisabled(selectedHour, minute);
                      return (
                        <div
                          key={i}
                          className={`py-3 text-lg font-medium ${
                            disabled ? 'text-gray-300 cursor-default' :
                            minute === selectedMinute ? 'text-blue-600 bg-blue-100 rounded-md' : 'text-gray-700 cursor-pointer'
                          }`}
                          onClick={() => {
                            if (!disabled) {
                              setSelectedMinute(minute);
                              onChange(selectedDate, `${String(selectedHour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
                            }
                          }}
                        >
                          {String(minute).padStart(2, '0')}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DateTimeInput;