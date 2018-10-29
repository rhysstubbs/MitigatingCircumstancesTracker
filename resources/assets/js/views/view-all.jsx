import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Table from 'MCT/components/core/table';
import {requestColumns} from "MCT/fixtures/requests";

const mapStateToProps = state => {
    return {
        requests: state.requests,
        isAdmin: state.user.isAdmin
    }
};

class RequestList extends React.Component {

    constructor(props) {
        super(props);
    }

    getColumnsForUser = (columns) => {
        if (this.props.isAdmin) {
            return columns;
        } else {

            return columns.filter((col) => !col.hasOwnProperty('isAdmin') || col.isAdmin === false);
        }
    };

    render() {
        return (
            <div>
                <h2>Your Submitted Requests</h2>

                <hr/>

                <Table data={this.props.requests.filter(r => r.status !== "Archived")}
                       columns={this.getColumnsForUser(requestColumns)}/>
            </div>
        );
    }
}


RequestList.defaultProps = {
  requests: []
};

RequestList.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    requests: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(RequestList);