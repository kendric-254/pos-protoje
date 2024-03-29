import React from 'react';

function Dashboard() {
  return (
    <div className="dashboard bg-gray-300 rounded-3xl p-5">
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-3">Total Games</h2>
            <p className="text-2xl font-bold text-blue-600">100 {/* Replace this with dynamic data */}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-3">New Arrivals</h2>
            <p className="text-2xl font-bold text-blue-600">10 {/* Replace this with dynamic data */}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-3">Best Sellers</h2>
            <p className="text-2xl font-bold text-blue-600">20 {/* Replace this with dynamic data */}</p>
          </div>
        </div>
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">Recent Orders</h2>
          {/* List of recent orders */}
        </div>
          </div>
          
          
    </div>
  );
}

export default Dashboard;
