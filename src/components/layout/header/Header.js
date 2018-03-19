import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="Header">
            <nav className="header-navigation-wrapper">
                <Link className="logo-link" to="/">Logo</Link>
                <ul className="navigation-list">
                    <li className="navigation-item">
                        <Link className="navigation-link" to="/articles">Articles</Link>
                    </li>
                    <li className="navigation-item">
                        <Link className="navigation-link" to="/contact">Contact</Link>
                    </li>
                    <li className="navigation-item">
                        <Link className="navigation-link" to="/login">Log In</Link>
                    </li> 
                </ul>                
            </nav>
        </header>
    );
}

export default Header;
