import React, {Component, Fragment} from 'react';
import './NotFound.css';

class NotFound extends Component {
    render() {
        return (
            <section className="NotFound">
                <h2 className="header-404">404</h2>
                <h2 className="notfound-header">The page you are looking for is not found</h2>
                <div className="lds-hourglass"></div>
            </section>
        );
    }
} 

export default NotFound;