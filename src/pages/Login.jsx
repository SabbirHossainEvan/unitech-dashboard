import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Instructor");

  const handleLogin = (e) => {
    e.preventDefault();

    // Fake authentication logic (you can replace with API)
    if (!username || !password) {
      alert("Please fill all fields!");
      return;
    }

    // Redirect based on role
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
            <img src="" alt="" />
        </div>
      <form
        onSubmit={handleLogin}
        className="w-[400px] p-8 rounded-xl"
      >
        <h2 className="text-3xl font-bold mb-4">Welcome Back 👋</h2>

        <label className="text-sm font-semibold">Username or Phone</label>
        <input
          type="text"
          placeholder="username"
          className="w-full border p-2 rounded mb-3"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="text-sm font-semibold">Password</label>
        <input
          type="password"
          placeholder="*********"
          className="w-full border p-2 rounded mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="text-sm font-semibold">I'm a</label>
        <select
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setRole(e.target.value)}
        >
          <option>Instructor</option>
          <option>Admin</option>
          <option>Student</option>
        </select>

        <button className="w-full bg-orange-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
