import React from "react";
import { faBellConcierge, faEnvelopeOpen, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import { useAuth } from "./AuthContext";

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to log out');
        if (confirmLogout) {
            logout();
             sessionStorage.clear();
        }
    };

    return (
        <nav className="navbar text-white bg-blue-950 flex flex-col lg:flex-row w-full items-center ml-0  p-5 top-0 z-20 fixed">
            {/* Left section */}
            <div className="mr-0 lg:mr-5">
                <h1 className="text-2xl lg:text-3xl">Welcome </h1>
            </div>
            <div className="form ">
                <form className="flex items-center">
                    <input 
                        type="text" 
                        placeholder="Search" 
                        className="border border-gray-300 rounded-md py-2 ml-0 lg:ml-60 px-0 lg:px-80 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </form>
            </div>
            
            <div className="flex space-x-5 ml-0 lg:ml-20">
                <h1 className="text-3xl"><FontAwesomeIcon icon={faEnvelopeOpen} /></h1>
                <h1 className="text-3xl"><FontAwesomeIcon icon={faBellConcierge} /></h1>
            </div>

            {isLoggedIn ? (
                <div className="mt-3 lg:mt-0 ml-0 lg:ml-12">
                    <button className="bg-lime-700 text-white rounded-xl p-2" onClick={handleLogout}>
                        Log Out
                    </button>
                     {/* <button className="bg-blue-700 text-white rounded-xl ml-1">
                        <Link to="/registerForm" className="block py-2 px-4 mt-0">Register</Link>
                        </button> */}
                    {
                        <h1 className="text-5xl float-right ml-5 lg:ml-10
                        "><FontAwesomeIcon icon={faUserCircle} /></h1>
                    }
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


// import {  faBellConcierge, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link } from 'react-router-dom';

// const Navbar = () => {

//     return (
//        <nav  className="navbar bg-gray-500 flex flex-col lg:flex-row w-auto items-center ml-0  p-5">
//             {/* Left section */}
//             <div className="mr-0 lg:mr-5">
//             <h1 className="text-2xl lg:text-3xl">Categories</h1>
//         </div>
//             <div className="form ">
//         <form className="flex items-center">
//             <input 
//                 type="text" 
//                 placeholder="Search" 
//                 className="border border-gray-300 rounded-md py-2 ml-0 lg:ml-60 px-0 lg:px-80 focus:outline-none focus:ring focus:border-blue-300"
//             />
//         </form>
//             </div>
            
//             <div className="flex space-x-5 ml-0 lg:ml-24">
//                 <h1 className="text-3xl"><FontAwesomeIcon icon={faEnvelopeOpen} /></h1>
//                 <h1 className="text-3xl"><FontAwesomeIcon icon={ faBellConcierge} /></h1>
//             </div>

//             <div className="ml-0 lg:ml-12">
//                <button className="bg-lime-700 text-white rounded-xl" > <Link to="/loginAdmin"
//                     className="block py-2 px-4 mt-0 ">Login</Link>
//                     </button>
//             </div>

//             <div className="ml-0 lg:ml-3">
//                <button className="bg-lime-700 text-white rounded-xl" > <Link to="/"
//                     className="block py-2 px-4 mt-0 ">Log Out</Link>
//                     </button>
//             </div>

// </nav>

//     );
// };

// export default Navbar;
