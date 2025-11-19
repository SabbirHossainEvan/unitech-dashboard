import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/Frame 45.png"

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Instructor");

    const handleLogin = (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert("Please fill all fields!");
            return;
        }

        if (role === "Admin") {
            navigate("/admin");
        } else if (role === "Instructor") {
            navigate("/instructor");
        } else if (role === "Student") {
            navigate("/student");
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-50">
            <div>
                <div>
                    <img src={logoImage} alt="" className="block mx-auto mb-3" />
                </div>
                <form
                    onSubmit={handleLogin}
                    className="w-[400px] p-8 rounded-xl"
                >
                    <h2 className="text-3xl font-bold mb-6">Welcome Back 👋</h2>

                    <label className="text-md text-gray-400">Username or Phone</label>
                    <input
                        type="text"
                        placeholder="Username or Phone"
                        className="w-full text-sm border p-2 rounded-lg border-gray-300 mb-3 my-2"
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label className="text-md text-gray-400">Password</label>
                    <input
                        type="password"
                        placeholder="*********"
                        className="w-full text-sm border p-2 rounded-lg border-gray-300 mb-3 my-2"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label className="text-md text-gray-400">I'm a</label>
                    <select
                        className="w-full text-sm border p-2 rounded-lg border-gray-300 mb-3 my-2"
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option>Instructor</option>
                        <option>Admin</option>
                        <option>Student</option>
                    </select>

                    <button className="w-full bg-orange-400 text-white p-2 rounded">
                        Login
                    </button>
                    <p className="underline decoration-orange-400 text-orange-400 text-end">Forgot password?</p>
                </form>
            </div>

        </div>
    );
}
