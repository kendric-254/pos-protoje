

import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const MakeSaleForm = () => {
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
            const response = await axios.post('http://localhost:4000/api/sale/makeSale', data);
            if (response.status === 200) {
                toast.success('Sale Successful', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000
                });
                setFormData({
                    quantity_sold: '',
                    total_price: '',
                    game_id: ''
                });
            } else {
                toast.error('Sale Failed', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.message === "Quantity sold exceeds quantity in stock") {
                toast.error('Quantity sold exceeds quantity in stock', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000
                });
            } else {
                console.error('Error making Sale', error);
                toast.error('Sale Failed as something went wrong', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000
                }); 
            }
        }
    };

    // const makeSale = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await axios.post('http://localhost:4000/api/sale/makeSale', data);
    //         if (response.status === 200) {
    //             toast.success('Sale Successful', {
    //                 position: toast.POSITION.TOP_RIGHT,
    //                 autoClose: 3000
    //             });
    //             setFormData({
    //                 quantity_sold: '',
    //                 total_price: '',
    //                 game_id: ''
    //             });
    //         } else {
    //             toast.error('Sale Failed', {
    //                 position: toast.POSITION.TOP_RIGHT,
    //                 autoClose: 3000
    //             });
    //         }
    //     } catch (error) {
    //         console.error('Error making Sale', error);
    //         toast.error('Sale Failed as something went wrong', {
    //             position: toast.POSITION.TOP_RIGHT,
    //             autoClose: 3000
    //         });
    //     }
    // };

    return (
        <div className="w-full max-w-md mx-auto mt-56 lg:mt-24">
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
                    <option key={game.id} value={game.game_id} >
                          {game.game_id} - {game.game_name}
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

export default MakeSaleForm;