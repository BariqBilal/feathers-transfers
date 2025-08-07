'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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
                  onMouseEnter={() => setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className="text-gray-700 hover:text-blue-600 text-sm font-medium flex items-center"
                  >
                    {item.name}
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        openDropdown === item.name ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openDropdown === item.name && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-20">
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                  className="text-gray-700 hover:text-blue-600 text-sm font-medium"
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
              className="p-2 text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          {navItems.map((item) =>
            item.dropdownItems ? (
              <div key={item.name} className="mb-2">
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === item.name ? null : item.name)
                  }
                  className="w-full text-left text-gray-700 font-medium py-2 flex justify-between items-center"
                >
                  {item.name}
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-200 ${
                      openDropdown === item.name ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openDropdown === item.name && (
                  <div className="ml-4 space-y-1">
                    {item.dropdownItems.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block text-sm text-gray-600 hover:text-blue-600 py-1"
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
                className="block text-gray-700 hover:text-blue-600 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
}
