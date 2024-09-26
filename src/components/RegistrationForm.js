import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const RegistrationForm = () => {
  const [data, setRegData] = useState({
    admin_email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegData(prev => ({
      ...prev, [name]: value
    }));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (!data.admin_email.includes('@') || !data.admin_email) {
      toast.error('Enter a valid email');
      return;
    } 
    if (data.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/api/admin/addAdmin', data);
      toast.success('Registration successful!');
      setRegData({ admin_email: '', password: '' });
    } catch (error) {
      toast.error('Something went wrong when registering');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 to-pink-400'>
      <form onSubmit={handleRegistration} className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-8 gap-4 w-full max-w-md">
        <h1 className='text-3xl text-center font-bold mb-6 text-gray-800'>Registration</h1>
        
        <label className='text-gray-700'>Email:</label>
        <input
          type="text"
          placeholder="Enter Your Email"
          value={data.admin_email}
          name='admin_email'
          onChange={handleChange}
          className="input-field mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className='text-gray-700'>Password:</label>
        <input
          type="password"
          placeholder="Enter Your Password"
          value={data.password}
          name='password'
          onChange={handleChange}
          className="input-field mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button type="submit" className="btn bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 focus:outline-none focus:shadow-outline mb-4" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        <ToastContainer />
      </form>
    </div>
  );
}

export default RegistrationForm;
