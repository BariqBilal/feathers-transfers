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
  { 
    icon: <Phone className="h-4 w-4 mr-2 text-blue-100" />, 
    text: 'Tim: +33 6 79 52 49 59',
    href: 'tel:+33679524959'
  },
  { 
    icon: <Phone className="h-4 w-4 mr-2 text-blue-100" />, 
    text: 'Anna: +33 6 20 90 90 25',
    href: 'tel:+33620909025'
  },
  { 
    icon: <Mail className="h-4 w-4 mr-2 text-blue-100" />, 
    text: 'transfers@spitting-feathers.com',
    href: 'mailto:transfers@spitting-feathers.com'
  },
  { 
    icon: <MapPin className="h-4 w-4 mr-2 text-blue-100" />, 
    text: 'Feathers Transfers, Plagne Bellecote, 73210 La Plagne Tarentaise, France'
  },
];

const socialLinks = [
  { 
    icon: <Facebook className="h-6 w-6" />, 
    href: 'https://www.facebook.com/featherstransfers',
    name: 'Facebook'
  },
  { 
    icon: <Twitter className="h-6 w-6" />, 
    href: 'https://www.x.com/featherstrans',
    name: 'Twitter'
  },
  { 
    icon: <Instagram className="h-6 w-6" />, 
    href: 'https://www.instagram.com/featherstransfers',
    name: 'Instagram'
  },
 
];

const airportInfo = [
  'Lyon Airport (LYS)',
  'Geneva Airport (GVA)',
  'Grenoble Airport (GNB)',
  'Chambery Airport (CMF)'
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-10 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">Feathers Transfers</h3>
            <p className="text-sm text-blue-100 mb-4">
              Your trusted transfer service in La Plagne, specializing in airport and train station transfers to all eleven resorts.
            </p>
            <p className="text-sm text-blue-100">
              Operating during winter ski season (December to April) from the third largest ski resort in the world.
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
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-start">
                  {contact.icon}
                  {contact.href ? (
                    <a href={contact.href} className="text-sm text-blue-100 hover:text-white">
                      {contact.text}
                    </a>
                  ) : (
                    <span className="text-sm text-blue-100">{contact.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  className="text-blue-100 hover:text-white"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            <h4 className="text-md font-semibold mb-2">Serving Airports:</h4>
            <ul className="text-sm text-blue-100 space-y-1">
              {airportInfo.map((airport, index) => (
                <li key={index}>{airport}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-400 mt-8 pt-6 text-center">
          <p className="text-sm text-blue-100">
            &copy; {new Date().getFullYear()} Feathers Transfers. All rights reserved.
          </p>
          <p className="text-xs text-blue-200 mt-1">
            Specializing in winter transfers with two dedicated vehicles serving La Plagne and surrounding areas.
          </p>
        </div>
      </div>
    </footer>
  );
}