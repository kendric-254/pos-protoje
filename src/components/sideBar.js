// import { faClipboard,faHome,  faPeopleArrows, faPowerOff, faTable } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Sidebar = () => {
//     return (
//         <div className=" ">
//             <div className="p-0 space-y-10 w-56">
//                 <h1 className="text-xl font-semibold mb-4 ml-5">Game Box</h1>
//                 <ul className='space-y-20  ml-1 font-bold text-sm lg:text-2xl '>
//                     <li><Link to="/dashboard" className="block py-2 px-4"><FontAwesomeIcon icon={faHome} /> Dashboard </Link></li>
//                     <li><Link to="/sales" className="block py-2 px-4"><FontAwesomeIcon icon={ faTable} /> Products</Link></li>
//                     {/* <li><Link to="/inventory" className="block py-2 px-4"><FontAwesomeIcon icon={faTable} /> Inventory</Link></li>                    */}
//                     <li><Link to="/customers" className="block py-2 px-4"><FontAwesomeIcon icon={faPeopleArrows } /> Customers</Link></li>
//                     <li><Link to="/reports" className="block py-2 px-4"><FontAwesomeIcon icon={faClipboard} /> Reports</Link></li>
//                     {/* logout */}
//                     <div>
//                     <li><Link to="/settings" className="block py-2 px-4 mt-40"><FontAwesomeIcon icon={faPowerOff } /> Log Out</Link></li>
//                     </div>
//                     </ul>
                    
//             </div>
//         </div>
//     );
// };

// export default Sidebar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTable, faPeopleArrows, faClipboard, faPowerOff, faBars } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`lg:w-60 bg-gray-600 min-h-screen fixed z-50 top-0 transition-all duration-300 ${isOpen ? 'w-full lg:w-56' : 'w-0'}`}>
            <div className="p-5 space-y-10">
                <h1 className="text-xl lg:text-4xl font-semibold mb-4 ">Game Box</h1>
                <ul className={`space-y-20 font-bold text-sm lg:text-2xl ${isOpen ? '' : 'hidden'} lg:block`}>
                    <li><Link to="/dashboard" className="block py-2 px-4"><FontAwesomeIcon icon={faHome} /> Dashboard </Link></li>
                    <li><Link to="/sales" className="block py-2 px-4"><FontAwesomeIcon icon={faTable} /> Products</Link></li>
                    <li><Link to="/customers" className="block py-2 px-4"><FontAwesomeIcon icon={faPeopleArrows} /> Customers</Link></li>
                    <li><Link to="/reports" className="block py-2 px-4"><FontAwesomeIcon icon={faClipboard} /> Reports</Link></li>
                    
                    <div>
                     <li><Link to="/settings" className="block py-2 px-4 mt-40"><FontAwesomeIcon icon={faPowerOff } /> Log Out</Link></li>
                     </div>
                </ul>
                <div className="flex justify-center lg:hidden">
                    <button onClick={toggleSidebar} className="focus:outline-none">
                        {isOpen ? (
                            <FontAwesomeIcon icon={faPowerOff} size="lg" />
                        ) : (
                            <FontAwesomeIcon icon={faBars} size="lg" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
