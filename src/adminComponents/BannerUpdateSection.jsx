import React, { useState } from 'react';
import { Upload, X, RotateCcw } from 'lucide-react';

// --- Sample Data for Color Ideas (Hex Codes) ---
const colorIdeas = [
    '#4D585D', '#6D7A7F', '#8F9CA1', '#B2BEC3', '#D7E1E5', '#F6FCFF',
    '#00335B', '#005A9F', '#0984E3', '#53B4FF', '#9DD4FF', '#E6F4FF',
    '#700607', '#A31718', '#D63031', '#E84393', '#FF9E9E', '#FFEDED',
    '#4F0529', '#821248', '#B5276C', '#EA80B9', '#FF9BCB', '#FFEDF5',
    '#00745D', '#00B894', '#27FCD2', '#68FFE1', '#A9FFEE', '#E9FFFB',
    '#17104E', '#2E2381', '#4A3CB4', '#6C5CE7', '#B3A9FD', '#F1EFFF',
];

const INITIAL_CUSTOMIZATION_STATE = {
    width: '1172 px',
    height: '1172 px',
    radius: '1172 px',
    title: 'A Beautiful title goes here',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    colorBackground: '#4f4f4f',
    colorTitle: '#4f4f4f',
    colorDescription: '#4f4f4f',
};

const INITIAL_FILES_STATE = [
    { id: 1, name: 'minimal_banner_img.jpeg', progress: 100, previewUrl: 'placeholder_image.jpg' },
    { id: 2, name: 'minimal_banner_img.jpeg', progress: 100, previewUrl: 'placeholder_image.jpg' },
    { id: 3, name: 'minimal_banner_img.jpeg', progress: 100, previewUrl: 'placeholder_image.jpg' },
];

