// UserForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const UserForm = () => {
  const [data, setRegData] = useState({
    user_email: '',
    password: '',
  });

  
  const handleChange = (e) => {
        const { name, value } = e.target;
        setRegData(prev => ({
            ...prev, [name]: value
        }));
  };
  
  const handleRegistration = (e) => {
    e.preventDefault();
    if (data.user_email.length.user_email !== undefined && data.user_email) {
      toast.error('Enter Correct Email', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      })
    } else if (data.password.length < 8) {
      toast.error('Password must be at least 8 characters', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      })
    } else (
    axios.post('http://localhost:4000/api/user/addUser', data, {
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    })
        .then((response) => {
          toast.success('User added successfully', {
          position: toast.POSITION.TOP_RIGHT,
          autoclose: 3000,
       })
        console.log('Registration successful:', response.data);
        // Optionally, redirect the user or show a success message
      })
     .catch((error) => {
        toast.error('Something went wrong when registering', {
          position: toast.POSITION.TOP_RIGHT,
          autoclose: 3000,
      })
      })
  )}


  return (
    <div className='flex items-center justify-center h-screen'>
    <form onSubmit={handleRegistration} className=" flex flex-col items-center justify-center shadow-2xl shadow-blue-500 p-52 gap-2">
      <h1 className='text-2xl text-center font-bold mb-4'> User Registration</h1>
      <label>Email :</label>
      <input
        type="text"
        placeholder="Enter Your Email"
        value={data.user_email}
        name='user_email'
        onChange={(handleChange)}
        className="input-field mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <label>Password :</label>
      <input
        type="password"
        placeholder="Enter Your Password"
        value={data.password}
        name='password'
        onChange={handleChange}
        className="input-field mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <button type="submit" className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-5">
        Register
      </button>
      <ToastContainer/>
      </form>
      </div>
  );
  }

export default UserForm;
