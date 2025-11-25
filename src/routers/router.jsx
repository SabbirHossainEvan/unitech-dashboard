import { createBrowserRouter } from "react-router";
import Login from "../layouts/Login";
import AdminDashboard from "../layouts/AdminDashboard";
import InstructorDashboard from "../layouts/InstructorDashboard";
import StudentDashboard from "../layouts/StudentDashboard";
import Dashboard from "../adminPages/Dashboard";
import Banners from "../adminPages/Banners";
import CourseDetailsCard from "../adminComponents/CourseDetailsCard";
import UserDetails from "../adminPages/UserDetails";
import UserProfile from "../adminComponents/UserProfile";
import ManageAccounts from "../adminPages/ManageAccounts";
import PaymentInfo from "../adminPages/PaymentInfo";
import Annoucement from "../adminPages/Annoucement";
import Settings from "../adminPages/Settings";
import Exit from "../adminPages/Exit";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login></Login>
    },
    {
        path: "/admin",
        element: <AdminDashboard></AdminDashboard>,
        children: [
            {
                index: true,
                element: <Dashboard></Dashboard>,
            },
            {
                path: "course",
                element: <CourseDetailsCard></CourseDetailsCard>
            },
            {
                path: "banners",
                element: <Banners></Banners>
            },
            {
                path: "/admin/user-details",
                element: <UserDetails></UserDetails>
            },
            {
                path: "/admin/user-details/user-profile",
                element: <UserProfile></UserProfile>
            },
            {
                path: "/admin/manage-accounts",
                element: <ManageAccounts></ManageAccounts>
            },
            {
                path: "/admin/payment-info",
                element: <PaymentInfo></PaymentInfo>
            },
            {
                path: "/admin/announcement",
                element: <Annoucement></Annoucement>
            },
            {
                path: "/admin/settings",
                element: <Settings></Settings>
            },
            {
                path: "/admin/exit",
                element: <Exit></Exit>
            }
        ]
    },
    {
        path: "/instructor",
        element: <InstructorDashboard></InstructorDashboard>
    },
    {
        path: "/student",
        element: <StudentDashboard></StudentDashboard>
    }
])

export default router;