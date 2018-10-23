import React from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    static getAdminLinks() {
        return (
            <ul className="navbar-nav mr-auto">
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
                    <Link to={'/requests'} className='nav-link'>Your Requests</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/submit'} className='nav-link'>Submit new Request</Link>
                </li>
            </ul>
        )
    }

    render() {
        return (
            <div>
                <header className={'mb-5'}>
                    <div className="row">
                        <div className="col-24">
                            <nav id="navbar" className="navbar navbar-expand-sm navbar-light bg-light">

                                <Link to='/' className="navbar-brand">
                                    <img src="/public/assets/images/bu_logo.svg" alt="Bournemouth University"/>
                                </Link>
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    {this.props.user.isAdmin ? Header.getAdminLinks() : Header.getStudentLinks()}
                                    <form className="form-inline my-2 my-lg-0" action="/logout" method="POST">
                                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Logout
                                            - {this.props.user.username}</button>
                                    </form>
                                </div>
                            </nav>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Header);
