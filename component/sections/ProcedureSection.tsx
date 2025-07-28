'use client';
import React from 'react';
import { FileText, Car, CheckCircle } from 'lucide-react'; // Importing icons from lucide-react

// Interface for a single step within the procedure
interface Step {
  icon: React.ReactNode; // Can be a Lucide icon component or any ReactNode
  stepTitle: string;
  description: string;
}

// Interface for the main ProcedureSection component props
interface ProcedureSectionProps {
  sectionTitle: string;
  steps: Step[]; // An array of steps, each step is an object with an icon, title, and description
}

const ProcedureSection: React.FC<ProcedureSectionProps> = ({ sectionTitle, steps }) => {
  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 rounded-xl font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center sm:text-left">
          {sectionTitle}
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start text-left transition-all duration-300 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="text-blue-600 mb-4">
                {step.icon}
              </div>

              {/* Step Title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {step.stepTitle}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcedureSection;
