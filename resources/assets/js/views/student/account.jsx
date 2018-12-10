import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {compose} from "recompose";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {postRequest} from "MCT/store/action-creators/requests";

const mapDispatchToProps = {
    postRequest
};

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

const styles = () => ({

});

class MyAccount extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {

        return (
            <React.Fragment>

            </React.Fragment>
        );
    }
}

MyAccount.propTypes = {
    classes: PropTypes.object
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(MyAccount);