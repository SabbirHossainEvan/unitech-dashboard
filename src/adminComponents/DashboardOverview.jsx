import React, { useState, useEffect } from 'react';

const CountUp = ({ end, duration = 2.75, formattingFn, label }) => {
    const [count, setCount] = useState(0); 
    const start = 0; 

    useEffect(() => {
        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            
            const progress = Math.min(elapsed / (duration * 1000), 1);
            
            const currentValue = start + (end - start) * progress;
            setCount(Math.floor(currentValue));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {

                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]); 

    const displayValue = formattingFn(count, label);

    return <span className="block">{displayValue}</span>;
};


const MetricCard = ({ label, rawValue, change, isPositive, bgColor }) => {
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const trendIcon = isPositive ? '▲' : '▼'; 


  const formatValue = (value, currentLabel) => {
    if (currentLabel === 'Impressions' || currentLabel === 'Visitors' || currentLabel === 'Total Users' || currentLabel === 'Engaged') {
      if (value >= 1000) {
          return (value / 1000).toFixed(1) + 'k';
      }
    }

    return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  return (
    <div className={`p-6 rounded-xl ${bgColor} hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 min-w-full lg:min-w-[200px] flex flex-col justify-between`}>
      
      <p className="text-gray-600 text-sm mb-2 font-medium">{label}</p>
      

      <div className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
        <CountUp 
          end={rawValue} 
          duration={2.0} 
          formattingFn={formatValue}
          label={label}
        />
      </div>
      
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
    rawValue: 7900, 
    change: '+11.02%', 
    isPositive: true, 
    bgColor: 'bg-[#35BD9526]' 
  },
  { 
    id: 2, 
    label: 'Visitors', 
    value: '2.3k', 
    rawValue: 2300, 
    change: '-0.03%', 
    isPositive: false, 
    bgColor: 'bg-[#CFD0D0CC]' 
  },
  { 
    id: 3, 
    label: 'Engaged', 
    value: '1.5k', 
    rawValue: 1500, 
    change: '+15.03%', 
    isPositive: true, 
    bgColor: 'bg-[#FEF4E9]' 
  },
  { 
    id: 4, 
    label: 'Enrolled', 
    value: '375', 
    rawValue: 375, 
    change: '+6.08%', 
    isPositive: true, 
    bgColor: 'bg-[#D7F2EA]' 
  },
  { 
    id: 5, 
    label: 'Total Users', 
    value: '17k', 
    rawValue: 17000, 
    change: '+6.08%', 
    isPositive: true, 
    bgColor: 'bg-[#CFD0D0]' 
  },
];

const DashboardOverview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');


  const gridClasses = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6';

  return (
    <div className=" p-4 md:p-2 font-sans">
      <section className="p-4 sm:p-6 bg-gray-100 rounded-xl mx-auto w-full">
        
        {/* Header and Dropdown */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6  pb-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 sm:mb-0">Analytics Overview</h2>
          
          {/* Simple Tailwind/React Dropdown Mockup */}
          <div className="relative w-full sm:w-auto">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="py-2 pl-4 pr-10 border border-gray-300 rounded-lg text-sm font-medium appearance-none bg-white focus:outline-none focus:ring-orange-300 w-full"
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