const BannerUpdateSection = () => {
    const [uploadedFiles, setUploadedFiles] = useState(INITIAL_FILES_STATE);
    const [customization, setCustomization] = useState(INITIAL_CUSTOMIZATION_STATE);

    // --- File Handlers (unchanged) ---
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files).map(file => ({
            id: Date.now() + Math.random(),
            name: file.name,
            progress: 0,
            previewUrl: URL.createObjectURL(file)
        }));
        setUploadedFiles(prev => [...prev, ...files]);
    };

    const handleDeleteFile = (id) => {
        setUploadedFiles(prev => prev.filter(file => file.id !== id));
    };

    // --- Customization Handlers (unchanged) ---
    const handleCustomizationChange = (e) => {
        const { name, value } = e.target;
        setCustomization(prev => ({ ...prev, [name]: value }));
    };

    // Unified handler for text inputs and color hex inputs (Slightly refined)
    const handleColorInputChange = (e) => {
        const { name, value, type } = e.target;

        // If it's the color picker or a valid hex input, update the state
        if (type === 'color' || value.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i)) {
            setCustomization(prev => ({ ...prev, [name]: value }));
        }
        // Allow the user to type in the hex code input field even if incomplete
        else if (type === 'text') {
            setCustomization(prev => ({ ...prev, [name]: value }));
        }
    };

    // Handler for clicking on color ideas
    const handleColorIdeaClick = (color) => {
        setCustomization(prev => ({ ...prev, colorBackground: color }));
    };

    const handleReset = () => {
        setCustomization(INITIAL_CUSTOMIZATION_STATE);
    };

    // --- Reusable Input Component (unchanged) ---
    const CustomInput = ({ label, name, value, onChange, type = 'text' }) => (
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
        </div>
    );

    // --- Reusable Color Picker Component (Styling FIX) ---
    const ColorPickerField = ({ label, name, color }) => (
        <div className="flex justify-between items-center mb-4 relative">
            <label className="block text-gray-700 font-medium">{label}</label>
            <div className="flex items-center">
                {/* Text input for Hex Code */}
                <input
                    type="text"
                    name={name}
                    value={color}
                    onChange={handleColorInputChange}
                    className="w-24 p-2 border border-gray-300 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {/* Native Color Picker button (FIXED Tailwind styling for better look) */}
                <input
                    type="color"
                    name={name}
                    value={color}
                    onChange={handleColorInputChange}
                    // Use a container div for better styling control over the native color input
                    className="w-8 h-8 rounded-r-lg border border-gray-300 cursor-pointer overflow-hidden p-0"
                    style={{ height: '40px', width: '40px', padding: '0px' }}
                />
            </div>
        </div>
    );


    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-800 mb-8">Update Banners</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* === Left Column: Upload Photos === */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg h-fit">
                    <h2 className="text-xl font-medium text-gray-700 mb-4">Upload Photo</h2>

                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer hover:border-orange-500 transition duration-200 relative">
                        <input
                            type="file"
                            multiple
                            accept="image/*, .pdf, .gif"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                        <p className="font-semibold text-gray-600">Upload Photos</p>
                        <p className="text-sm text-gray-500 mt-1">
                            JPG, JPEG, PNG, PDF, GIF <br /> max: 10 MB
                        </p>
                    </div>

                    {/* Uploaded Files Grid */}
                    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {uploadedFiles.map(file => (
                            <div key={file.id} className="relative group border border-gray-200 rounded-lg overflow-hidden">
                                <div className="bg-gray-100 h-24 flex items-center justify-center">
                                    <img
                                        src={file.previewUrl || '/path/to/placeholder/image.jpg'}
                                        alt={file.name}
                                        className="object-cover h-full w-full"
                                    />
                                </div>

                                <div className="p-2 text-center">
                                    <p className="text-xs truncate text-gray-600">{file.name}</p>
                                    <div className="h-1 bg-gray-200 rounded-full mt-1">
                                        <div
                                            className="h-full bg-orange-500 rounded-full"
                                            style={{ width: `${file.progress}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">{file.progress}%</p>
                                </div>

                                {/* Delete Button Overlay */}
                                <button
                                    onClick={() => handleDeleteFile(file.id)}
                                    className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Delete"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg h-fit">
                    <h2 className="text-xl font-medium text-gray-700 mb-6">Banner Customization</h2>

                    {/* Size Inputs */}
                    <CustomInput label="Banner Width" name="width" value={customization.width} onChange={handleCustomizationChange} />
                    <CustomInput label="Banner Height" name="height" value={customization.height} onChange={handleCustomizationChange} />
                    <CustomInput label="Corner Radius" name="radius" value={customization.radius} onChange={handleCustomizationChange} />

                    {/* Title and Description */}
                    <CustomInput label="Banner Title" name="title" value={customization.title} onChange={handleCustomizationChange} />
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            value={customization.description}
                            onChange={handleCustomizationChange}
                            rows="4"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                        ></textarea>
                    </div>

                    {/* Color Studio */}
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Color Studio</h3>

                    {/* Color Ideas Grid */}
                    <div className="grid grid-cols-6 gap-1 mb-6 p-2 ">
                        {colorIdeas.map((color, index) => (
                            <button
                                key={index}
                                className="w-17 h-12 rounded hover:scale-105 transition-transform"
                                style={{ backgroundColor: color }}
                                onClick={() => handleColorIdeaClick(color)}
                                title={color}
                            />
                        ))}
                    </div>

                    {/* Color Inputs with native color picker */}
                    <ColorPickerField label="Background" name="colorBackground" color={customization.colorBackground} />
                    <ColorPickerField label="Title" name="colorTitle" color={customization.colorTitle} />
                    <ColorPickerField label="Description" name="colorDescription" color={customization.colorDescription} />


                    {/* Action Buttons */}
                    <div className="mt-8">
                        <button
                            onClick={() => console.log('Saving changes:', customization, uploadedFiles)}
                            className="w-full bg-[#F89521] text-white font-bold py-3 rounded-lg "
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={handleReset}
                            className="w-full mt-3 flex items-center justify-center text-gray-600 font-medium py-2 rounded-lg hover:bg-gray-100 transition duration-200"
                        >
                            <RotateCcw className="w-5 h-5 mr-2" />
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerUpdateSection;