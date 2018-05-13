import React, {Component} from 'react';
import MagazinesFilter from 'components/magazines-filter/MagazinesFilter';
import './Archive.css';

class Archive extends Component {
    render() {
        return (
            <section className="Archive">
                <h1>Atricles' Archieve</h1>
                <MagazinesFilter/>
            </section>
        );
    }
} 

export default Archive;