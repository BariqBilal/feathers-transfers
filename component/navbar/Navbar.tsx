'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Book Now', href: '/book-now' },
     { name: 'La Plagne', href: '/la-plagne' },
    {
      name: 'Airports we serve',
      href: '',
      dropdownItems: [
        { name: 'Geneva Airport', href: '/airport-geneva' },
        { name: 'Chambery Airport', href: '/chambery-airport' },
        { name: 'Grenoble Alpes-Isère Airport', href: '/grenoble-airport' },
        { name: 'Lyon Saint-Exupéry Airport', href: '/lyon-airport' },
      ],
    },
    { name: 'Transfer Advice', href: '/transfer-advice' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown && dropdownRefs.current[openDropdown]) {
        if (!dropdownRefs.current[openDropdown]?.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  // Close dropdown when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setOpenDropdown(null);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="bg-white shadow-sm font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-gray-800 text-xl font-bold">
                Feathers Transfers
              </span>
              <span className="text-blue-600 text-xs mt-[-2px]">
                Your Destination | Our Dedication
              </span>
            </div>
            <Image
              src="/Logo.png"
              alt="Feathers Transfers Logo"
              width={80}
              height={80}
              className="mr-2 hidden md:block"
            />
          </div>

          <div className="hidden md:block z-50">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) =>
                item.dropdownItems ? (
                  <div 
                    key={item.name}
                    className="relative"
                    ref={(el: any) => (dropdownRefs.current[item.name] = el)}
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenDropdown(openDropdown === item.name ? null : item.name);
                      }}
                      className="text-textprimary hover:text-primary px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      {item.name}
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${
                          openDropdown === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openDropdown === item.name && (
                      <div className="absolute right-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-textprimary hover:bg-gray-100 hover:text-primary"
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
                    className="text-textprimary hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) =>
              item.dropdownItems ? (
                <div key={item.name} className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                    className="block w-full text-left text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium flex items-center justify-between"
                  >
                    {item.name}
                    <ChevronDown
                      className={`ml-1 h-5 w-5 transform transition-transform duration-200 ${
                        openDropdown === item.name ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openDropdown === item.name && (
                    <div className="pl-6 pr-2 pt-1 pb-1 space-y-1">
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                          onClick={() => {
                            setOpenDropdown(null);
                            setIsMobileMenuOpen(false);
                          }}
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
                  className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
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