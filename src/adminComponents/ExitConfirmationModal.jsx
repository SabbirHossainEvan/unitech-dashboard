import React from 'react';
import { Link } from 'react-router';


const ExitConfirmationModal = () => {


    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"

        >

            <div className="bg-gray-100 rounded-xl w-full max-w-xl mx-4 p-6 transition-all transform duration-300 scale-100">

                <div className="text-center">
                    <h3
                        className="text-lg font-semibold text-gray-900 mb-6"
                        id="modal-title"
                    >
                        Do you want to exit?
                    </h3>
                </div>

                <div className="flex justify-center space-x-3">
                    <Link to={"/admin"} className="w-full py-2 border border-gray-300 text-gray-700 font-semibold bg-white hover:bg-gray-50 rounded-lg transition-colors text-center">
                        <button
                            type="button"
                            
                        >
                            No
                        </button>
                    </Link>

                    <Link to={"/"} className="w-full py-2 text-white font-semibold bg-[#FF5C5C] hover:bg-red-600 rounded-lg transition-colors text-center">
                        <button
                            type="button"
                            
                        >
                            Yes
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default ExitConfirmationModal;

