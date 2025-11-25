import React, { useState } from 'react';

const initialUserData = {
  name: 'Richardo Mathew',
  email: 'mail@gmail.com',
  oldPassword: '', 
  newPassword: '', 
  role: 'Admin',
  avatarUrl: '/Avatar (1).png'
};

const UserProfileForm = () => {

  const [formData, setFormData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);


    const updatePayload = {
      name: formData.name,
      email: formData.email,
    };
    
   
    if (formData.oldPassword && formData.newPassword) {
      updatePayload.oldPassword = formData.oldPassword;
      updatePayload.newPassword = formData.newPassword;
    }

    console.log('Saving changes:', updatePayload);

    setTimeout(() => {
      alert(`Profile updated for ${formData.name}!`);
      setIsSaving(false);
      setIsEditing(false); 
      setFormData(prevData => ({
          ...prevData,
          oldPassword: '',
          newPassword: '' 
      }));
    }, 1500);
  };


  const FormField = ({ label, name, type = 'text', value, placeholder, readOnly = false }) => (
    <div className="mb-4">
      <label className="block text-md font-medium text-gray-700 mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        className={`w-full p-3 border rounded-lg focus:outline-none transition-shadow ${
          readOnly 
            ? 'bg-gray-50 text-gray-600 cursor-default' 
            : 'bg-white focus:ring-2 focus:ring-orange-500 border-gray-300'
        }`}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        readOnly={readOnly}
      />
    </div>
  );


  return (
    <div className="w-full  mx-auto bg-white  rounded-xl p-6 border border-gray-100">
      
      {/* --- Header & Profile Info --- */}
      <div className="flex justify-between items-start mb-6 border-b pb-4">
        <div className="flex items-center">
          {/* Avatar */}
          <img 
            className="h-14 w-14 rounded-full object-cover mr-4" 
            src={formData.avatarUrl} 
            alt={formData.name}
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{formData.name}</h2>
            <p className="text-sm text-gray-500">{formData.role}</p>
          </div>
        </div>
        
        {/* Edit Button */}
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center text-gray-600 hover:text-orange-500 font-medium transition-colors p-2 rounded-full"
          aria-label={isEditing ? 'Cancel Edit' : 'Edit Profile'}
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
          </svg>
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* --- Personal Details Section --- */}
        <h3 className="text-lg font-bold text-gray-800 mb-3">Personal Details</h3>
        
        {/* Name Input */}
        <FormField
          label="Name"
          name="name"
          value={formData.name}
          placeholder="Enter your name"
          readOnly={!isEditing}
        />

        {/* Email Input */}
        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          placeholder="Enter your email"
          readOnly={!isEditing} 
        />

        {/* --- Update Password Section --- */}
        <h3 className="text-lg font-bold text-gray-800 mb-3 mt-6">Update Password</h3>
        
        {/* Old Password Input */}
        <FormField
          label="Old password"
          name="oldPassword"
          type="password"
          value={formData.oldPassword}
          placeholder="********"
        />

        {/* New Password Input */}
        <FormField
          label="New password"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          placeholder="********"
        />

        {/* --- Save Changes Button --- */}
        <button
          type="submit"
          className="w-full py-3 mt-6 text-white font-semibold bg-[#F89521] hover:bg-orange-600 rounded-lg shadow-md transition-colors disabled:opacity-50"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;