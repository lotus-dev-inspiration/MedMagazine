import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="Footer">
            <p className="footer-content">
                <span className="footer-madeby">Made by</span> 
                <a className="footer-link" href="https://github.com/Spyrot" target="_blank"> Spyrot</a>
                <a className="footer-link" href="https://github.com/vladshyrinov" target="_blank"> Vlad.Shyrinov</a>
                <a className="footer-link" href="https://github.com/valentine1004" target="_blank"> Valentine1004</a> 
            </p>
        </footer>
    );
}

export default Footer;
