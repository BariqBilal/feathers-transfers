'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Book Now', href: '/book-now' },
    { name: 'La Plagne', href: '/la-plagne' },
    { name: 'Useful Links', href: '/link-page' },
    {
      name: 'Airports We Serve',
      dropdownItems: [
        { name: 'Geneva Airport', href: '/airport-geneva' },
        { name: 'Chambery Airport', href: '/chambery-airport' },
        { name: 'Grenoble Alpes-Isère Airport', href: '/grenoble-airport' },
        { name: 'Lyon Saint-Exupéry Airport', href: '/lyon-airport' },
      ],
    },
    { name: 'Transfer Advice', href: '/transfer-advice' },
    { name: 'Contact Us', href: '/contact' },
  ];

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Handle click outside for desktop dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown && dropdownRefs.current[openDropdown]) {
        if (!dropdownRefs.current[openDropdown]?.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };

    if (!isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown, isMobile]);

  // Handle scroll to close dropdowns
  useEffect(() => {
    const handleScroll = () => {
      setOpenDropdown(null);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle desktop dropdown hover
  const handleMouseEnter = (itemName: string) => {
    if (!isMobile) {
      setOpenDropdown(itemName);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setOpenDropdown(null);
    }
  };

  // Handle dropdown click (works for both desktop and mobile)
  const handleDropdownClick = (itemName: string) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <nav className="bg-white shadow-sm font-inter sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            <Image
              src="/Logo.png"
              alt="Feathers Transfers Logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <div>
              <span className="text-gray-800 text-lg font-bold">
                Feathers Transfers
              </span>
              <div className="text-blue-600 text-xs">
                Your Destination | Our Dedication
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) =>
              item.dropdownItems ? (
                <div
                  key={item.name}
                  className="relative"
                  ref={(el) => {
                    dropdownRefs.current[item.name] = el;
                  }}
                >
                  <button
                    onClick={() => handleDropdownClick(item.name)} // ✅ Click toggle
                    className="text-gray-700 hover:text-blue-600 text-sm font-medium flex items-center transition-colors duration-200"
                  >
                    {item.name}
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
                  {openDropdown === item.name && (
                    <div className="absolute right-0 mt-1 w-56 bg-white shadow-lg rounded-md border border-gray-100 z-20 py-1">
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              )
            )}
          </div>


          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-blue-600 focus:outline-none transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-2 space-y-1 max-h-96 overflow-y-auto">
            {navItems.map((item) =>
              item.dropdownItems ? (
                <div key={item.name} className="border-b border-gray-100 last:border-b-0">
                  <button
                    onClick={() => handleDropdownClick(item.name)}
                    className="w-full text-left text-gray-700 font-medium py-3 flex justify-between items-center hover:text-blue-600 transition-colors duration-200"
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
                  {openDropdown === item.name && (
                    <div className="ml-4 pb-2 space-y-1">
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block text-sm text-gray-600 hover:text-blue-600 py-2 pl-2 hover:bg-gray-50 rounded transition-colors duration-150"
                          onClick={closeMobileMenu}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 hover:text-blue-600 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 px-2 rounded transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}