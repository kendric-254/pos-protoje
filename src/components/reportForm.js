import React, { useState } from 'react';

const GameShop = () => {
  const initialStock = [
    { id: 1, name: 'The Witcher 3 : Wild Hunt', price: 20, quantity: 10 },
    { id: 2, name: 'CyberPunk 2077', price: 30, quantity: 15 },
    { id: 3, name: 'Red Dead Redemption 2', price: 25, quantity: 5 },
  ];

  const [stock, setStock] = useState(initialStock);
  const [purchases, setPurchases] = useState([]);

  const handlePurchase = (id) => {
    const updatedStock = stock.map((item) => {
      if (item.id === id && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setStock(updatedStock);

    const purchasedItem = stock.find((item) => item.id === id);
    if (purchasedItem) {
      setPurchases([...purchases, purchasedItem]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Game Shop</h1>
      <div>
        <h2 className="text-xl font-semibold mb-2">Stock</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stock.map((item) => (
            <li key={item.id} className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold">{item.name}</h3>
                  <p className="text-gray-500 font-bold text-xl">${item.price} ({item.quantity} in stock)</p>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md" onClick={() => handlePurchase(item.id)}>Purchase</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Purchases</h2>
        <ul>
          {purchases.map((item, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-lg mb-2">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-500">${item.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GameShop;
