import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Import useAuth hook

function ProductShop() {
  const [records, setProductsData] = useState([]); // State to hold product data
  const { userRole } = useAuth();
  const [showAddProductModal, setShowAddProductModal] = useState(false); // Modal state for adding products
  const [newProductData, setNewProductData] = useState({ // State for new product data
    product_name: '',
    price: '',
    image: ''
  });

  useEffect(() => {
    // Fetch all products on component mount
    axios.get('http://localhost:4000/api/product/getAllProducts')
      .then(response => setProductsData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/product/addProduct', newProductData);
      console.log('New product added:', response.data);
      // Refresh product data after adding new product
      axios.get('http://localhost:4000/api/product/getAllProducts')
        .then(response => setProductsData(response.data))
        .catch(error => console.error('Error fetching data:', error));
      setShowAddProductModal(false); // Close modal after adding product
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleNewProductDataChange = (e) => {
    const { name, value } = e.target;
    setNewProductData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="dashboard rounded-sm p-5 mt-20 lg:mt-20 ">
      <div className="container font-serif"> 
        <h1 className="text-3xl font-bold mb-6 mt-24 lg:mt-4 text-center">Dashboard</h1>
        {userRole === 'admin' && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-3 rounded"
            onClick={() => setShowAddProductModal(true)} // Show modal to add product
          >
            Add Product
          </button>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {records.map((product, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition duration-1000 ease-out bg-gray-100 shadow-gray-700 p-6 ">
              <h2 className="text-4xl font-semibold mb-3 text-opacity-100">{product.product_name}</h2>
              <p className="text-2xl font-extrabold mb-3">Price: KES {product.price}</p>
              <img
                src={product.image}
                alt={product.product_name}
                className="w-full rounded-xl h-auto mb-3"
                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </div>
      {showAddProductModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80">
          <div className="bg-white p-16 lg:p-20 mt-28 lg:mt-20 rounded-lg" style={{ width: '500px', height: 'auto' }}>
            <h2 className="text-4xl font-bold mb-6 text-center">Add New Product</h2>
            <form onSubmit={handleAddProduct}>
              <div className="mb-6">
                <label htmlFor="product_name" className="block text-2xl font-bold mb-2">Product Name</label>
                <input
                  type="text"
                  id="product_name"
                  name="product_name"
                  value={newProductData.product_name}
                  onChange={handleNewProductDataChange}
                  className="input-field w-full p-4 bg-gray-200 rounded-md"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="quantity_in_stock" className="block text-2xl font-bold mb-2">Quantity</label>
                <input
                  type="text"
                  id="quantity_in_stock"
                  name="quantity_in_stock"
                  value={newProductData.quantity_in_stock}
                  onChange={handleNewProductDataChange}
                  className="input-field w-full p-4 bg-gray-200 rounded-md"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="price" className="block text-2xl font-bold mb-2">Price</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={newProductData.price}
                  onChange={handleNewProductDataChange}
                  className="input-field w-full p-4 bg-gray-200 rounded-md"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="image" className="block text-2xl font-bold mb-2">Image URL</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={newProductData.image}
                  onChange={handleNewProductDataChange}
                  className="input-field w-full p-4 bg-gray-200 rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
                >
                  Add Product
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)} // Close modal
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded ml-4"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductShop; // Export component
