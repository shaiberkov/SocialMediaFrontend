
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faPlus, faSearch, faUserCircle} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const location = useLocation(); // לקבל את ה-URL הנוכחי

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link
                    to="/search"
                    className={location.pathname === "/search" ? "active" : ""} // מסמן אם הדף הוא /search
                >
                    <FontAwesomeIcon icon={faSearch} />
                </Link>
                <Link
                    to="/profilepage"
                    className={location.pathname === "/profilepage" ? "active" : ""} // מסמן אם הדף הוא /1
                >

                    <FontAwesomeIcon icon={faUserCircle} />
                </Link>
                <Link
                    to="/postform"
                    className={location.pathname === "/postform" ? "active" : ""} //TODO
                >
                    <FontAwesomeIcon icon={faPlus} />
                </Link>
                <Link
                    to="/home"
                    className={location.pathname === "/home" ? "active" : ""} //TODO
                >
                    <FontAwesomeIcon icon={faHome} />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
