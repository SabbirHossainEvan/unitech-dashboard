import React, { useState } from 'react';

// --- 1. Example Data Structure (Updated with 'url' for download) ---
const initialAnnouncements = [
    {
        id: 1,
        author: 'Olivia Rhye',
        role: 'Mechanical Instructor',
        avatarUrl: '/path/to/olivia-avatar.png', // Replace with actual URL
        content: 'Hey dear students, hope you are doing well, here is your class lesson',
        file: {
            name: 'Tech requirements.pdf',
            size: '200 KB',
            url: '/files/tech_requirements.pdf' // <-- Added a mock download URL
        },
        date: '02 January, 2024',
        time: '10 am',
    },
    {
        id: 2,
        author: 'Olivia Rhye',
        role: 'Mechanical Instructor',
        avatarUrl: '/path/to/olivia-avatar.png',
        content: 'The due date for the first assignment has been extended by one week. Please check the updated syllabus.',
        file: null, // Example of a post without a file
        date: '25 November, 2023',
        time: '4 pm',
    },
];

// --- 2. Post Creation Form Component ---
const AnnouncementForm = ({ onPost }) => {
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [isPosting, setIsPosting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsPosting(true);

        const newPost = {
            id: Date.now(), // Unique ID
            author: 'Current User', // Replace with actual user name
            role: 'Admin/Teacher', // Replace with actual user role
            avatarUrl: '/path/to/user-avatar.png',
            content: content.trim(),
            // Ensure new posts also include a mock URL if a file is attached
            file: file ? {
                name: file.name,
                size: `${(file.size / 1024).toFixed(0)} KB`,
                url: '/files/uploaded-' + file.name
            } : null,
            date: new Date().toLocaleDateString('en-GB'),
            time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        };

        // Simulate API delay
        setTimeout(() => {
            onPost(newPost);
            setContent('');
            setFile(null);
            setIsPosting(false);
        }, 500);
    };

    return (
        <div className="bg-white p-6 mb-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                Post an announcement
            </h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow resize-none"
                    rows="3"
                    placeholder="Start writing"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                {/* Rich Text Toolbar Mockup */}
                <div className="flex items-center justify-between py-2 border-b border-gray-200 mb-4">
                    <div className="text-gray-500 space-x-2 text-xl flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M19.6 14.79C20.57 14.12 21.25 13.02 21.25 12C21.25 9.74 19.5 8 17.25 8H11V22H18.04C20.13 22 21.75 20.3 21.75 18.21C21.75 16.69 20.89 15.39 19.6 14.79ZM14 10.5H17C17.83 10.5 18.5 11.17 18.5 12C18.5 12.83 17.83 13.5 17 13.5H14V10.5ZM17.5 19.5H14V16.5H17.5C18.33 16.5 19 17.17 19 18C19 18.83 18.33 19.5 17.5 19.5Z" fill="#98A2B3" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M14 8V11H16.21L12.79 19H10V22H18V19H15.79L19.21 11H22V8H14Z" fill="#98A2B3" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M14 8V11H16.21L12.79 19H10V22H18V19H15.79L19.21 11H22V8H14Z" fill="#98A2B3" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M20.748 22H18.0215V17.25H13.9824V22H11.2402V10.625H13.9824V15.1406H18.0215V10.625H20.748V22Z" fill="#98A2B3" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M10 21H13L15 17V11H9V17H12L10 21ZM18 21H21L23 17V11H17V17H20L18 21Z" fill="#98A2B3" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M7.9 16C7.9 14.29 9.29 12.9 11 12.9H15V11H11C8.24 11 6 13.24 6 16C6 18.76 8.24 21 11 21H15V19.1H11C9.29 19.1 7.9 17.71 7.9 16ZM12 17H20V15H12V17ZM21 11H17V12.9H21C22.71 12.9 24.1 14.29 24.1 16C24.1 17.71 22.71 19.1 21 19.1H17V21H21C23.76 21 26 18.76 26 16C26 13.24 23.76 11 21 11Z" fill="#98A2B3" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M25 23V9C25 7.9 24.1 7 23 7H9C7.9 7 7 7.9 7 9V23C7 24.1 7.9 25 9 25H23C24.1 25 25 24.1 25 23ZM12.5 17.5L15 20.51L18.5 16L23 22H9L12.5 17.5Z" fill="#98A2B3" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M8.25 14.5C7.42 14.5 6.75 15.17 6.75 16C6.75 16.83 7.42 17.5 8.25 17.5C9.08 17.5 9.75 16.83 9.75 16C9.75 15.17 9.08 14.5 8.25 14.5ZM8.25 8.5C7.42 8.5 6.75 9.17 6.75 10C6.75 10.83 7.42 11.5 8.25 11.5C9.08 11.5 9.75 10.83 9.75 10C9.75 9.17 9.08 8.5 8.25 8.5ZM8.25 20.5C7.42 20.5 6.75 21.18 6.75 22C6.75 22.82 7.43 23.5 8.25 23.5C9.07 23.5 9.75 22.82 9.75 22C9.75 21.18 9.08 20.5 8.25 20.5ZM11.25 23H25.25V21H11.25V23ZM11.25 17H25.25V15H11.25V17ZM11.25 9V11H25.25V9H11.25Z" fill="#98A2B3" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M7 21H9V21.5H8V22.5H9V23H7V24H10V20H7V21ZM8 12H9V8H7V9H8V12ZM7 15H8.8L7 17.1V18H10V17H8.2L10 14.9V14H7V15ZM12 9V11H26V9H12ZM12 23H26V21H12V23ZM12 17H26V15H12V17Z" fill="#98A2B3" />
                        </svg>
                    </div>
                    {/* File input mock */}
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="hidden"
                        id="file-upload"
                    />
                    <label htmlFor="file-upload" className="text-sm text-blue-600 cursor-pointer hover:text-blue-800">
                        {file ? file.name : 'Attach File'}
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 flex items-center justify-center text-black font-semibold bg-[#F89521] hover:bg-orange-300 rounded-lg transition-colors  shadow-md"
                    disabled={isPosting || !content.trim()}
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 8l3 3m0 0l-3-3m3 3v-8m0 8l3 3m-6-3l-3-3m0 0l-3 3m3-3v-8"></path></svg>
                    {isPosting ? 'Posting...' : 'Post'}
                </button>
            </form>
        </div>
    );
};

// --- 3. Single Announcement Card Component (Updated for download link) ---
const AnnouncementCard = ({ post }) => (
    <div className="bg-white p-6 mb-2 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
                {/* Author Avatar */}
                <img className="h-10 w-10 rounded-full object-cover mr-3" src={post.avatarUrl} alt={post.author} />
                <div>
                    <p className="text-base font-semibold text-gray-900">{post.author}</p>
                    <p className="text-sm text-gray-500">{post.role}</p>
                </div>
            </div>

            {/* Download Link */}
            {post.file && (
                <a
                    href={post.file.url} // <-- Uses the file URL
                    download={post.file.name} // <-- Prompts browser to download with file name
                    className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm"
                >
                    Download the PDF
                    <svg className="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                </a>
            )}
        </div>

        {/* Announcement Content */}
        <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>

        {/* File Attachment */}
        {post.file && (
            <div className="flex items-center p-3 bg-gray-50 border border-gray-200 rounded-lg w-fit mb-4">
                <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-2 16h-2v-2h2v2zm0-4h-2v-4h2v4zm4-10H8V4h3.17L16 8.83V14h2V8l-6-6z" /></svg>
                <span className="text-sm font-medium text-gray-800">{post.file.name}</span>
                <span className="text-xs text-gray-500 ml-2">({post.file.size})</span>
            </div>
        )}

        {/* Timestamp */}
        <p className="text-xs text-gray-500 border-t pt-2 mt-2">
            {post.date} at {post.time}
        </p>
    </div>
);

// --- 4. Main Feed Component ---
const AnnouncementFeed = () => {
    // State to hold the dynamic list of announcements
    const [announcements, setAnnouncements] = useState(initialAnnouncements);

    // Function to add a new post to the top of the feed
    const handleNewPost = (newPost) => {
        setAnnouncements([newPost, ...announcements]);
    };

    return (
        <div className="max-w-xl mx-auto py-8">
            {/* Title Section */}
            <div className=" mb-10">
                <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                    We'll let you know <br />
                    the latest update <br /> here
                </h1>
                {/* Mock illustration container */}
                <div className="mt-4">
                    <img src="" alt="" />
                </div>
            </div>


            {/* 1. Post Creation Form */}
            <AnnouncementForm onPost={handleNewPost} />



            {announcements.length > 0 ? (
                announcements.map(post => (
                    <AnnouncementCard key={post.id} post={post} />
                ))
            ) : (
                <div className="text-center p-8 bg-gray-50 rounded-lg text-gray-600">
                    No announcements posted yet.
                </div>
            )}
        </div>
    );
};

export default AnnouncementFeed;