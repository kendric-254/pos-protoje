import {  faBellConcierge, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Navbar = () => {
    // const history = useHistory();

    // const handleRegisterClick = () => {
    //     history.push("/registrationForm");
    // };

    // const handleLoginClick = () => {
    //     history.push("/loginForm");
    // };

    return (
       <nav  className="navbar bg-gray-500 flex flex-col lg:flex-row w-auto items-center ml-0  p-5">
            {/* Left section */}
            <div className="mr-0 lg:mr-56">
            <h1 className="text-2xl lg:text-3xl">Categories</h1>
        </div>
            <div className="form ">
        <form className="flex items-center">
            <input 
                type="text" 
                placeholder="Search" 
                className="border border-gray-300 rounded-md py-2 px-0 lg:px-96 focus:outline-none focus:ring focus:border-blue-300"
            />
        </form>
            </div>
            
            <div className="flex space-x-5 ml-0 lg:ml-96">
                <h1 className="text-3xl"><FontAwesomeIcon icon={faEnvelopeOpen} /></h1>
                <h1 className="text-3xl"><FontAwesomeIcon icon={ faBellConcierge} /></h1>
            </div>

    {/* Right section */}
    {/* <div className="links flex items-center space-x-4">
        <div className="auth-buttons">
            <button 
                onClick={handleRegisterClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Register
            </button>
            <button 
                onClick={handleLoginClick}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Login
            </button>
        </div>
    </div> */}
</nav>

    );
};

export default Navbar;
