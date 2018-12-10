import React from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from "@material-ui/core/Tooltip";

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
        };
    }

    openMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };


    static getAdminLinks() {
        return (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={'/dashboard'} className='nav-link'>Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/requests'} className='nav-link'>Manage Requests</Link>
                </li>
            </ul>
        )
    }

    static getStudentLinks() {
        return (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={'/dashboard'} className='nav-link'>Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/requests'} className='nav-link'>Your Requests</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/submit'} className='nav-link'>Submit new Request</Link>
                </li>
            </ul>
        )
    }

    logout = () => {
        window.signOut();
    };

    render() {

        const {anchorEl} = this.state;

        return (
            <React.Fragment>
                <header className={'mb-5'}>
                    <div className={'container-fluid'}>
                        <div className="row">
                            <div className="col-24 p-0">
                                <nav id="navbar" className="navbar navbar-expand-sm navbar-light bg-light">

                                    <Link to='/dashboard' className="navbar-brand">
                                        <img src="/public/assets/images/bu_logo.svg" alt="Bournemouth University"/>
                                    </Link>
                                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                            aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>

                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        {this.props.user.isAdmin ? Header.getAdminLinks() : Header.getStudentLinks()}

                                        <Chip
                                            avatar={<Avatar alt="Natacha" src={this.props.user.avatar}/>}
                                            label={this.props.user.name}
                                            color={"primary"}
                                            variant="outlined"
                                            onClick={this.openMenu}
                                            aria-owns={anchorEl ? 'simple-menu' : undefined}
                                            aria-haspopup="true"
                                        />

                                        <Menu
                                            id="simple-menu"
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={this.handleClose}>
                                            {!this.props.user.isAdmin ?
                                                <Tooltip title="Coming Soon!">
                                                    <MenuItem onClick={this.handleClose}>
                                                        My Account
                                                    </MenuItem>
                                                </Tooltip> : null}

                                            <MenuItem onClick={this.logout}>Logout</MenuItem>
                                        </Menu>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>
            </React.Fragment>
        );
    }
}

Header.propTypes = {
    user: PropTypes.object
};

export default connect(mapStateToProps)(Header);