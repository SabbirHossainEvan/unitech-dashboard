import React, { useState, useEffect } from 'react';

const createSarahKhanRecords = (count) => {
  const records = [];

  const startId = 100; 
  for (let i = 1; i <= count; i++) {
    records.push({
      id: startId + i,
      user: { name: 'Sarah Khan', avatar: '/path/to/sarah-avatar.png' }, 
      course: '1st semester',
      courseFee: 12000,
      installment: '#First installment',
      paid: 6000,
      due: 0.00,
      status: 'Paid', 
    });
  }
  return records;
};


const initialExampleData = [
  ...createSarahKhanRecords(15), 


  {
    id: 1, 
    user: { name: 'Ahmed Ali', avatar: '/path/to/ahmed-avatar.png' },
    course: '2nd semester',
    courseFee: 15000,
    installment: '#Second installment',
    paid: 5000,
    due: 10000.00,
    status: 'Partial',
  },
  {
    id: 2, 
    user: { name: 'Fatima Zafar', avatar: '/path/to/fatima-avatar.png' },
    course: '3rd semester',
    courseFee: 10000,
    installment: '#Full Fee',
    paid: 0,
    due: 10000.00,
    status: 'Due',
  },
];

// Utility Function to Calculate Totals
const calculateTotals = (data) => {
  const totalAmount = data.reduce((sum, item) => sum + item.courseFee, 0);
  const totalPaid = data.reduce((sum, item) => sum + item.paid, 0);
  const totalDue = data.reduce((sum, item) => sum + item.due, 0);
  return { totalAmount, totalPaid, totalDue };
};

// Function to format Taka amounts
const formatTk = (amount) => `Tk. ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

// --- 2. Main React Component ---

const FeePaymentStatusTable = ({ initialData = initialExampleData }) => {

  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false); // Add loading state


  const { totalAmount, totalPaid, totalDue } = calculateTotals(data);

  if (isLoading) {
    return <div className="p-4 text-center text-gray-600">Loading fee status...</div>;
  }



  return (
    <div className="bg-white shadow-xl rounded-lg p-4 max-w-full overflow-x-auto">
      {/* --- Header Section --- */}
      <div className="flex justify-between items-center mb-4 border-b pb-4">
        <div className="flex space-x-2 text-sm">
          {/* Mock filters based on the image */}
          <select className="border rounded-md px-2 py-1 text-gray-600">
            <option>Status | All</option>
          </select>
          <select className="border rounded-md px-2 py-1 text-gray-600">
            <option>Course | Academic</option>
          </select>
          <select className="border rounded-md px-2 py-1 text-gray-600">
            <option>Semester | 1st semester</option>
          </select>
        </div>
        <button className="flex items-center text-blue-600 font-medium hover:text-blue-700">
          Download the list (PDF)
          <svg className="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2-8H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2z"></path>
          </svg>
        </button>
      </div>
      
      {/* --- Table Section --- */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Users({data.length})
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course Fee
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Installment
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Paid
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                Due
              </th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {/* FIX: The 'data.map' call is now safe because 'data' is guaranteed to be an array */}
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      <img className="h-8 w-8 rounded-full object-cover" src={item.user.avatar} alt={item.user.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{item.user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.course}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatTk(item.courseFee)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.installment}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {formatTk(item.paid)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                  {formatTk(item.due)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Footer Totals Section --- */}
      <div className="flex justify-end mt-4 pt-4 border-t border-gray-200 space-x-4">
        <div className="flex flex-col items-end p-2 bg-gray-50 rounded-lg shadow-sm">
          <span className="text-sm text-gray-600">Total Amount</span>
          <span className="text-lg font-bold text-gray-800">{formatTk(totalAmount)}</span>
        </div>
        <div className="flex flex-col items-end p-2 bg-green-50 rounded-lg shadow-sm">
          <span className="text-sm text-gray-600">Paid Amount</span>
          <span className="text-lg font-bold text-green-700">{formatTk(totalPaid)}</span>
        </div>
        <div className="flex flex-col items-end p-2 bg-red-50 rounded-lg shadow-sm">
          <span className="text-sm text-gray-600">Due Amount</span>
          <span className="text-lg font-bold text-red-700">{formatTk(totalDue)}</span>
        </div>
      </div>
    </div>
  );
};

export default FeePaymentStatusTable;