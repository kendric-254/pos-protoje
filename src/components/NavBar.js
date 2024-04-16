import {  faBellConcierge, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {

    return (
       <nav  className="navbar bg-gray-500 flex flex-col lg:flex-row w-auto items-center ml-0  p-5">
            {/* Left section */}
            <div className="mr-0 lg:mr-5">
            <h1 className="text-2xl lg:text-3xl">Categories</h1>
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
            
            <div className="flex space-x-5 ml-0 lg:ml-40">
                <h1 className="text-3xl"><FontAwesomeIcon icon={faEnvelopeOpen} /></h1>
                <h1 className="text-3xl"><FontAwesomeIcon icon={ faBellConcierge} /></h1>
            </div>
</nav>

    );
};

export default Navbar;
