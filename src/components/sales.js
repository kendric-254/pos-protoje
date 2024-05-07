import axios from "axios";
import { useEffect, useState } from "react";

const DisplaySales = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/sale/getAllSales')
            .then(res => {
                const salesData = res.data;
                Promise.all(salesData.map(sale =>
                    axios.get(`http://localhost:4000/api/game/getGame/${sale.game_id}`) // Modify the endpoint URL
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
        <div className="flex justify-center items-center">
            <table className="w-full sm:w-auto bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-lg font-semibold text-gray-500 uppercase tracking-wider">Game Name</th>
                        <th className="px-6 py-3 text-lg font-semibold text-gray-500 uppercase tracking-wider">Quantity Sold</th>
                        <th className="px-6 py-3 text-lg font-semibold text-gray-500 uppercase tracking-wider">Total Price</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-blue-200">
                    {records.map((r, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                            <td className="px-6 py-4 text-lg text-gray-700">{r.game_name}</td>
                            <td className="px-6 py-4 text-lg text-gray-700">{r.quantity_sold}</td>
                            <td className="px-6 py-4 text-lg text-gray-700">{r.total_price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DisplaySales;
