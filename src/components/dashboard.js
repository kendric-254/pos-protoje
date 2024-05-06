import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [gamesData, setGamesData] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('http://localhost:4000/api/game/getAllGames')
      .then(response => response.json())
      .then(data => setGamesData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="dashboard bg-gray-300 rounded-3xl p-5">
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gamesData.map(game => (
            <div key={game.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-3">{game.game_name}</h2>
              <p className="text-lg mb-2">Quantity in Stock: {game.quantity_in_stock}</p>
              <p className="text-lg">Price: ${game.price}</p>
            </div>
          ))}
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
