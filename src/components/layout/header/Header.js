import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';

const Header = (props) => {
    return (
        <header className="Header">
            <nav className="header-navigation-wrapper">
                <Link className="logo-link" to="/">Logo</Link>
                <ul className="navigation-list">
                    <li className="navigation-item">
                        <Link className="navigation-link" to="/articles">Articles</Link>
                    </li>
                    {
                        props.user.isLoggedIn
                            ? <li className="navigation-item" >
                                <Link className="navigation-link" to="/article-creation">Create</Link>
                            </li>
                            : null
                    }
                    <li className="navigation-item">
                        <Link className="navigation-link" to="/contact">Contact</Link>
                    </li>
                    <li className="navigation-item">
                        {
                            !props.user.isLoggedIn
                                ? <Link className="navigation-link" to="/login">Log In</Link>
                                : <Link className="navigation-link" to="/logout">Log Out</Link>
                        }
                    </li>
                    {
                        props.user.isLoggedIn
                            ? <li className="navigation-item" >{props.user.model.username}</li>
                            : null
                    }
                </ul>
            </nav>
        </header>
    );
}

const mapStateToProps = state => {

    const user = state.user;

    return {
        user
    };
};

export default connect(mapStateToProps, null)(Header);
