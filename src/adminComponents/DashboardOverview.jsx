import React, { useState, useEffect } from 'react';

const CountUp = ({ end, duration = 2.75, formattingFn, label }) => {
    // State to hold the current displayed value during the animation
    const [count, setCount] = useState(0); 
    const start = 0; // Animation always starts from 0

    useEffect(() => {
        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            
            // Calculate progress (0 to 1)
            const progress = Math.min(elapsed / (duration * 1000), 1);
            
            const currentValue = start + (end - start) * progress;
            
            // Update state with the new value
            setCount(Math.floor(currentValue));

            if (progress < 1) {
                // Continue the animation
                animationFrame = requestAnimationFrame(animate);
            } else {
                // Ensure the final, exact target value is displayed
                setCount(end);
            }
        };

        // Start the animation
        animationFrame = requestAnimationFrame(animate);

        // Cleanup function to stop the animation if the component unmounts
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]); // Reruns if the target 'end' value changes

    // Formatting is applied to the continuously updating 'count' state
    const displayValue = formattingFn(count, label);

    return <span className="block">{displayValue}</span>;
};

// --- END CountUp Component ---


// --- START MetricCard Component Definition ---

const MetricCard = ({ label, rawValue, change, isPositive, bgColor }) => {
  // Determine text color and icon based on the change
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const trendIcon = isPositive ? '▲' : '▼'; // Unicode arrow icons

  // Custom formatting logic applied to the animated value
  const formatValue = (value, currentLabel) => {
    if (currentLabel === 'Impressions' || currentLabel === 'Visitors' || currentLabel === 'Total Users' || currentLabel === 'Engaged') {
      // Convert to 'k' format and round to one decimal for numbers >= 1000
      if (value >= 1000) {
          return (value / 1000).toFixed(1) + 'k';
      }
    }
    // For smaller numbers (like Enrolled) or numbers less than 1000, return the integer
    return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  return (
    <div className={`p-6 rounded-xl ${bgColor} hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 min-w-full lg:min-w-[200px] flex flex-col justify-between`}>
      
      <p className="text-gray-600 text-sm mb-2 font-medium">{label}</p>
      
      {/* Metric Value - Now animated */}
      <div className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
        <CountUp 
          end={rawValue} 
          duration={2.0} // Using 2.0s for a slightly faster animation
          formattingFn={formatValue}
          label={label}
        />
      </div>
      
      {/* Percentage Change and Icon */}
      <div className={`flex items-center text-sm font-semibold ${changeColor}`}>
        {change}
        <span className={`ml-1 text-base ${changeColor}`}>{trendIcon}</span>
        <span className="text-gray-500 text-xs ml-2">vs. last month</span>
      </div>
    </div>
  );
};

const metricsData = [
  { 
    id: 1, 
    label: 'Impressions', 
    value: '7.9k', 
    rawValue: 7900, // Target for CountUp
    change: '+11.02%', 
    isPositive: true, 
    bgColor: 'bg-green-100/70' 
  },
  { 
    id: 2, 
    label: 'Visitors', 
    value: '2.3k', 
    rawValue: 2300, 
    change: '-0.03%', 
    isPositive: false, 
    bgColor: 'bg-gray-100/70' 
  },
  { 
    id: 3, 
    label: 'Engaged', 
    value: '1.5k', 
    rawValue: 1500, 
    change: '+15.03%', 
    isPositive: true, 
    bgColor: 'bg-orange-100/70' 
  },
  { 
    id: 4, 
    label: 'Enrolled', 
    value: '375', 
    rawValue: 375, 
    change: '+6.08%', 
    isPositive: true, 
    bgColor: 'bg-blue-100/70' 
  },
  { 
    id: 5, 
    label: 'Total Users', 
    value: '17k', 
    rawValue: 17000, 
    change: '+6.08%', 
    isPositive: true, 
    bgColor: 'bg-purple-100/70' 
  },
];

const DashboardOverview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  // Define responsive grid layout
  const gridClasses = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6';

  return (
    <div className=" p-4 md:p-8 font-sans">
      <section className="p-4 sm:p-6 bg-gray-100 rounded-xl mx-auto max-w-7xl">
        
        {/* Header and Dropdown */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 sm:mb-0">Analytics Overview</h2>
          
          {/* Simple Tailwind/React Dropdown Mockup */}
          <div className="relative w-full sm:w-auto">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="py-2 pl-4 pr-10 border border-gray-300 rounded-lg text-sm font-medium appearance-none bg-white shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
            >
              <option value="monthly">Monthly statistics</option>
              <option value="weekly">Weekly statistics</option>
              <option value="quarterly">Quarterly statistics</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </header>

        {/* Metrics Grid */}
        <div className={gridClasses}>
          {metricsData.map((metric) => (
            <MetricCard
              key={metric.id}
              label={metric.label}
              rawValue={metric.rawValue}
              change={metric.change}
              isPositive={metric.isPositive}
              bgColor={metric.bgColor}
            />
          ))}
        </div>
        
      </section>
    </div>
  );
};

export default DashboardOverview;