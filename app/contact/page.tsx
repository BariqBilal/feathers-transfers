'use client';
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Plane, Users, Calendar, Info } from 'lucide-react';
import axios from 'axios';
import HeroSection2 from '@/component/sections/HeroSection2';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post(
        'https://devsquare-apis.vercel.app/api/transfers/contact',
        formData
      );

      if (response.status === 200) {
        setSubmitStatus({
          success: true,
          message: 'Your message has been sent successfully!'
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          success: false,
          message: 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <HeroSection2
        height="50vh" 
        bgImage="/contact.jpg"
        title="Contact Us for Your Transfer Needs"
        description="Specialized in La Plagne and Savoie Region Transfers"
      />
      <section className="bg-[#F1F6FF] py-16 px-4">
                    <h2 className="text-3xl font-bold text-gray-800 text-center ">Get in Touch</h2>

        <div className="max-w-7xl mx-auto rounded-p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Get in Touch / Send us a message */}
          <div className="lg:col-span-1 bg-white p-4">
            <div className="p-6 rounded-md">
              <h3 className="text-xl font-medium text-gray-700 mb-5">Send us a message</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                    required
                  />
                </div>
                <div className="mb-6">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                    required
                  ></textarea>
                </div>
                {submitStatus && (
                  <div className={`mb-4 p-3 rounded-md ${submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {submitStatus.message}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* Information We Need & Contact Information */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Information We Need */}
            <div className="bg-white p-6 rounded-md">
              <h3 className="text-xl font-medium text-gray-700 mb-5">Information We Need</h3>
              <ul className="space-y-3.5 text-gray-700 text-base">
                <li className="flex items-start">
                  <Plane className="w-5 h-5 mr-3 text-blue-500 mt-0.5" />
                  Arrival & Departure Airport
                </li>
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-blue-500 mt-0.5" />
                  Resort/Location within La Plagne
                </li>
                <li className="flex items-start">
                  <Calendar className="w-5 h-5 mr-3 text-blue-500 mt-0.5" />
                  Flight Arrival/Departure Dates and Times
                </li>
                <li className="flex items-start">
                  <Users className="w-5 h-5 mr-3 text-blue-500 mt-0.5" />
                  Number of Passengers
                </li>
                <li className="flex items-start">
                  <Info className="w-5 h-5 mr-3 text-blue-500 mt-0.5" />
                  Special Requirements (baby seats, skis, etc.)
                </li>
              </ul>
            </div>

            {/* Contact Information */}
          <div className="bg-[#F1F6FF] p-6 rounded-md">
  <h3 className="text-xl font-medium text-gray-700 mb-5">Contact Information</h3>
  <ul className="space-y-4 text-gray-700 text-base">
    <li className="flex items-start">
      <Phone className="w-6 h-6 mr-3 text-blue-500 flex-shrink-0 mt-0.5" />
      <div className="space-y-2">
        <span className="font-semibold text-gray-800">Phone</span>
        <div className="flex flex-col space-y-2">
          <a href="tel:+33679524959" className="flex items-center text-gray-700 hover:text-blue-600">
            <Phone className="h-4 w-4 mr-2 text-blue-500" />
            Tim: +33 6 79 52 49 59
          </a>
          <a href="tel:+33620909025" className="flex items-center text-gray-700 hover:text-blue-600">
            <Phone className="h-4 w-4 mr-2 text-blue-500" />
            Anna: +33 6 20 90 90 25
          </a>
        </div>
      </div>
    </li>
    <li className="flex items-start">
      <Mail className="w-6 h-6 mr-3 text-blue-500 flex-shrink-0 mt-0.5" />
      <div>
        <span className="font-semibold text-gray-800">Email</span>
        <p className="text-blue-600 hover:underline">
          <a href="mailto:info@featherstransfers.com">info@featherstransfers.com</a>
        </p>
      </div>
    </li>
    <li className="flex items-start">
      <MapPin className="w-6 h-6 mr-3 text-blue-500 flex-shrink-0 mt-0.5" />
      <div>
        <span className="font-semibold text-gray-800">Location</span>
        <p className="text-gray-700">La Plagne Bellecote, Savoie, France</p>
      </div>
    </li>
  </ul>
</div>
          </div>

          {/* Traveling to other Savoie resorts? */}
          <div className="lg:col-span-3 mt-8 bg-white p-6 border border-gray-100 flex items-start">
            <MapPin className="w-8 h-8 mr-4 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Traveling to other Savoie resorts?</h3>
              <p className="text-gray-700 mb-2 text-base">
                We are more than happy to quote for other resorts in the Savoie region of France. To get a tailored quote to a resort other than that of La Plagne, please send an email to:
              </p>
              <p className="text-blue-600 font-medium hover:underline">
                <a href="mailto:transfers@splitting-feathers.com">transfers@splitting-feathers.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;