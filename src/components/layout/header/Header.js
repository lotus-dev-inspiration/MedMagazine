import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openedSettings: false,
            openedMenu: false
        }

        this.userSettingsWrapperClasses = ['user-settings-wrapper'];
        this.menuClasses = ['navigation-list-mob'];
        this.menuSignClasses = ['menu-mob-btn', 'pointer'];
        this.settingsOpen = this.settingsOpen.bind(this);
        this.menuOpen = this.menuOpen.bind(this);
        this.allMenusClose = this.allMenusClose.bind(this);
    }


    settingsOpen() {
        
        if(!this.state.openedSettings) {
            this.userSettingsWrapperClasses.push("show");
        } else {
            this.userSettingsWrapperClasses.pop();
        }

        this.setState({
            openedSettings: !this.state.openedSettings
        });
    }

    menuOpen() {
        if(!this.state.openedMenu) {
            this.menuClasses.push("show");
            this.menuSignClasses.push("cross");
        } else {
            this.menuClasses.pop();
            this.menuSignClasses.pop();
        }
        
        this.setState({
            openedMenu: !this.state.openedMenu
        });
    }
    
    allMenusClose() {
        if(this.menuClasses.includes("show")) {
            this.menuClasses.pop();
            this.menuSignClasses.pop();
        }
        if(this.userSettingsWrapperClasses.includes("show")) {
            this.userSettingsWrapperClasses.pop();
        }

        this.setState({
            openedMenu: false,
            openedSettings: false
        });
    }
    
    render() {
        return (
        <header className="Header">
            <nav className="header-navigation-wrapper">
                <button className={this.menuSignClasses.join(' ')} onClick={this.menuOpen}>
                    <div className="bar bar1"></div>
                    <div className="bar bar2"></div>
                    <div className="bar bar3"></div>
                </button>  
                <Link onClick={this.allMenusClose} className="logo-link" to="/">Logo</Link>
                <ul className="navigation-list">
                    <li className="navigation-item">
                        <Link onClick={this.allMenusClose} className="navigation-link" to="/articles">Magazine</Link>
                    </li>
                        <li className="navigation-item">
                            <Link onClick={this.allMenusClose} className="navigation-link" to="/archive">Archieve</Link>
                        </li>
                    {
                            this.props.user.model
                            ? this.props.user.model.groups.length === 0 ? <li className="navigation-item" >
                                <Link onClick={this.allMenusClose} className="navigation-link" to="/article-creation">Create</Link>
                            </li>
                            : null : null
                    }
                    {
                            this.props.user.model
                            ? this.props.user.model.groups[0] === 2 || this.props.user.model.groups[0] === 1 ? <li className="navigation-item" >
                                <Link onClick={this.allMenusClose} className="navigation-link" to="/articles-review">Review</Link>
                            </li>
                            : null : null
                    }
                    <li className="navigation-item">
                        <Link onClick={this.allMenusClose} className="navigation-link" to="/contact">General requirements</Link>
                    </li>                 
                    <li className="navigation-item" >
                    {
                        this.props.user.isLoggedIn
                        ? <span onClick={this.settingsOpen} className="pointer navigation-link"> 
                            {this.props.user.model.username + ' '}
                            <i className="fa fa-angle-down"></i>
                        </span>
                        : <Link onClick={this.allMenusClose} className="navigation-link" to="/login">Log In</Link> 
                    }
                    </li>
                </ul>
                <ul className={this.menuClasses.join(" ")}>
                    <li className="navigation-item-mob">
                        <Link onClick={this.allMenusClose} className="navigation-link-mob" to="/articles">Magazine</Link>
                    </li>
                        <li className="navigation-item-mob">
                            <Link onClick={this.allMenusClose} className="navigation-link-mob" to="/archive">Archive</Link>
                        </li>
                    {
                        this.props.user.model 
                        ? this.props.user.model.groups.length === 0 ? <li className="navigation-item-mob">
                        <Link onClick={this.allMenusClose} className="navigation-link-mob" to="/article-creation">Create</Link>
                        </li> : null : null
                    }
                    {
                        this.props.user.model
                        ? this.props.user.model.groups[0] === 1 || this.props.user.model.groups[0] === 2 ? <li className="navigation-item-mob">
                        <Link onClick={this.allMenusClose} className="navigation-link-mob" to="/articles-review">Review</Link>
                        </li> : null : null
                    }
                    <li className="navigation-item-mob">
                        <Link onClick={this.allMenusClose} className="navigation-link-mob" to="/contact">General requirements</Link>
                    </li>
                </ul>    
            </nav>
            {
                this.props.user.isLoggedIn
                ?
                <div className={this.userSettingsWrapperClasses.join(' ')}>
                    <ul className="user-settings-list">
                        <li className="user-settings-item">
                            <Link onClick={this.allMenusClose} className="user-settings-link" to="/account">Account</Link>
                        </li>
                        <li className="user-settings-item">
                            <Link onClick={this.allMenusClose} className="user-settings-link" to="/logout">Log Out</Link>
                        </li>
                    </ul>
                </div>
                : null
            }     
        </header>
    );
    }
}


const mapStateToProps = state => {

    const user = state.user;

    return {
        user
    };
};

export default connect(mapStateToProps, null)(Header);
