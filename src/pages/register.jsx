


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import '/src/styles/register.css';
import { baseURL } from '../App';

import { FcGoogle } from 'react-icons/fc'; // For Google icon


const Register = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [googleUser, setGoogleUser] = useState(null);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
      setLoading(true);
      const res = await fetch(`${baseURL}/register`, {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      setLoading(false);

      if (result.message === 'User registered successfully') {
        alert('✅ Registered Successfully');
        navigate('/login');
      } else {
        alert(result.message || '❌ Registration failed');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
      setLoading(false);
    }
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { name, email, picture } = decoded;
      setGoogleUser({ name, email, photoUrl: picture }); // Switch to Google mode
    } catch (err) {
      alert("Google Authentication Failed");
    }
  };

  const handleGoogleCompleteSignup = async (e) => {
    e.preventDefault();

    const res = await fetch(`${baseURL}/google-register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: googleUser.name,
        email: googleUser.email,
        photoUrl: googleUser.photoUrl,
        password,
      }),
    });

    const result = await res.json();

    if (result.message === 'Google sign-up successful') {
      alert("✅ Google Signup Completed");
      localStorage.setItem("token", result.token);
      navigate("/login");
    } else if (result.message === 'Email already exists') {
      setMessage("Registration failed: Email already exists");
      // alert("⚠️ User already exists. Please login.");
      // navigate("/login");
    } else {
      alert("❌ Signup Failed");
    }
  };

  return (
    <div className="register-container min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md bg-white dark:bg-gray-900">

        {!googleUser && (
<>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Register</h2>

            <input type="text" name="userName" placeholder="Username" required className="input" />
            <input type="number" name="phoneNumber" placeholder="Phone Number" required className="input" />
            <input type="email" name="email" placeholder="Email" required className="input" />
            <input type="password" name="password" placeholder="Password" required className="input" />
            <input type="number" name="age" placeholder="Age" required className="input" />
            <select name="gender" required className="input">
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleImagePreview}
              className="input"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover mx-auto border mt-2"
              />
            )}
            <button
              type="submit"
              className={`bg-indigo-600 text-white py-2 px-4 rounded w-full ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
           <div className="text-center my-4 text-gray-600 dark:text-gray-300">OR</div>

        <div className="flex justify-center mb-4">
          {/* <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert('Google Sign-In Failed')}
          /> */}
  <GoogleLogin
  onSuccess={handleGoogleSuccess}
  onError={() => alert('Google Sign-In Failed')}
  useOneTap={false}
  render={(renderProps) => (
    <button
      onClick={renderProps.onClick}
      disabled={renderProps.disabled}
      className="flex items-center justify-center gap-3 px-4 py-2 border rounded-md shadow-md bg-white hover:bg-gray-100 text-gray-800 w-full"
    >
      <FcGoogle className="text-xl" />
      <span>Sign up with Google</span> {/* <-- Custom Text */}
    </button>
  )}
/>

      


        </div>
        </>
        )}

       

        {googleUser && (
          <div className="text-center">
            <h2>Set the password for your BudgetBloom account</h2>
            <p>{googleUser.name}</p>
            <p>{googleUser.email}</p>
            <img
              src={googleUser.photoUrl}
              alt="Google Avatar"
              className="w-20 h-20 rounded-full mx-auto mb-2"
            />
            <form onSubmit={handleGoogleCompleteSignup} className="space-y-4 mt-4">
              <input
                type="password"
                placeholder="Set a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                required
              />
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg">
                Complete Signup
              </button>
              <p style={{ color: 'red' }}>{message ? message : ''}</p>
            </form>
          </div>
        )}

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
