import { createBrowserRouter } from "react-router";
import Login from "../pages/Login";
import AdminDashboard from "../pages/AdminDashboard";
import InstructorDashboard from "../pages/InstructorDashboard";
import StudentDashboard from "../pages/StudentDashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login></Login>
    },
    {
        path: "/admin",
        element: <AdminDashboard></AdminDashboard>
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