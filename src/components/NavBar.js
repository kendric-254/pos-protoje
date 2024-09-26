import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useAuth } from "./AuthContext";

const Navbar = () => {
    const { logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const history = useHistory();

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to log out?');
        if (confirmLogout) {
            logout();
            sessionStorage.clear();
            history.push('/'); // Redirect to home or login page after logout
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery) {
            history.push(`/data?sale_date=${searchQuery}`);
        } else {
            alert('Please select a date to search.');
        }
    };

    return (
        <nav className="navbar bg-gradient-to-r from-purple-500 to-pink-500 flex flex-col lg:flex-row w-full items-center p-4 top-0 z-20 fixed shadow-lg">
            <div className="mr-0 lg:mr-5">
                <h1 className="text-2xl lg:text-3xl text-white font-bold">Welcome</h1>
            </div>
            <div className="form flex-1">
                <form className="flex items-center" onSubmit={handleSearch}>
                    <input 
                        type="date" 
                        className="bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="ml-2 bg-green-600 hover:bg-green-700 transition duration-300 text-white rounded-xl p-2 shadow-md">
                        Search
                    </button>
                </form>
            </div>
            <div className="ml-0 lg:ml-4">
                <button className="bg-red-600 hover:bg-red-700 transition duration-300 text-white rounded-xl p-2 shadow-md" onClick={handleLogout}>
                    Log Out
                </button>
            </div>            
        </nav>
    );
};

export default Navbar;
