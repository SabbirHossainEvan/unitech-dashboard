
import React from 'react';


const mockUser = {
    id: '1',
    name: 'Sarah Khan',
    userId: '02722111218107',
    course: '1st semester',
    semester: '1st semester',
    status: 'Active',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
};

// Creates a list of 20 mock users
const mockUsers = Array(20).fill(mockUser).map((user, index) => ({
    ...user,
    id: String(index + 1),
    avatarUrl: `https://i.pravatar.cc/150?img=${1 + (index % 10)}`,
}));


// --- REACT COMPONENT ---
const UserListSection = ({ users, totalUsers }) => {
    return (
        <div className="bg-white rounded-lg  border border-gray-200">

            {/* --- Top Filter/Header Bar --- */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                {/* Filters */}
                <div className="flex items-center space-x-4 text-sm font-semibold text-gray-700">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-500">Status</span>
                        <select className="border border-gray-300 rounded-md py-1 px-3 text-sm focus:ring-orange-400 focus:border-[#F89521]">
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-500">Course</span>
                        <select className="border border-gray-300 rounded-md py-1 px-3 text-sm focus:ring-orange-500 focus:border-orange-500">
                            <option>Academic</option>
                        </select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-500">Semester</span>
                        <select className="border border-gray-300 rounded-md py-1 px-3 text-sm focus:ring-blue-500 focus:border-blue-500">
                            <option>1st semester</option>
                        </select>
                    </div>
                </div>

                {/* Download Button */}
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium">
                    <span>Download the list (PDF)</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 11.586V3a1 1 0 112 0v8.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {/* --- User Count and Table Container --- */}
            <div className="p-4">
                <div className="mb-3 text-sm font-medium text-gray-500">
                    Users ({totalUsers})
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">

                        <thead className="bg-gray-50">
                            <tr className='w-full justify-between flex'>
                                {/* Width adjusted for stacked content */}
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs  font-medium text-gray-500 uppercase tracking-wider w-full">
                                    User ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs  font-medium text-gray-500 uppercase tracking-wider w-full">
                                    Course
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        {/* --- Table Body (Scrollable) --- */}
                        <tbody className="bg-white divide-gray-200 block">
                            {users.map((user) => (
                                <tr key={user.id} className="w-full justify-between flex">
                                    <td className=" whitespace-nowrap text-sm font-medium text-gray-900  flex items-center">
                                        {/* User Avatar */}
                                        <img
                                            className="h-7 w-7 rounded-full mr-3 object-cover"
                                            src={user.avatarUrl}
                                            alt={user.name}
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900">
                                                {user.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td >
                                        <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                            {user.course}
                                        </div>
                                    </td>
                                    <td className='mr-8'>
                                        <span className="text-xs text-gray-500 font-normal">
                                            {user.userId}
                                        </span>
                                    </td>
                                    <td className='mr-6'>
                                        <span className="text-green-600">
                                                {user.status}
                                            </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Use named exports
export { UserListSection, mockUsers };