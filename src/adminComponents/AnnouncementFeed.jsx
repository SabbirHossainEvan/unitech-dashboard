import React, { useState } from 'react';

// --- 1. Example Data Structure ---
const initialAnnouncements = [
  {
    id: 1,
    author: 'Olivia Rhye',
    role: 'Mechanical Instructor',
    avatarUrl: '/path/to/olivia-avatar.png', // Replace with actual URL
    content: 'Hey dear students, hope you are doing well, here is your class lesson',
    file: { name: 'Tech requirements.pdf', size: '200 KB' },
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
      file: file ? { name: file.name, size: `${(file.size / 1024).toFixed(0)} KB` } : null,
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
          <div className="text-gray-500 space-x-2 text-xl">
            {/* Mock Icons for B, I, H, Quote, Link, List */}
            <span className="cursor-pointer hover:text-gray-800 font-bold">B</span>
            <span className="cursor-pointer hover:text-gray-800 italic">I</span>
            <span className="cursor-pointer hover:text-gray-800 font-serif">H</span>
            <span className="cursor-pointer hover:text-gray-800">"</span>
            <span className="cursor-pointer hover:text-gray-800">🔗</span>
            <span className="cursor-pointer hover:text-gray-800">📄</span>
            <span className="cursor-pointer hover:text-gray-800">≡</span>
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
          className="w-full py-3 flex items-center justify-center text-white font-semibold bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors disabled:opacity-50 shadow-md"
          disabled={isPosting || !content.trim()}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 8l3 3m0 0l-3-3m3 3v-8m0 8l3 3m-6-3l-3-3m0 0l-3 3m3-3v-8"></path></svg>
          {isPosting ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
};

// --- 3. Single Announcement Card Component ---
const AnnouncementCard = ({ post }) => (
  <div className="bg-white p-6 mb-4 rounded-xl shadow-sm border border-gray-200">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center">
        {/* Author Avatar */}
        <img className="h-10 w-10 rounded-full object-cover mr-3" src={post.avatarUrl} alt={post.author} />
        <div>
          <p className="text-base font-semibold text-gray-900">{post.author}</p>
          <p className="text-sm text-gray-500">{post.role}</p>
        </div>
      </div>
      
      {/* Download Button */}
      {post.file && (
        <button className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
          Download the PDF
          <svg className="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
        </button>
      )}
    </div>

    {/* Announcement Content */}
    <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>

    {/* File Attachment */}
    {post.file && (
      <div className="flex items-center p-3 bg-gray-50 border border-gray-200 rounded-lg w-fit mb-4">
        <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-2 16h-2v-2h2v2zm0-4h-2v-4h2v4zm4-10H8V4h3.17L16 8.83V14h2V8l-6-6z"/></svg>
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
    // Add the new post to the beginning of the array
    setAnnouncements([newPost, ...announcements]);
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      {/* Title Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
          We'll let you know <br />
          the latest update here
        </h1>
        {/* The illustration can be added here using an image tag or a custom SVG/illustration component */}
        <div className="mt-4"></div>
      </div>
      
      <hr className="mb-6" />

      {/* 1. Post Creation Form */}
      <AnnouncementForm onPost={handleNewPost} />
      
      <hr className="my-6" />

      {/* 2. Dynamic Feed List */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Latest Posts</h2>
      
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