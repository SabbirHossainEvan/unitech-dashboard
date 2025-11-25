import React, { useState } from 'react';

// Define options for the dropdowns
const courseOptions = ['Academic', 'Professional', 'Certification'];
const semesterOptions = ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester'];
const installmentOptions = ['Full Fee', '#First installment', '#Second installment'];

const PaymentForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    userId: '',
    course: courseOptions[0],
    semester: '',
    installment: '',
    amount: '5000', // Default amount based on image
  });

  // State for form submission status or messages (optional but good practice)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log('Payment Data Submitted:', formData);
    
    // Simulate API call delay
    setTimeout(() => {
      alert(`Submitting Payment of Tk. ${formData.amount} for ${formData.name}`);
      setIsSubmitting(false);
      // You would typically call an API here: 
      // api.submitPayment(formData).then(res => handleSuccess()).catch(err => handleError());
    }, 1000);
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      name: '',
      userId: '',
      course: courseOptions[0],
      semester: '',
      installment: '',
      amount: '5000',
    });
    console.log('Form Reset');
  };

  // Component for a single form field (Input or Select)
  const FormField = ({ label, name, children, type = 'text', placeholder, value, readOnly = false }) => (
    <div className="mb-4">
      <label className="block text-lg font-medium text-gray-800 mb-1" htmlFor={name}>
        {label}
      </label>
      {children || (
        <input
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow ${readOnly ? 'bg-gray-100 text-gray-600' : 'bg-white'}`}
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          readOnly={readOnly}
        />
      )}
    </div>
  );

  return (
    <div className="w-full max-w-sm mx-auto bg-white shadow-xl rounded-xl p-6 border border-gray-100">
      
      {/* --- Header --- */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Payment</h2>
        {/* Mock icon for history/database */}
        <div className="text-gray-500">
            <svg className="w-6 h-6 inline-block mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <svg className="w-6 h-6 inline-block" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        
        {/* Name Input */}
        <FormField
          label="Name"
          name="name"
          placeholder="Username"
          value={formData.name}
        />

        {/* User ID Input */}
        <FormField
          label="User ID"
          name="userId"
          placeholder="Input user ID"
          value={formData.userId}
        />

        {/* Course Dropdown */}
        <FormField label="Course" name="course">
          <select
            className="w-full p-3 border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
            name="course"
            value={formData.course}
            onChange={handleChange}
          >
            {courseOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </FormField>

        {/* Semester Dropdown */}
        <FormField label="Semester" name="semester">
          <select
            className="w-full p-3 border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
          >
            <option value="" disabled>Select</option>
            {semesterOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </FormField>
        
        {/* Installment Dropdown */}
        <FormField label="Installment" name="installment">
          <select
            className="w-full p-3 border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
            name="installment"
            value={formData.installment}
            onChange={handleChange}
          >
            <option value="" disabled>Select</option>
            {installmentOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </FormField>

        {/* Amount Input (Read-only for demonstration, but dynamic in a real app) */}
        <FormField label="Amount" name="amount" readOnly={true}>
            <div className="relative">
                {/* Use readOnly input to mimic the "Tk. 5,000" display */}
                <input
                    className="w-full p-3 border rounded-lg bg-gray-100 text-gray-800 font-semibold focus:outline-none transition-shadow pr-10"
                    type="text"
                    name="amount"
                    value={`Tk. ${formData.amount.toLocaleString('en-IN')}`}
                    readOnly 
                />
            </div>
        </FormField>

        {/* --- Buttons --- */}
        <button
          type="submit"
          className="w-full py-3 mt-4 text-white font-semibold bg-orange-500 hover:bg-orange-600 rounded-lg shadow-md transition-colors disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Submit Payment'}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="w-full py-3 mt-3 flex items-center justify-center text-gray-700 font-semibold bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 0014.004 4h-2.24l.443.443M17.382 17.582A8.001 8.001 0 0110.004 20h2.24l-.443-.443"></path></svg>
          Reset
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;