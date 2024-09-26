import React from "react";
import axios from "axios";

const DeleteProduct = ({ product, onClose, onDelete }) => {
  const token = sessionStorage.getItem("accessToken");

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/product/deleteProduct/${product.product_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      onDelete(); // Callback to update parent component state
      onClose();  // Close modal after deletion
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full text-sm text-gray-500 mt-3">
      <p className="mb-4">Are you sure you want to delete this product?</p>
      <div className="flex justify-end">
        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
        <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">Cancel</button>
      </div>
    </div>
  );
};

export default DeleteProduct;
