import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserForm = () => {
  const [data, setRegData] = useState({
    user_email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    setLoading(true);

    const { user_email, password } = data;

    if (!user_email || !isValidEmail(user_email)) {
      toast.error('Enter a valid email address', { position: toast.POSITION.TOP_RIGHT });
      setLoading(false);
      return;
    } else if (!password) {
      toast.error('Enter Password', { position: toast.POSITION.TOP_RIGHT });
      setLoading(false);
      return;
    } else if (password.length < 8) {
      toast.error('Password must be at least 8 characters', { position: toast.POSITION.TOP_RIGHT });
      setLoading(false);
      return;
    }

    axios.post('http://localhost:4000/api/user/addUser', data)
      .then((response) => {
        toast.success('User added successfully', { position: toast.POSITION.TOP_RIGHT });
        console.log('Registration successful:', response.data);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || 'Something went wrong when registering';
        toast.error(errorMessage, { position: toast.POSITION.TOP_RIGHT });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <form onSubmit={handleRegistration} className="flex flex-col items-center justify-center shadow-2xl shadow-blue-500 p-10 gap-4">
        <h1 className='text-2xl text-center font-bold mb-4'>User Registration</h1>
        <label>Email:</label>
        <input
          type="text"
          placeholder="Enter Your Email"
          value={data.user_email}
          name='user_email'
          onChange={handleChange}
          className="input-field mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter Your Password"
          value={data.password}
          name='password'
          onChange={handleChange}
          className="input-field mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button 
          type="submit" 
          className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default UserForm;
