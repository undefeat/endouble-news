import React from 'react';
import './index.css';

function Footer() {
    return (
        <footer className="footer">
            <span>Powered by </span>
            <a className="footer__link" href="https://newsapi.org" rel="noopener noreferrer" target="_blank">
                NewsAPI.org
            </a>
        </footer>
    );
}

export default Footer;
