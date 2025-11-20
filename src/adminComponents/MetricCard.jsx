import React from 'react';
import CountUp from 'react-countup'; // Import the library

const MetricCard = ({ label, value, rawValue, change, isPositive, bgColor }) => {
  // ... (rest of the component)

  return (
    <div className={`p-6 rounded-xl shadow-md ${bgColor} hover:shadow-lg transition duration-300 transform hover:-translate-y-1 min-w-[180px] flex-1`}>
      <p className="text-gray-600 text-sm mb-1">{label}</p>
      
      <p className="text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
         {/* The animated number */}
         <CountUp 
             start={0}
             end={rawValue} // The actual number (e.g., 7900)
             duration={2.75} // Animation speed in seconds
             separator=","
             suffix={label === 'Total Users' || label === 'Visitors' || label === 'Impressions' ? 'k' : ''} // Add 'k' suffix for large numbers
             decimals={label === 'Total Users' || label === 'Visitors' || label === 'Impressions' ? 1 : 0} // Show one decimal for 'k' values
             formattingFn={(value) => {
                 // Custom formatting to handle the 'k' display properly
                 if (label === 'Impressions' || label === 'Visitors' || label === 'Total Users') {
                     return (value / 1000).toFixed(1) + 'k';
                 }
                 return value.toString();
             }}
         />
      </p>
      
      {/* ... (rest of the component) */}
    </div>
  );
};

export default MetricCard;