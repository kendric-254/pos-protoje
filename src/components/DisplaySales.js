import axios from "axios";
import { useEffect, useState } from "react";

const DisplaySales = () => {
    const [salesRecords, setSalesRecords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(8);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/sale/getAllSales');
                let salesData = res.data;
                salesData.sort((a, b) => new Date(b.sale_date) - new Date(a.sale_date));
                
                const updatedSales = await Promise.all(salesData.map(async (sale) => {
                    const gameRes = await axios.get(`http://localhost:4000/api/game/getGame/${sale.game_id}`);
                    return { ...sale, game_name: gameRes.data.game_name, image: gameRes.data.image };
                }));
                
                setSalesRecords(updatedSales);
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    console.log(err.response.data);
                } else {
                    console.error('Error fetching sales data:', err);
                }
            }
        };

        fetchSalesData();
    }, []);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentSalesRecords = salesRecords.slice(indexOfFirstRecord, indexOfLastRecord);

    const handlePagination = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="justify-center items-center mt-48 lg:mt-28 max-h-7xl">
            <h1 className="text-5xl font-bold text-center mt-24">Sales Page</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 font-serif justify-between">
                {currentSalesRecords.map((sale, index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-lg hover:shadow-lg transition duration-1000 ease-in-out bg-gray-100 shadow-gray-700 mx-6 mt-7 mb-7">
                        <img src={sale.image} alt={sale.game_name} className="w-full h-48 object-cover" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{sale.game_name} - KES {sale.price}</div>
                            <p className="mb-2">Quantity Sold: {sale.quantity_sold}</p>
                            <p className="mb-2">Total Price: KES {sale.total_price}</p>
                            <p className="mb-2">Sale Date: {new Date(sale.sale_date).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                recordsPerPage={recordsPerPage}
                totalRecords={salesRecords.length}
                paginate={handlePagination}
            />
        </div>
    );
};

const Pagination = ({ recordsPerPage, totalRecords, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="mt-4" aria-label="Pagination">
            <ul className="pagination flex justify-center text-center">
                <h1 className="text-3xl">Page </h1>
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <button 
                            onClick={() => paginate(number)} 
                            className="page-link text-4xl font-bold text-blue-500 hover:text-blue-700 focus:outline-none"
                            style={{ marginRight: "0.5rem" }} // Add margin to the right
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default DisplaySales;
