import React, { useState } from 'react';


const courseData = {
  title: "Academic Course: First Semester",
  price: "Tk. 6,000",

  image: "/dashboardImage/Rectangle 64.png", 
  stats: [
    { label: "Courses", value: 4 },
    { label: "Classes", value: 48 },
    { label: "Credit", value: 12 },
    { label: "Installment", value: 2 },
    { label: "Months", value: 4 },
  ],
  overview:
    "Master the fundamentals of your first semester with our comprehensive academic course. This curriculum is designed to build a strong foundation, covering all essential subjects through 48 dynamic classes and 12 credits. Enroll now to structure your learning and excel academically.",
  curriculum: [
    "Introduction to Data Structures",
    "Advanced Algorithms",
    "Database Management Systems",
    "Web Development Fundamentals",
    "Object-Oriented Programming (OOP)",
    "Calculus I",
    "Linear Algebra",
    "Discrete Mathematics",
    "Elective Subject A",
    "Elective Subject B",
  ],
  rating: 4.7,
  reviews: 637,
};


const StatBadge = ({ label, value }) => (
  <div className="flex items-center space-x-1 border border-gray-300 rounded-lg px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150">
    <span className="text-sm font-semibold">{value}</span>
    <span className="text-xs">{label}</span>
  </div>
);

// Component for the curriculum list items
const CurriculumItem = ({ item }) => (
  <div className="flex items-center text-gray-700 text-sm py-1 hover:bg-gray-50 rounded-md px-2 transition duration-150">
    {/* Disabled checkbox to simulate the static design */}
    <input
      type="checkbox"
      className="form-checkbox h-4 w-4 text-orange-500 border-gray-300 rounded mr-2 pointer-events-none opacity-50 focus:ring-0"
      defaultChecked
      disabled
    />
    <span>{item}</span>
  </div>
);


const CourseDetailsCard = ({ course = courseData }) => {
  // State to control the curriculum dropdown (dynamic feature)
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(true);

  // Separate stats into top row (first 3) and bottom row (last 2) for layout flexibility
  const topStats = course.stats.slice(0, 3);
  const bottomStats = course.stats.slice(3);

  return (
    // Max width to contain the card on the dashboard
    <div className=" mx-auto bg-white p-6  ">
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* --- Left Column (Content) --- */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            {course.title}
          </h1>
          <p className="text-xl font-bold mb-4">
            ({course.price})
          </p>

          {/* Stats Row 1 */}
          <div className="flex flex-wrap gap-2 mb-2">
            
            {topStats.map((stat, index) => (
              <StatBadge key={index} label={stat.label} value={stat.value} />
            ))}
          </div>

          {/* Stats Row 2 */}
          <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
            {bottomStats.map((stat, index) => (
              <StatBadge key={index} label={stat.label} value={stat.value} />
            ))}
          </div>

          {/* Course Overview */}
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Course Overview
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed text-justify text-sm">
            {course.overview}
          </p>

          {/* Course Curriculum (Dynamic Accordion) */}
          <div className="mb-8 border border-gray-200 rounded-xl overflow-hidden">
            <button
              className="flex justify-between items-center w-full p-4 text-lg font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 transition duration-150 focus:outline-none"
              onClick={() => setIsCurriculumOpen(!isCurriculumOpen)}
            >
              <span>Course Curriculum</span>
              {/* Chevron icon that rotates based on state */}
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${isCurriculumOpen ? 'rotate-180 text-[#F89521]' : 'rotate-0 text-gray-500'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            {isCurriculumOpen && (
              <div className="p-4 space-y-2 max-h-64 overflow-y-auto bg-white">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {course.curriculum.map((item, index) => (
                      <CurriculumItem key={index} item={item} />
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Enrollment and Rating */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-gray-100">
            <button className="w-full sm:w-auto px-10 py-3 bg-[#F89521] text-white font-bold rounded-xl transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
              Enroll Now
            </button>
            <div className="flex items-center mt-4 sm:mt-0">
              <span className="text-2xl font-bold text-gray-800 mr-2">
                {course.rating}
              </span>
              <span className="text-yellow-400 text-2xl mr-2">
                {/* Star Icon */}
                &#9733;
              </span>
              <span className="text-gray-500 font-medium">
                ({course.reviews} Reviews)
              </span>
            </div>
          </div>
        </div>

        {/* --- Right Column (Image) --- */}
        <div className="hidden md:block">
          <img
            src={course.image}
            alt={`${course.title} course image`}
            className="w-full  object-cover  shadow-inner border border-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsCard;