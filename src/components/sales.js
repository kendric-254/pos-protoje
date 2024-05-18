import axios from "axios";
import { useEffect, useState } from "react";

const DisplaySales = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/sale/getAllSales')
            .then(res => {
                const salesData = res.data;
                Promise.all(salesData.map(sale =>
                    axios.get(`http://localhost:4000/api/game/getGame/${sale.game_id}`)
                        .then(res => ({ ...sale, game_name: res.data.game_name, image: res.data.image }))
                ))
                    .then(updatedSales => {
                        setRecords(updatedSales);
                    })
                    .catch(err => {
                        console.error('Error fetching game names:', err);
                    });
            })
            .catch(err => {
                if (err.response && err.response.status === 404) {
                    console.log(err.response.data);
                } else {
                    console.error('Error fetching sales data:', err);
                }
            });
    }, []);

    return (
      <div className="justify-center items-center mt-80 lg:mt-28 ">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 font-serif justify-between bg-gray-900">
                {records.map((game, i) => (
                    <div key={i} className="rounded-lg overflow-hidden shadow-lg hover:shadow-lg transition duration-1000 ease-in-out bg-gray-800 shadow-gray-700 mx-5 mt-5">
                        <img src={game.image} alt={game.game_name} className="w-full h-48 object-cover"/>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 text-blue-300">{game.game_name}</div>
                            <p className="text-blue-300 mb-2">Quantity Sold: {game.quantity_sold}</p>
                            <p className="text-blue-300 mb-2">Total Price: {game.total_price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisplaySales;
