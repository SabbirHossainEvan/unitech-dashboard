
import React, { useState } from 'react';

const FilterSearchSection = ({ onSearch, onReset }) => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ name, userId });
    }
  };

  const handleReset = () => {
    setName('');
    setUserId('');
    if (onReset) {
      onReset();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 ">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Filter Search</h3>

      {/* Name Input */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* User ID Input */}
      <div className="mb-6">
        <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
          User ID
        </label>
        <input
          type="text"
          id="userId"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400"
          placeholder="Input user ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full bg-[#F89521] text-white py-2 px-4 rounded-md text-base font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75 transition duration-150 ease-in-out mb-3"
      >
        Search
      </button>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="w-full bg-white text-gray-700 py-2 px-4 border border-gray-300 rounded-md text-base font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-75 transition duration-150 ease-in-out flex items-center justify-center space-x-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.9 6.401V10a1 1 0 01-2 0V3a1 1 0 011-1zm10 14a1 1 0 01-1-1v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 111.885-.666A5.002 5.002 0 0014.1 13.599V10a1 1 0 012 0v7a1 1 0 01-1 1z" clipRule="evenodd" />
        </svg>
        <span>Reset</span>
      </button>
    </div>
  );
};

export default FilterSearchSection;