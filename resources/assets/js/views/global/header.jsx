import React from "react";
import {Link, withRouter} from 'react-router-dom';

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <header>
                        <div className="row">
                            <div className="col-24">
                                <nav id="navbar" className="navbar navbar-expand-lg navbar-light bg-light">

                                    <Link to='/roster' className="navbar-brand">
                                        <img src="/public/assets/images/bu_logo.svg" alt="Bournemouth University"/>
                                    </Link>
                                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                            aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>

                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav mr-auto">
                                            <li className="nav-item active">

                                                <Link to={'/cases'} className={'nac-link'}>Your Submissions</Link>

                                            </li>
                                        </ul>

                                        <form className="form-inline my-2 my-lg-0">
                                            <button className="btn btn-outline-success my-2 my-sm-0"
                                                    type="submit">Logout - {this.props.username}</button>
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

export default withRouter(Header);
