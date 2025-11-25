import React, { useState } from 'react';
import { Link } from 'react-router';

const mockUser = {
    id: '1',
    name: 'Sarah Khan',
    semester: '1st Semester',
    avatarUrl: '/Avatar (1).png', 
    personalDetails: {
        studentName: 'Sarah Khan',
        fatherName: 'Mr Saif Khan',
        motherName: 'Mrs Natasha Khan',
        dateOfBirth: '03/04/2004',
        address: 'Street Name, Area Name, Dhaka',
        email: 'yourmail@gmail.com',
        phone: '+880 1238 67435',
    },
    paymentHistory: [
        {
            semester: '1st semester',
            subjects: ['Subject 1', 'Subject 2', 'Subject 3'],
            courseFee: '12,000',
            installment: '#First installment',
            paid: '6,000',
            due: '6,000',
        },
        {
            semester: '1st semester',
            subjects: ['Subject 1'], 
            courseFee: '12,000', 
            installment: '#Second installment',
            paid: '6,000',
            due: '6,000',
        },
    ],
    attendance: {
        totalClasses: 50,
        attendedClasses: 45,
        percentage: '90%',
        details: [
            { date: '2023-10-01', status: 'Present' },
            { date: '2023-10-02', status: 'Present' },
            { date: '2023-10-03', status: 'Absent' },
        ]
    },
    results: [
        { title: 'Assessment test', totalMarks: 30, obtainedMarks: 24 },
        { title: 'Assessment test', totalMarks: 30, obtainedMarks: 24 },
    ],
};


