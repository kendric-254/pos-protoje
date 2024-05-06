// import axios from 'axios';
// import React, { useState, useEffect } from 'react';

// const CustomerSale = () => {
//   const [games, setGames] = useState([]);
//   const [selectedGame, setSelectedGame] = useState('');
//   const [quantitySold, setQuantitySold] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);

//   // Fetch games data from API
//   useEffect(() => {
//     fetchGames();
//   }, []);

//   const fetchGames = async () => {
//     try {
//       const response = await fetch('http://localhost:4000/api/game/getAllGames');
//       const data = await response.json();
//       setGames(data); // Assuming data is an array of games
//     } catch (error) {
//       console.error('Error fetching games:', error);
//     }
//   };

//   const handleSale = async (e) => {
//     e.preventDefault();
//     try {
//       const token = sessionStorage.getItem('accessToken'); // Retrieve the access token from session storage

//       // Make sale API call with authorization token included in headers
//       const response = await axios.post('http://localhost:4000/api/sale/makeSale', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}` // Include the access token in the Authorization header
//         },
//         body: JSON.stringify({
//           game_id: selectedGame,
//           quantity_sold: quantitySold,
//           total_price: totalPrice
//         })
//       });
//       const data = await response.json();
//       console.log('Sale successful:', data);
//     } catch (error) {
//       console.error('Error making sale:', error);
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <form onSubmit={handleSale} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="game">
//             Select Game:
//           </label>
//           <select 
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             name="game_id" 
//             id="game" 
//             value={selectedGame} 
//             onChange={(e) => setSelectedGame(e.target.value)}
//           >
//             <option value="">Select a game</option>
//             {games.map(game => (
//               <option key={game.id} value={game.id}>{game.game_name}</option>
//             ))}
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity_sold">
//             Quantity Sold:
//           </label>
//           <input 
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
//             type="number" 
//             name="quantity_sold" 
//             id="quantity_sold" 
//             value={quantitySold} 
//             onChange={(e) => setQuantitySold(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="total_price">
//             Total Price:
//           </label>
//           <input 
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
//             type="number" 
//             name="total_price" 
//             id="total_price" 
//             value={totalPrice} 
//             onChange={(e) => setTotalPrice(e.target.value)}
//           />
//         </div>
//         <div className="flex items-center justify-between">
//           <button 
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
//             type="submit"
//           >
//             Make Sale
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CustomerSale;



import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const CustomerSale = () => {
    const [data, setFormData] = useState({
        quantity_sold: '',
        total_price: '',
        game_id: ''
    });

    const [records, setGames] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getGames = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/game/getAllGames');
            setGames(response.data);
        } catch (error) {
            console.log('Error Getting Games', error);
            toast.error('Error Getting Games', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        }
    };

    useEffect(() => {
        getGames();
    }, []);

    const makeSale = async (e) => {
    e.preventDefault();

    try {
        const token = sessionStorage.getItem('accessToken');

        const response = await axios.post('http://localhost:4000/api/sale/makeSale', data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            toast.success('Sale Successful', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
            setFormData({
                game_id: '',
                quantity_sold: '',
                total_price: ''
            });
        } else {
            toast.error('Sale Failed', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        }
    } catch (error) {
        console.error('Error making Sale', error);
        toast.error('Sale Failed as something went wrong', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
        });
    }
};


    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={makeSale} className="bg-white shadow-2xl shadow-blue-500 rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantitysold">
                        Quantity Sold
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="quantity_sold" id="quantitysold" value={data.quantity_sold} onChange={handleChange} />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="total_price">
                        Total Price
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="total_price" id="totalprice" value={data.total_price} onChange={handleChange} />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="game">
                        Game
                    </label>
                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="game_id" id="game" value={data.game_id} onChange={handleChange}>
                <option key="" value="">Select Game</option>
                {records.map((game) => (
                    <option key={game.id} value={game.id}>
                          {game.game_name}
                       </option>
                    ))}
                   </select>

                </div>

                <div>
                    <button type="submit" className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-5">
                        Make Sale
                    </button>
                </div>
                <ToastContainer/>
            </form>
        </div>
    )
}

export default CustomerSale;