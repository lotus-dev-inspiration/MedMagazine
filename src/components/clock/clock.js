import React, { Component } from 'react';

export default class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            lasersActivated: false
        };
        this.activateLasers = this.activateLasers.bind(this);
    }

    componentDidMount() {
        this.timerId = setInterval(() => {
            this.tick();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    activateLasers() {
        this.setState((prevState, props) => {
            return {
                lasersActivated: !prevState.lasersActivated
            }
        });
    }

    render() {
        return (
            <div>
                <h1>It is {this.state.date.toLocaleTimeString()}</h1>
                <button onClick={this.activateLasers}>
                    Activate Lasers
                </button>
                <div>
                    { this.state.lasersActivated ? <p>On</p> : <p>Off</p>}
                </div>
            </div>
        );
    }
}