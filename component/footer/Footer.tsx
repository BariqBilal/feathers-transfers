import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

const quickLinks = [
  { name: 'Services', href: '/services' },
  { name: 'About Us', href: '/about' },
  { name: 'Book Now', href: '/book-now' },
  { name: 'Contact', href: '/contact' },
];

const contactInfo = [
  { icon: <Phone className="h-4 w-4 mr-2 text-blue-100" />, text: '+33-6-79-52-49-59' },
  { icon: <Mail className="h-4 w-4 mr-2 text-blue-100" />, text: 'transfers@splitting-feathers.com' },
  { icon: <MapPin className="h-4 w-4 mr-2 text-blue-100" />, text: 'La Plagne, France' },
];

const socialLinks = [
  { icon: <Facebook className="h-6 w-6" />, href: '/facebook' },
  { icon: <Twitter className="h-6 w-6" />, href: '/twitter' },
  { icon: <Instagram className="h-6 w-6" />, href: '/instagram' },
  { icon: <Linkedin className="h-6 w-6" />, href: '/linkedin' },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-10 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">Feathers Transfers</h3>
            <p className="text-sm text-blue-100">
              Your trusted transfer service in La Plagne, specializing in airport and train station transfers to all eleven resorts.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-100 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              {contactInfo.map((contact) => (
                <div key={contact.text} className="flex items-center">
                  {contact.icon}
                  <span className="text-sm text-blue-100">{contact.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link key={social.href} href={social.href} className="text-blue-100 hover:text-white">
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-blue-400 mt-8 pt-6 text-center">
          <p className="text-sm text-blue-100">
            &copy; 2024 Feathers Transfers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
