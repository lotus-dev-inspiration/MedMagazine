import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './StartPage.css';

class StartPage extends Component {
    render() {
        return (
            <section className="StartPage">
                <Link className="startpage-link" to="/archive">Start Reading</Link>
            </section>
        );
    }
}

export default StartPage;