import React, { useState } from "react";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from 'react-router-dom';
// import axios from 'axios';
import { useAuth } from "./AuthContext";

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const history = useHistory();

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to log out');
        if (confirmLogout) {
            logout();
            sessionStorage.clear();
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`/data?sale_date=${searchQuery}`);
    };

    return (
        <div>
            <nav className="navbar text-white bg-blue-950 flex flex-col lg:flex-row w-full items-center ml-0 p-5 top-0 z-20 fixed">
                {/* Left section */}
                <div className="mr-0 lg:mr-5">
                    <h1 className="text-2xl lg:text-3xl">Welcome</h1>
                </div>
                <div className="form">
                    <form className="flex items-center" onSubmit={handleSearch}>
                        <input 
                            type="date" 
                            placeholder="Search by Date" 
                            className="bg-gray-800 border text-white border-gray-700 rounded-md py-2 ml-0 lg:ml-60 px-0 lg:px-80 focus:outline-none focus:ring focus:border-blue-300"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="ml-2 bg-lime-700 text-white rounded-xl p-2">Search</button>
                    </form>
                </div>

                <div className="ml-0 lg:ml-40">
                    <button className="bg-lime-700 text-white rounded-xl p-2 ml-3" onClick={handleLogout}>
                        Log Out
                    </button>
                </div>            

                {isLoggedIn ? (
                    <div className="mt-3 lg:mt-0 ml-0 lg:ml-12 flex items-center">
                        <label htmlFor="profile-picture-upload">
                            <div className="relative">
                                <FontAwesomeIcon icon={faUserCircle} className="text-4xl cursor-pointer" />
                            </div>
                        </label>
                    </div>
                ) : (
                    <div className="ml-0 lg:ml-12">
                        <button className="bg-lime-700 text-white rounded-xl">
                            <Link to="/loginAdmin" className="block py-2 px-4 mt-0">Login</Link>
                        </button>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
