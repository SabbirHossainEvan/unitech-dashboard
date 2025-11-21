// CourseCard.jsx
import React from 'react';
// আপনি যদি React Icons ব্যবহার করেন, তাহলে এখানে import করতে পারেন। 
// যেমন: import { FaBook, FaClock, FaCalendarAlt, FaStar, FaPencilAlt, FaUsers, FaSketch, FaFolderOpen, FaLaptopCode } from 'react-icons/fa';

// --- আইকন রেন্ডারিং লজিক (Placeholder Emojis ব্যবহার করা হয়েছে) ---
const getIcon = (iconType) => {
  switch (iconType) {
    case 'book': return <span className="mr-1 text-sm text-yellow-600">📚</span>; // Courses
    case 'class': return <span className="mr-1 text-sm text-blue-600">🧑‍🏫</span>; // Classes
    case 'time': return <span className="mr-1 text-sm text-green-600">⏳</span>; // Duration/Months
    case 'payment': return <span className="mr-1 text-sm text-purple-600">💰</span>; // Installment
    case 'sketch': return <span className="mr-1 text-sm text-red-600">✏️</span>; // Sketching
    case 'project': return <span className="mr-1 text-sm text-indigo-600">📂</span>; // Projects
    case 'software': return <span className="mr-1 text-sm text-teal-600">💻</span>; // Software name
    default: return null;
  }
};

const CourseCard = ({ course }) => {
  // নিশ্চিত করুন যে course propটি undefined নয়
  if (!course) {
    return null; 
  }
  
  const { title, imageUrl, price, details, reviews } = course;
  
  // reviews স্ট্রিংটিকে দুটি ভাগে ভাগ করা: "4.7 (637 Reviews)" -> [4.7, (637 Reviews)]
  const [rating, reviewCount] = reviews.split(' ');

  return (
    // Card Container: rounded-lg, subtle shadow, এবং hover-এর জন্য অ্যানিমেশন
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 
                    transform transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
      
      {/* --- Image and Edit Button --- */}
      <div className="relative h-36">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
        {/* Edit Button - বৃত্তাকার, সাদা ব্যাকগ্রাউন্ডে */}
        <button 
          className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full shadow-lg text-gray-700 hover:bg-white transition-colors"
          aria-label={`Edit ${title} course`}
        >
          {/* Placeholder for Edit Icon */}
          <span className="text-sm">📝 Edit</span> 
        </button>
      </div>

      {/* --- Course Content --- */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-800 mb-3">{title}</h3>
        
        {/* Course Details Grid */}
        {/* দুটি কলামে Details গুলো সাজানো */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 mb-3">
          {details.map((detail, index) => (
            <p key={index} className="flex items-center whitespace-nowrap">
              {getIcon(detail.icon)} 
              <span className="truncate">{detail.text}</span>
            </p>
          ))}
        </div>
        
        {/* Price & Reviews Section */}
        {/* প্রাইস এবং রিভিউ লাইন একটি বর্ডার দ্বারা বিভক্ত */}
        <div className="border-t border-gray-100 pt-3 flex justify-between items-center mb-4">
          <div className="flex items-baseline space-x-1">
            <span className="text-xl font-extrabold text-black">Tk.</span>
            <span className="text-xl font-extrabold text-red-600">{price}</span>
          </div>
          <p className="text-xs text-yellow-600 font-medium flex items-center">
            <span className="text-base mr-1">⭐</span> {rating} 
            <span className="text-gray-500 ml-1">({reviewCount})</span>
          </p>
        </div>
        
        {/* Enroll Button */}
        <button className="w-full bg-orange-500 text-white font-bold py-2 rounded-md 
                           hover:bg-orange-600 transition-colors duration-200 shadow-lg 
                           text-sm uppercase tracking-wider">
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;