// CourseSection.jsx
import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard';

const CourseSection = () => {
    // state to hold the fetched data
    const [coursesData, setCoursesData] = useState({ academic: [], lifeSkill: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                console.log("Attempting to fetch data from: /coursesData.json");

                // Fetching data from the public folder's root
                const response = await fetch('/coursesData.json');

                if (!response.ok) {
                    console.error(`Fetch failed with HTTP status: ${response.status}`);
                    throw new Error(`HTTP error! status: ${response.status}. Please check file path.`);
                }

                const data = await response.json();
                setCoursesData(data);
                console.log("Courses data loaded successfully.");
            } catch (e) {
                // নেটওয়ার্ক বা JSON পার্সিং ত্রুটি
                console.error("Failed to fetch/parse courses data:", e);
                setError(`Failed to load courses data. Check JSON syntax or file path: ${e.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []); // Runs once on mount

    // --- Loading and Error States ---
    if (loading) {
        return <div className="p-6 text-center text-lg font-semibold text-blue-600">Loading courses...</div>;
    }

    if (error) {
        return (
            <div className="p-6 text-center text-red-600 font-bold">
                🛑 Error: {error}
                <p className="text-sm text-gray-600 mt-2 font-normal">Possible fixes: 1. Ensure 'coursesData.json' is in the **public** folder. 2. Verify server is running.</p>
            </div>
        );
    }

    // Destructure data for easy access
    const { academic, lifeSkill } = coursesData;

    return (
        <div className="p-6  min-h-screen">

            <div className="flex  mb-6 justify-between">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Academic Courses</h2>
                <button className="flex items-center font-bold border text-lg text-gray-600 py-2 px-4 rounded-lg ">
                    <span className="mr-1 text-lg font-bold">+</span>
                    Create New Course
                </button>
            </div>



            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {academic && academic.length > 0 ? (
                    academic.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))
                ) : (
                    <p className="col-span-4 text-gray-500">No academic courses available.</p>
                )}
            </div>


            <h2 className="text-2xl font-bold text-gray-700 mb-4">Life Skill Development Courses</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {lifeSkill && lifeSkill.length > 0 ? (
                    lifeSkill.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))
                ) : (
                    <p className="col-span-4 text-gray-500">No life skill courses available.</p>
                )}
            </div>
        </div>
    );
};

export default CourseSection;