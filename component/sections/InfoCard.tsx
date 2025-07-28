'use client';
import React from 'react';
// Removed Image import as it's not needed without imageUrl

interface InfoCardProps {
  title: string;
  description?: string;
  items?: string[];
  noticeTitle?: string;
  noticeContent?: string;
  icon?: React.ReactNode;
  // Removed imageUrl and imageAlt props
}

const InfoCard: React.FC<InfoCardProps> = ({ 
  title, 
  description, 
  items, 
  noticeTitle, 
  noticeContent, 
  icon
  // Removed imageUrl and imageAlt from destructuring
}) => {
  return (
    <div className="bg-blue-50 rounded-xl p-6 flex items-start space-x-4"> {/* Adjusted background and padding */}
      {icon && (
        <div className="text-blue-600 flex-shrink-0"> {/* Icon styling */}
          {icon}
        </div>
      )}
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2> {/* Adjusted margin-bottom */}
        {description && <p className="text-gray-600 text-sm leading-relaxed">{description}</p>} {/* Adjusted text size and line height */}
        {items && items.length > 0 && (
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1 text-sm"> {/* Adjusted margin-top and text size */}
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
        {noticeTitle && noticeContent && (
          <div className="bg-blue-100 rounded-lg p-3 text-blue-800 text-sm mt-4"> {/* Adjusted background and padding */}
            <h3 className="font-semibold mb-1">{noticeTitle}</h3>
            <p>{noticeContent}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCard;