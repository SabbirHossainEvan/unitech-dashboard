import { createBrowserRouter } from "react-router";
import Login from "../layouts/Login";
import AdminDashboard from "../layouts/AdminDashboard";
import InstructorDashboard from "../layouts/InstructorDashboard";
import StudentDashboard from "../layouts/StudentDashboard";
import Dashboard from "../adminPages/Dashboard";
import Banners from "../adminPages/Banners";
import CourseDetailsCard from "../adminComponents/CourseDetailsCard";

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