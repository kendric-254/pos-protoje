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
                        .then(res => ({ ...sale, game_name: res.data.game_name }))
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
      <div className="flex justify-center items-center mt-10 lg:mt-36">
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {records.map((game, i) => (
      <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{game.game_name}</div>
          <p className="text-gray-700 text-base mb-2">Quantity Sold: {game.quantity_sold}</p>
          <p className="text-gray-700 text-base mb-2">Total Price: {game.total_price}</p>
        </div>
      </div>
    ))}
  </div>
</div>


    );
};

export default DisplaySales;
