import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"; // Assuming you have a CSS file for styling
import { baseURL } from "../App";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
     const res = await fetch(`${baseURL}/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(form),
  
});

      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login Success");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
      else if (res.status === 401) {
      alert("Invalid credentials");
    }
      else{
        alert("Login failed")
      }
    } catch (error) {
      
      
      alert("Something went wrong: " + error.message);

      
    }
  };

  return (
    <div className="login-container min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 px-4">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-full border-2 border-green-500" style={{ maxWidth: "270px" }}>
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
          Login Page
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
            placeholder="Email"
            className="input-field"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
            placeholder="Password"
            className="input-field"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
