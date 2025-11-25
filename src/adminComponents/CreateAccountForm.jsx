import React, { useState } from 'react';


const roleOptions = ['Admin', 'Editor', 'Viewer', 'Instructor', 'Student'];

const CreateAccountForm = () => {
  // State to manage all form inputs
  const [formData, setFormData] = useState({
    name: '',
    idNo: '',
    role: '', 
    email: '',
    oldPassword: '', 
    newPassword: '', 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle changes for all input fields
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

    // Basic validation (e.g., check if passwords match)
    if (formData.oldPassword !== formData.newPassword) {
      alert('New password and confirm password do not match!');
      setIsSubmitting(false);
      return;
    }

    console.log('Account creation data:', formData);

    // Simulate API call delay for account creation
    setTimeout(() => {
      alert(`Account created successfully for ${formData.name}!`);
      setIsSubmitting(false);
      // Clear form after successful submission
      setFormData({
        name: '',
        idNo: '',
        role: '',
        email: '',
        oldPassword: '',
        newPassword: '',
      });
    }, 1500);
  };

  // Reusable component for form fields (Input or Select)
  const FormField = ({ label, name, children, type = 'text', value, placeholder, isOptional = false }) => (
    <div className="mb-4">
      <label className="block text-md font-medium text-gray-700 mb-1" htmlFor={name}>
        {label} {isOptional && <span className="text-gray-500 text-sm">(optional)</span>}
      </label>
      {children || ( 
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      )}
    </div>
  );

  return (
    <div className="w-full  mx-auto bg-white shadow-xl rounded-xl p-6 border border-gray-100">
      
      {/* --- Header --- */}
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
        Create Account
      </h2>

      <form onSubmit={handleSubmit}>
        
        {/* --- Personal Details Section --- */}
        <h3 className="text-lg font-bold text-gray-800 mb-3">Personal Details</h3>
        
        {/* Name Input */}
        <FormField
          label="Name"
          name="name"
          value={formData.name}
          placeholder="Richardo Mathew"
          // Required validation could be added here
        />

        {/* ID No. Input */}
        <FormField
          label="ID No."
          name="idNo"
          value={formData.idNo}
          placeholder="Richardo Mathew" 
        />

        {/* Role Dropdown */}
        <FormField label="Role" name="role">
          <select
            className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
            name="role"
            value={formData.role}
            onChange={handleChange}
            // Required validation could be added here
          >
            <option value="" disabled>Select a role</option>
            {roleOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </FormField>

        {/* Email Input */}
        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          placeholder="mail@gmail.com"
          isOptional={true} 
        />

        {/* --- Create Password Section --- */}
        <h3 className="text-lg font-bold text-gray-800 mb-3 mt-6">Create Password</h3>
        
        {/* Password Input */}
        <FormField
          label="Password" 
          name="oldPassword"
          type="password"
          value={formData.oldPassword}
          placeholder="********"
        />

        {/* Confirm Password Input */}
        <FormField
          label="Confirm password" 
          name="newPassword" 
          type="password"
          value={formData.newPassword}
          placeholder="********"
        />

        {/* --- Submit Button --- */}
        <button
          type="submit"
          className="w-full py-3 mt-6 text-white font-semibold bg-orange-500 hover:bg-orange-600 rounded-lg shadow-md transition-colors disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default CreateAccountForm;