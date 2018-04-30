import React from 'react';
import './Spinner.css';

const Spinner = () => {
    return (
        <section className="Spinner">
            <div className="spinner-wrapper">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
            <div className="spinner-inscription">
                Loading...
            </div>
        </section>
    )
};

export default Spinner;