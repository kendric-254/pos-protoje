import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Navbar = () => {
    const history = useHistory();

    const handleRegisterClick = () => {
        history.push("/registrationForm");
    };

    const handleLoginClick = () => {
        history.push("/loginForm");
    };

    return (
        <nav className="navbar">
            <div className="links">
            </div>
             <div className="auth-buttons">
                <button 
                    onClick={handleRegisterClick}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
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
        </nav>
    );
};

export default Navbar;
