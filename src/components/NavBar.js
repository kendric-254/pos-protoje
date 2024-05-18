import React, { useState } from "react";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import { useAuth } from "./AuthContext";

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();
    const [profilePicture, setProfilePicture] = useState(null);

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to log out');
        if (confirmLogout) {
            logout();
            sessionStorage.clear();
        }
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // You may want to add validation for file type and size here
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <nav className="navbar text-white bg-blue-950 flex flex-col lg:flex-row w-full items-center ml-0 p-5 top-0 z-20 fixed">
            {/* Left section */}
            <div className="mr-0 lg:mr-5">
                <h1 className="text-2xl lg:text-3xl">Welcome</h1>
            </div>
            <div className="form">
                <form className="flex items-center">
                    <input 
                        type="text" 
                        placeholder="Search" 
                        className="bg-gray-800 border text-white border-gray-700 rounded-md py-2 ml-0 lg:ml-60 px-0 lg:px-80 focus:outline-none focus:ring focus:border-blue-300"
                    />
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
                            {profilePicture ? (
                                <img src={profilePicture} alt="Profile" className="w-20 h-18 rounded-full cursor-pointer" />
                            ) : (
                                <FontAwesomeIcon icon={faUserCircle} className="text-4xl cursor-pointer" />
                            )}
                            <input 
                                type="file" 
                                id="profile-picture-upload" 
                                accept="image/*" 
                                onChange={handleProfilePictureChange} 
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
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
    );
};

export default Navbar;
