import { useLocation } from "@remix-run/react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.svg";

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <img src={logo} alt="Logo" width={125} />
                </Link>
                <div className="navbar-nav me-auto d-sm-flex flex-row d-none">
                    <Link
                        to="/"
                        className={`mx-3 rounded-pill ${location.pathname === "/" ? "btn btn-dark" : "nav-link"}`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/locations"
                        className={`mx-3 rounded-pill ${
                            location.pathname === "/locations" ? "btn btn-dark" : "nav-link"
                        }`}
                    >
                        Locations
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
