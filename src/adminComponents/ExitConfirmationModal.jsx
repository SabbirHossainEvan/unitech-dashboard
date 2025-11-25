import React from 'react';


const ExitConfirmationModal = () => {


  return (
    // --- 1. Modal Overlay (Darkens the background) ---
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      
    >

      {/* --- 2. Modal Content Box --- */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 p-6 transition-all transform duration-300 scale-100">

        {/* Modal Title/Prompt */}
        <div className="text-center">
          <h3 
            className="text-lg font-semibold text-gray-900 mb-6" 
            id="modal-title"
          >
            Do you want to exit?
          </h3>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-3">

          {/* No Button (Cancel/Close) */}
          <button
            type="button"

            className="w-full py-2 border border-gray-300 text-gray-700 font-semibold bg-white hover:bg-gray-50 rounded-lg transition-colors shadow-sm"
          >
            No
          </button>

          {/* Yes Button (Confirm) */}
          <button
            type="button"

            className="w-full py-2 text-white font-semibold bg-red-500 hover:bg-red-600 rounded-lg transition-colors shadow-md"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitConfirmationModal;

