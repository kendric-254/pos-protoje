// import axios from "axios";
// import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom/cjs/react-router-dom.min";

// const SalesTable = () => {
//     const [records, setRecords] = useState([]);
//     // const {id} = useParams()

//     useEffect(() => {
//         axios.get('http://localhost:4000/api/sale/getAllSales')
//             .then(res => { setRecords(res.data) })
//             .catch(err => {
//                 if (err.response.status === 403) {
//                     // Handle unauthorized access error
//                 }
//             });
//     }, []);

//     // const handleDelete = (e) => {
//     //     e.preventdefault();
//     //     axios.delete(`http://localhost:4000/api/student/deleteStudent/${id}`)
//     //         .then(() => {
//     //             // Filter out the deleted student from the records
//     //             setRecords(records.filter(student => student.id !== id));
//     //             console.log(`Student with ID ${id} deleted successfully.`);
//     //         })
//     //         .catch(err => {
//     //             console.error("Error deleting student:", err);
//     //         });
//     // };

//     // const handleUpdate = (records) => { 
//     //     axios.put(`http://localhost:4000/api/student/updateStudent/${id}`, records)
//     //        .then(() => {
//     //             // Filter out the updated student from the records
//     //             setRecords(records.filter(student => student.id !== id));
//     //             console.log(`Student with ID ${id} updated successfully.`);
//     //         })
//     //        .catch(err => {
//     //             console.error("Error updating student:", err);
//     //         });
//     // }

//     return (
//         <table className="items-center text-center min-w-full divide-y divide-gray-200">
//             <thead>
//                 <tr>
//                     <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">First Name</th>
//                     <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
//                     <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Gender</th>
//                     <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Course</th>
//                     {/* <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</th> */}
//                 </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//                 {records && records.map((r, i) => (
//                     <tr key={i}>
//                         <td>{r.quantity_sold}</td>
//                         <td>{r.total_price}</td>
//                         <td>{r.game_id}</td>
//                         {/* <td>
//                             <button onClick={() => handleDelete(r.id)} className="text-red-500 hover:text-red-700">Delete</button>
//                         </td> */}
//                         {/* <td> */}
//                             {/* <button onClick={handleUpdate(r)} className="text-blue-500 hover:text-blue-700">Update</button> */}
//                         {/* </td> */}
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// };

// export default SalesTable;


import React, { useState, useEffect } from 'react';

const SalesTable = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Fetch sales data from the API
    fetch('http://localhost:4000/api/sale/getAllSales')
      .then(response => response.json())
      .then(data => setSalesData(data))
      .catch(error => console.error('Error fetching sales data:', error));
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sales Data</h1>
      <table className="w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Sale ID</th>
            <th className="px-4 py-2">Quantity Sold</th>
            <th className="px-4 py-2">Total Price</th>
            <th className="px-4 py-2">Game ID</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map(sale => (
            <tr key={sale.sale_id} className="bg-white">
              <td className="border px-4 py-2">{sale.sale_id}</td>
              <td className="border px-4 py-2">{sale.quantity_sold}</td>
              <td className="border px-4 py-2">{sale.total_price}</td>
              <td className="border px-4 py-2">{sale.game_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
