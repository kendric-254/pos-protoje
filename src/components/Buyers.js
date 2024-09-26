import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const MakeProductSaleForm = () => {
    const [data, setFormData] = useState({
        quantity_sold: '',
        total_price: '',
        product_id: '', // Changed from game_id to product_id
        sale_date: new Date() 
    });

    const [records, setProducts] = useState([]); // Changed from setGames to setProducts
    const [receipt, setReceipt] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getProducts = async () => { // Changed from getGames to getProducts
        try {
            const response = await axios.get('http://localhost:4000/api/product/getAllProducts'); // Updated endpoint
            setProducts(response.data);
        } catch (error) {
            console.log('Error Getting Products', error);
            toast.error('Error Getting Products', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const makeProductSale = async (e) => { // Changed from makeSale to makeProductSale
        e.preventDefault();

        try {
            const newData = { ...data, sale_date: new Date() }; 

            const response = await axios.post('http://localhost:4000/api/sale/makeProductSale', newData); // Updated endpoint
            if (response.status === 200) {
                toast.success('Sale Successful', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000
                });
                // Generate receipt
                setReceipt({
                    ...response.data,
                    company_name: "PRODUCT BOX", // Changed from GAME BOX to PRODUCT BOX
                    sale_date: new Date() 
                });
                setFormData({
                    quantity_sold: '',
                    total_price: '',
                    product_id: '', // Changed from game_id to product_id
                    sale_date: new Date() 
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
        <div className="w-full max-w-8xl max-h-full mx-auto mt-48 lg:mt-28 font-serif">
            <div className="shadow-lg shadow-gray-900 rounded-lg p-10 lg:p-12 max-w-xl mt-28 lg:mt-1 mx-auto">
                <form onSubmit={makeProductSale} className="">
                    <div className="">
                        <label className="block te text-lg font-bold mb-6" htmlFor="product">
                            Welcome To Product Box
                        </label>
                        <select
                            className="bg-gray-100 shadow shadow-gray-200 appearance-none border border-gray-100 rounded-lg w-full py-3 px-4 te leading-tight focus:outline-none focus:shadow-outline mb-4"
                            name="product_id" // Changed from game_id to product_id
                            id="product" // Changed from game to product
                            value={data.product_id}
                            onChange={handleChange}
                        >
                            <option key="" value="" className="px-10">
                                Select Product
                            </option>
                            {records.map((product) => ( // Changed from game to product
                                <option key={product.id} value={product.product_id}>
                                    {product.product_name} - {product.price} // Changed from game_name to product_name
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block te text-lg font-bold mb-2" htmlFor="quantitysold">
                            Quantity Sold
                        </label>
                        <input
                            className="shadow shadow-gray-200 appearance-none border border-gray-200 bg-gray-50 rounded-lg w-full py-3 px-4 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            name="quantity_sold"
                            id="quantitysold"
                            value={data.quantity_sold}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block te text-lg font-bold mb-2" htmlFor="total_price">
                            Total Price
                        </label>
                        <input
                            className="shadow shadow-gray-200 appearance-none border border-gray-200 bg-gray-100 rounded-lg w-full py-3 px-4 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            name="total_price"
                            id="totalprice"
                            value={data.total_price}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block te text-lg font-bold mb-2" htmlFor="sale_date">
                            Sale Date
                        </label>
                        <input
                            className="shadow shadow-gray-200 appearance-none border border-gray-200 bg-gray-100 rounded-lg w-full py-3 px-4 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                            type="date"
                            name="sale_date"
                            id="sale_date"
                            value={data.sale_date}
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

            {/* Display Receipt for products */}

            {receipt && (
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
                    <div className="flex justify-between mb-4">
                        <p className="font-semibold">Date :</p>
                        <p>{new Date(receipt.sale_date).toLocaleDateString()}</p>
                    </div>
                    <hr className="border-gray-400 my-4" />
                    <p className="text-sm text-center">Thank you for choosing our store! We hope you enjoy your purchase.</p>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default MakeProductSaleForm;
