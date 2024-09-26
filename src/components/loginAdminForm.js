import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, Link } from 'react-router-dom';
import WelcomeNote from './WelcomeNote'; // Import the WelcomeNote component

const AdminLoginForm = () => {
  const { login, refreshToken } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const history = useHistory();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate inputs
  const validateInputs = () => {
    if (!loginData.email || !loginData.email.includes('@')) {
      toast.error('Enter a valid email', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
      return false;
    }
    if (loginData.password.length < 8) {
      toast.error('Password must be at least 8 characters', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
      return false;
    }
    return true;
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return; // Stop if inputs are invalid

    try {
      const response = await axios.post('http://localhost:4000/api/admin/loginAdmin', loginData);

      if (response.status === 200) {
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // Store tokens and navigate to dashboard
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', newRefreshToken);
        login(accessToken);
        history.replace('/dashboard');

        toast.success(`Login Successful. Welcome, ${loginData.email}`, { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
      } else if (response.status === 401) {
        const newAccessToken = await refreshToken();
        if (newAccessToken) await handleLogin(e);
        else toast.error('Invalid username/password', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
      } else {
        toast.error('Authentication Failed', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Invalid username/password', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-400 to-blue-600">
      <WelcomeNote /> {/* Include the WelcomeNote component */}
      <div className="flex justify-end items-start flex-1 p-5">
        <form onSubmit={handleLogin} className="flex flex-col bg-white p-8 rounded-lg shadow-lg gap-5 w-80">
          <h1 className="text-3xl text-center font-bold mb-2 text-gray-800">Admin Login</h1>
          <h2 className="text-lg text-center mb-4 text-gray-600">Sign In to Your Dashboard</h2>
          
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="text"
            placeholder="Enter your Email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            className="input-field mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 hover:border-blue-400"
          />
          
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            className="input-field mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 hover:border-blue-400"
          />
          
          <button
            type="submit"
            className="btn bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 transform hover:scale-105"
          >
            Login
          </button>
          
          <Link to="/loginUser" className="text-blue-600 hover:underline text-center mt-3">
            Login as User
          </Link>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default AdminLoginForm;
