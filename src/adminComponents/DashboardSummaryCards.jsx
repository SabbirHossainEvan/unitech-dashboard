import React, { useEffect, useRef, useState } from 'react';


const CircularProgressCard = ({
  percentage,
  title,
  subtitle,
  progressColor, 
  trackColor = 'text-gray-200',
  textColor = 'text-gray-800',
  animationDuration = 1000, 
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const circumference = 2 * Math.PI * 40; 

  useEffect(() => {
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / animationDuration, 1);
      setAnimatedPercentage(Math.floor(progress * percentage));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [percentage, animationDuration]);

  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      {/* Background track circle */}
      <svg className="w-full h-full absolute" viewBox="0 0 100 100">
        <circle
          className={trackColor}
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
        />
      </svg>

      {/* Progress arc */}
      <svg className="w-full h-full absolute transform -rotate-90" viewBox="0 0 100 100">
        <circle
          className={progressColor}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
          style={{ transition: `stroke-dashoffset ${animationDuration}ms ease-out` }}
        />
      </svg>

      {/* Percentage text */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className={`text-4xl font-bold ${textColor}`}>
          {animatedPercentage}%
        </span>
        <span className="text-sm font-medium text-gray-600 mt-1">{title}</span>
      </div>
    </div>
  );
};



const DashboardSummaryCards = () => {
  const attendanceData = { percentage: 40, message: 'Very poor average attendance' };
  const paymentData = { percentage: 100, message: 'No due remains' };
  const resultData = { percentage: 60, message: 'Average result' };

  return (
    <div className="grid grid-cols-1  gap-6 p-6 bg-gray-50 rounded-lg shadow-inner">
      {/* Attendance Card */}
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
        <CircularProgressCard
          percentage={attendanceData.percentage}
          title="Attendance"
          progressColor="text-red-500"
          textColor="text-gray-800"
        />
        <p className="mt-4 text-red-500 font-medium text-lg">
          {attendanceData.message}
        </p>
      </div>

      {/* Payment Card */}
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
        <CircularProgressCard
          percentage={paymentData.percentage}
          title="Payment"
          progressColor="text-green-500"
          textColor="text-gray-800"
        />
        <p className="mt-4 text-green-700 font-medium text-lg">
          {paymentData.message}
        </p>
      </div>

      {/* Result Card */}
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
        <CircularProgressCard
          percentage={resultData.percentage}
          title="Result" 
          progressColor="text-orange-500"
          textColor="text-gray-800"
        />
        <p className="mt-4 text-gray-700 font-medium text-lg">
          {resultData.message}
        </p>
      </div>
    </div>
  );
};

export default DashboardSummaryCards;