import React from 'react';

const SalesPage = () => {
    // Dummy sales data
    const salesData = [
        { id: 1, game: 'The Witcher 3: Wild Hunt', quantity: 10, price: 29.99 },
        { id: 2, game: 'Cyberpunk 2077', quantity: 5, price: 49.99 },
        { id: 3, game: 'Red Dead Redemption 2', quantity: 8, price: 39.99 },
        // Add more sales data as needed
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl lg:text-4xl font-semibold mb-4">Sales</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Game</th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {salesData.map(sale => (
                            <tr key={sale.id}>
                                <td className="px-4 md:px-6 py-3 whitespace-nowrap">{sale.id}</td>
                                <td className="px-4 md:px-6 py-3 whitespace-nowrap">{sale.game}</td>
                                <td className="px-4 md:px-6 py-3 whitespace-nowrap">{sale.quantity}</td>
                                <td className="px-4 md:px-6 py-3 whitespace-nowrap">${sale.price}</td>
                                <td className="px-4 md:px-6 py-3 whitespace-nowrap">${(sale.quantity * sale.price).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesPage;
