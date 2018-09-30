import React from 'react';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';

import CaseViewer from '../views/view-all';

class Routes extends React.Component {

    constructor(props) {
        super(props);

        Routes.getStaffRoutes = Routes.getStaffRoutes().bind(this);
        Routes.getStudentRoutes = Routes.getStudentRoutes.bind(this)
    }

    static getStaffRoutes() {
        return (
            {}
        )
    }

    static getStudentRoutes() {
        return (
            <Route exact path="/cases" component={CaseViewer}/>
        )
    }

    render() {
        return (
            <Switch>
                {this.props.isStaff ? Routes.getStaffRoutes() : Routes.getStudentRoutes()}
            </Switch>
        )
    }

}

Routes.propTypes = {
    isStaff: PropTypes.bool
};

export default Routes;