const CollapsibleSection = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-gray-200 rounded-md mb-2 bg-white">
            <button
                className="flex justify-between items-center w-full p-4 text-left text-gray-700 font-medium hover:bg-gray-50 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{title}</span>
                <svg
                    className={`h-5 w-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            {isOpen && <div className="p-4 border-t border-gray-200">{children}</div>}
        </div>
    );
};


const UserProfileSection = ({ user = mockUser }) => {
    const [paymentForm, setPaymentForm] = useState({
        name: '',
        userId: '',
        course: 'Academic',
        semester: 'Select',
        installment: 'Select',
        amount: '5,000',
    });

    const handlePaymentFormChange = (e) => {
        const { name, value } = e.target;
        setPaymentForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitPayment = (e) => {
        e.preventDefault();
        console.log('Payment Submitted:', paymentForm);
        alert('Payment submitted (Check console for data)!');
    };

    const handleResetPaymentForm = () => {
        setPaymentForm({
            name: '',
            userId: '',
            course: 'Academic',
            semester: 'Select',
            installment: 'Select',
            amount: '5,000',
        });
    };


    const totalCourseFee = user.paymentHistory.reduce((sum, item) => sum + parseFloat(item.courseFee.replace(/,/g, '')), 0);
    const totalPaid = user.paymentHistory.reduce((sum, item) => sum + parseFloat(item.paid.replace(/,/g, '')), 0);
    const totalDue = user.paymentHistory.reduce((sum, item) => sum + parseFloat(item.due.replace(/,/g, '')), 0);


    const totalResultsMarks = user.results.reduce((sum, item) => sum + item.totalMarks, 0);
    const totalObtainedMarks = user.results.reduce((sum, item) => sum + item.obtainedMarks, 0);


    return (
        <div className="w-full  mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
            {/* User Header */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-4">
                <div className="flex items-center space-x-4">
                    <img
                        className="h-16 w-16 rounded-full object-cover"
                        src={user.avatarUrl}
                        alt={user.name}
                    />
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                        <p className="text-gray-600">{user.semester}</p>
                    </div>
                </div>
                <Link to={"/admin/user-details"}>
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-150">
                        Block the user
                    </button>
                </Link>

            </div>

            {/* Collapsible Sections */}
            <CollapsibleSection title="Personal Details" defaultOpen={true}>
                <div className="text-gray-700 text-sm grid grid-cols-1 md:grid-cols-2 gap-2">
                    <p><strong>Student's Name:</strong> {user.personalDetails.studentName}</p>
                    <p><strong>Father's Name:</strong> {user.personalDetails.fatherName}</p>
                    <p><strong>Mother's Name:</strong> {user.personalDetails.motherName}</p>
                    <p><strong>Date of Birth:</strong> {user.personalDetails.dateOfBirth}</p>
                    <p className="md:col-span-2"><strong>Address:</strong> {user.personalDetails.address}</p>
                    <p><strong>Email:</strong> {user.personalDetails.email}</p>
                    <p><strong>Phone:</strong> {user.personalDetails.phone}</p>
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="Payment">
                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Payment History</h3>
                    <div className="overflow-x-auto border border-gray-200 rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Course
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Course Fee
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Installment
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Paid
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Due
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {user.paymentHistory.map((payment, index) => (
                                    <React.Fragment key={index}>
                                        <tr className="bg-gray-50">
                                            <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {payment.semester}
                                            </td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                                Tk. {payment.courseFee}
                                            </td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                                {payment.installment}
                                            </td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                                Tk. {payment.paid}
                                            </td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                                Tk. {payment.due}
                                            </td>
                                        </tr>
                                        {payment.subjects && payment.subjects.length > 0 && payment.installment === '#First installment' && (
                                            <tr>
                                                <td colSpan="5" className="px-4 py-2 text-sm text-gray-600">
                                                    <span className="font-semibold mr-2">Subjects:</span>
                                                    {payment.subjects.join(', ')}
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                                {/* Total Row */}
                                <tr className="bg-orange-50 text-white font-semibold">
                                    <td className="px-4 py-2 whitespace-nowrap text-sm" colSpan="1">
                                        Total
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                                        Tk. {totalCourseFee.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm"></td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                                        Tk. {totalPaid.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                                        Tk. {totalDue.toLocaleString()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Payment Form */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-800">New Payment</h3>
                        <button className="text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m7 0V4a1 1 0 00-1-1H7a1 1 0 00-1 1v7m6 0h4" />
                            </svg>
                        </button>
                    </div>
                    <form onSubmit={handleSubmitPayment} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="name" className="sr-only">Username</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-orange-400 focus:border-[#F89521]"
                                placeholder="Username"
                                value={paymentForm.name}
                                onChange={handlePaymentFormChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="userId" className="sr-only">Input User ID</label>
                            <input
                                type="text"
                                name="userId"
                                id="userId"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-orange-400 focus:border-[#F89521]"
                                placeholder="Input User ID"
                                value={paymentForm.userId}
                                onChange={handlePaymentFormChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="course" className="sr-only">Course</label>
                            <select
                                name="course"
                                id="course"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-orange-400 focus:border-[#F89521]"
                                value={paymentForm.course}
                                onChange={handlePaymentFormChange}
                            >
                                <option>Academic</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="semester" className="sr-only">Semester</label>
                            <select
                                name="semester"
                                id="semester"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-orange-400 focus:border-[#F89521]"
                                value={paymentForm.semester}
                                onChange={handlePaymentFormChange}
                            >
                                <option>Select</option>
                                <option>1st semester</option>
                                <option>2nd semester</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="installment" className="sr-only">Installment</label>
                            <select
                                name="installment"
                                id="installment"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-orange-400 focus:border-[#F89521]"
                                value={paymentForm.installment}
                                onChange={handlePaymentFormChange}
                            >
                                <option>Select</option>
                                <option>First installment</option>
                                <option>Second installment</option>
                                <option>Third installment</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="amount" className="sr-only">Amount</label>
                            <input
                                type="text"
                                name="amount"
                                id="amount"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-orange-400 focus:border-[#F89521]"
                                value={`Tk. ${paymentForm.amount}`}
                                onChange={handlePaymentFormChange}
                                readOnly 
                            />
                        </div>
                        <div className="md:col-span-2 lg:col-span-3 flex space-x-3 mt-4">
                            <button
                                type="submit"
                                className="flex-1 bg-[#F89521] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition duration-150"
                            >
                                Submit Payment
                            </button>
                            <button
                                type="button"
                                onClick={handleResetPaymentForm}
                                className="flex items-center justify-center flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition duration-150"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004 12c0 1.514.32 2.956.92 4.218m-.424 4.14A8.001 8.001 0 0120 12c0-1.514-.32-2.956-.92-4.218" />
                                </svg>
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="Attendance">
                <p className="text-gray-700 text-sm">
                    Attendance details would go here. For example:
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm mt-2">
                    <li>Total Classes: {user.attendance.totalClasses}</li>
                    <li>Attended Classes: {user.attendance.attendedClasses}</li>
                    <li>Attendance Percentage: {user.attendance.percentage}</li>
                </ul>
                <p className="text-sm text-gray-500 mt-4">
                    (Detailed attendance history table can be added here, similar to payment history.)
                </p>
            </CollapsibleSection>

            <CollapsibleSection title="Result">
                <div className="overflow-x-auto border border-gray-200 rounded-md">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Marks
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Obtained Marks
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {user.results.map((result, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {result.title}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                        {result.totalMarks}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                        {result.obtainedMarks}
                                    </td>
                                </tr>
                            ))}
                            {/* Total Row */}
                            <tr className="bg-gray-100 font-semibold">
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">
                                    Total Marks
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">
                                    {totalResultsMarks}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">
                                    {totalObtainedMarks}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CollapsibleSection>
        </div>
    );
};

export default UserProfileSection;