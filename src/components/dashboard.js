import React from 'react';
import game1Image from './Desktop Wallpaper Geralt Of Rivia, The Witcher 3_ Wild Hunt, Warrior, 8k, Hd Image, Picture, Background, Ba74f0 (1).jpeg';
import game2Image from './Grand Theft Auto V.jpeg';
import game3Image from './Official_ @ErlingHaaland is the cover star for EA Sports FC 24_ 🇳🇴🔥.jpeg';

function Dashboard() {
  // Define game data with images
  const games = [
    { 
      id: 1, 
      game_name: 'The Witcher 3 : Wild Hunt', 
      price: 4500, 
      image: game1Image 
    },
    { 
      id: 2, 
      game_name: 'GTA 5', 
      price: 3000, 
      image: game2Image 
    },
    { 
      id: 3, 
      game_name: 'FC 24', 
      price: 4000, 
      image: game3Image 
    }
  ];

  return (
    <div className="dashboard bg-gray-300 rounded-3xl p-5 mt-56 lg:mt-24">
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <img 
                src={game.image} 
                alt={game.game_name} 
                className="rounded-lg w-full h-auto mb-3" 
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <h2 className="text-xl font-semibold mb-3">{game.game_name}</h2>
              <p className="text-lg">Price: KES {game.price}</p>
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
