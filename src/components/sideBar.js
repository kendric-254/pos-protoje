import { faGauge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-gray-800 text-white w-64 flex-shrink-0 h-full">
            <div className="p-5 space-y-10">
                <h1 className="text-xl font-semibold mb-4">Game Shop Dashboard</h1>
                <ul className='space-y-20'>
                    <FontAwesomeIcon icon="fa-kit fa-my-icon" />
                    <li><Link to="/" className="block py-2 px-4"><FontAwesomeIcon icon={faGauge} /> Dashboard </Link></li>
                    <li><Link to="/sales" className="block py-2 px-4">Sales</Link></li>
                    <li><Link to="/inventory" className="block py-2 px-4">Inventory</Link></li>
                    <li><Link to="/customers" className="block py-2 px-4">Customers</Link></li>
                    <li><Link to="/reports" className="block py-2 px-4">Reports</Link></li>
                    <li><Link to="/settings" className="block py-2 px-4">Settings</Link></li>
                    
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
