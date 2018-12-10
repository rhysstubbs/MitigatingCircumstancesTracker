import React from 'react';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import RequestList from 'MCT/views/view-all';
import CaseSubmit from 'MCT/views/student/submit';
import Dashboard from 'MCT/views/dashboard';
import MyAccount from 'MCT/views/student/account';

class Routes extends React.Component {

    constructor(props) {
        super(props);
    }

    static getAdminRoutes() {
        return (
            <Switch>
                <Route exact path={"/dashboard"} component={Dashboard}/>
                <Route exact path="/requests" component={RequestList}/>
            </Switch>
        )
    }

    static getStudentRoutes() {
        return (
            <Switch>
                <Route exact path={"/dashboard"} component={Dashboard}/>
                <Route exact path="/requests" component={RequestList}/>
                <Route exact path="/submit" component={CaseSubmit}/>
                <Route exact path={"/account"} component={MyAccount} />
            </Switch>
        )
    }

    render() {
        return this.props.isAdmin ? Routes.getAdminRoutes() : Routes.getStudentRoutes();
    }

}

Routes.propTypes = {
    isAdmin: PropTypes.bool.isRequired
};

export default Routes;