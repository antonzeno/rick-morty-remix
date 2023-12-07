import { NavLink, useLocation } from "@remix-run/react";
import logo from "../../public/logo.svg";

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
            <div className="container">
                <NavLink to="/" className="navbar-brand">
                    <img src={logo} alt="Logo" width={125} />
                </NavLink>
                <div className="navbar-nav me-auto d-sm-flex flex-row d-none">
                    <NavLink to="/" className={({ isActive }) => `mx-3 rounded-pill ${isActive ? "btn btn-dark" : "nav-link"}`}>
                        Home
                    </NavLink>
                    <NavLink to="/locations" className={({ isActive }) => `mx-3 rounded-pill ${isActive ? "btn btn-dark" : "nav-link"}`}>
                        Locations
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
