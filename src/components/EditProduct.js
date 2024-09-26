import { useState } from "react";
import axios from "axios";

const EditProduct = ({ product, onClose, onUpdate }) => {
  const [productName, setProductName] = useState(product.product_name);
  const [quantityInStock, setQuantityInStock] = useState(product.quantity_in_stock);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);

  const token = sessionStorage.getItem("accessToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`http://localhost:4000/api/product/updateProduct/${product.product_id}`, {
        product_name: productName,
        quantity_in_stock: quantityInStock,
        price,
        image,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      onUpdate();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full text-gray-900 lg:mt-0">
      <label className="block mt-3 text-xl lg:text-4xl font-bold">Product Name:</label>
      <input
        type="text"
        className="w-full mb-6 p-2 lg:p-5 bg-gray-200 rounded-md"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      
      <label className="block mb-4 text-xl lg:text-3xl font-bold">Quantity in Stock:</label>
      <input
        type="number"
        className="w-full mb-6 p-2 lg:p-5 bg-gray-200 rounded-md"
        value={quantityInStock}
        onChange={(e) => setQuantityInStock(e.target.value)}
      />
      
      <label className="block mb-4 text-xl lg:text-3xl font-bold">Price:</label>
      <input
        type="number"
        className="w-full mb-6 p-2 lg:p-5 bg-gray-200 rounded-md"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      
      <label className="block mb-4 text-xl lg:text-3xl font-bold">Image URL:</label>
      <input
        type="text"
        className="w-full mb-8 p-2 lg:p-5 bg-gray-200 rounded-md"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      
      <div className="flex justify-end">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded text-sm">Save Changes</button>
        <button type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded ml-4" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default EditProduct;
