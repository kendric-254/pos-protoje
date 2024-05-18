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
    // const [receipt, setReceipt] = useState(null);

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
                // Generate receipt
                // setReceipt({
                //     ...response.data,
                //     company_name: "GAME BOX",
                // });
                setFormData({
                    image: '',
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

    return (
      <div className="w-full bg-gray-900 max-w-8xl max-h-full mx-auto mt-32 lg:mt-20 font-serif">
        <div className="bg-gray-800 shadow-lg shadow-gray-900 rounded-lg p-10 lg:p-12  max-w-xl mt-28 lg:mt-1  mx-auto">
        <form onSubmit={makeSale} className="">
                <div className="">
                    <label className="block text-blue-400 text-lg font-bold mb-6" htmlFor="game">
                        Welcome To Game Box
                    </label>
                    <select
                        className="bg-gray-800 shadow shadow-gray-700 appearance-none border border-gray-800 rounded-lg w-full py-3 px-4 text-blue-400 leading-tight focus:outline-none focus:shadow-outline mb-4"
                        name="game_id"
                        id="game"
                        value={data.game_id}
                        onChange={handleChange}
                    >
                        <option key="" value="">
                            Select Game
                        </option>
                        {records.map((game) => (
                            <option key={game.id} value={game.game_id}>
                                 {game.game_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-blue-400 text-lg font-bold mb-2" htmlFor="quantitysold">
                        Quantity Sold
                    </label>
                    <input
                        className="shadow shadow-gray-700 appearance-none border border-gray-800 bg-gray-800 rounded-lg w-full py-3 px-4 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name="quantity_sold"
                        id="quantitysold"
                        value={data.quantity_sold}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-blue-400 text-lg font-bold mb-2" htmlFor="total_price">
                        Total Price
                    </label>
                    <input
                        className="shadow shadow-gray-700 appearance-none border border-gray-800 bg-gray-800 rounded-lg w-full py-3 px-4 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name="total_price"
                        id="totalprice"
                        value={data.total_price}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                        Make Sale
                    </button>
                </div>
          </form>
          </div>
        
            {/* Display price of games */}
        <div className="bg-gray-800 container text-blue-400 max-w-5xl  lg:ml-96 mt-1 shadow-lg shadow-gray-800 rounded-lg p-3">
            <h2 className="text-3xl text-center font-bold mb-2">Game Prices</h2>
            <ul className="divide-y divide-gray-800">
                {records.map((game) => (
            <li key={game.game_id} className="py-2 flex justify-between ">
                <span className="text-lg font-bold">{game.game_name}</span>
                <span className="text-lg font-bold">KES {game.price}</span>
            </li>
                ))}
            </ul>
        </div>
        <br></br>

            {/* {receipt && (
                <div className="bg-white shadow-2xl rounded-lg p-8 mb-4">
                    <h2 className="text-2xl font-bold mb-4 text-center">Thank You for Your Purchase!</h2>
                    <div className="flex justify-between mb-4">
                        <p className="font-semibold">Company:</p>
                        <p>{receipt.company_name}</p>
                    </div>
                    <div className="flex justify-between mb-4">
                        <p className="font-semibold">Items Sold:</p>
                        <p>{receipt.quantity_sold}</p>
                    </div>
                    <div className="flex justify-between mb-4">
                        <p className="font-semibold">Total Price:</p>
                        <p>KES {receipt.total_price}</p>
                    </div>
                    <hr className="border-gray-400 my-4" />
                    <p className="text-sm text-center">Thank you for choosing our store! We hope you enjoy your purchase.</p>
                </div>
            )} */}
            <ToastContainer/>
        </div>
    );
}

export default MakeSaleForm;
