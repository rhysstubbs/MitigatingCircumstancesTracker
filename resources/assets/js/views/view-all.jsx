import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Table from 'MCT/components/core/table';
import {requestColumns} from "MCT/fixtures/requests";
import Typography from '@material-ui/core/Typography';

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
            return columns.filter((col) => !col.hasOwnProperty('isAdmin') || col.isAdmin === true);
        } else {

            return columns.filter((col) => !col.hasOwnProperty('isAdmin') || col.isAdmin === false);
        }
    };

    render() {
        return (
            <React.Fragment>
                <Typography variant="title" color="inherit" noWrap className={'mb-5'}>
                    {this.props.isAdmin ? "Submitted Requests" : "Your Submitted Requests"}
                </Typography>

                <Table data={this.props.isAdmin ? this.props.requests : this.props.requests.filter(r => r.status !== 'Archived')}
                       columns={this.getColumnsForUser(requestColumns)}
                       defaultSorted={[
                           {
                               id: "dateSubmitted",
                               desc: true
                           },
                           {
                               id: "status",
                               desc: true
                           }
                       ]}
                       filterable={this.props.isAdmin}
                       showPagination={this.props.requests.length >= 15}
                       className="-striped -highlight"
                       noDataText="No Requests to show at this time"
                       defaultFilterMethod={(filter, row) => {
                           return row["status"].toLowerCase() === filter.value;
                       }}/>
            </React.Fragment>
        );
    }
}


RequestList.defaultProps = {
    isAdmin: false,
    requests: []
};

RequestList.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    requests: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(RequestList);