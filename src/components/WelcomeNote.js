import React from 'react';

const WelcomeNote = () => {
  return (
    <div className="flex flex-col justify-center items-start h-screen p-5 text-white">
      <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
      <p className="mb-5">We are glad to see you again. Please log in to access your dashboard.</p>
      <div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-md hover:bg-opacity-30 transition duration-300">
        <h3 className="font-semibold">Need Help?</h3>
        <p>If you encounter any issues, feel free to contact support.</p>
      </div>
    </div>
  );
};

export default WelcomeNote;
