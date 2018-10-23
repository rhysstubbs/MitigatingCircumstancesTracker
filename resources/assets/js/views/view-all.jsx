import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DialogLauncher from "MCT/components/core/dialog-launcher";
import ViewRequestDialog from "MCT/components/dialogs/view-request-dialog";
import Table from 'MCT/components/core/table';
import Moment from "react-moment";
import Button from "@material-ui/core/Button/Button";

import StoreButton from "MCT/components/core/store-button";

const mapStateToProps = state => {
    return {
        requests: state.requests,
        isAdmin: state.user.isAdmin
    }
};

const columns = [
    {
        Header: 'ID',
        accessor: 'id'
    },
    {
        Header: "Status",
        accessor: "status",
        Cell: row => {

            const status = row.original.status;
            let color = "";

            if (status === "Submitted") {
                color = "#85cc00"
            }

            return (
                <p style={{color: color}} className={'m-0 p-0'}>{status}</p>
            )
        }
    },
    {
        Header: "Date Submitted",
        accessor: "dateSubmitted",
        Cell: (row) => {
            return (
                <Moment format="DD/MM/YYYY @ hh:mm">{row.original.dateSubmitted}</Moment>
            )
        }
    },
    {
        Header: 'Description',
        accessor: 'description'
    },
    {
        Header: '',
        type: 'store-button',
        className: 'action',
        isAdmin: false,
        headerClassName: 'action',
        Cell: (row) => {
            return (
                <StoreButton
                    buttonText={'Cancel'}
                    action={'deleteRequest'}
                />
            )
        }
    },
    {
        Header: '',
        type: 'custom',
        className: 'action',
        isAdmin: true,
        headerClassName: 'action',
        Cell: (row) => {
            return (
                <DialogLauncher className={"btn-mini outlined-primary"}
                                dialog={ViewRequestDialog}
                                dialogData={row.original}
                                buttonText='View'
                                variant="outlined"
                                color="primary"
                                size="small"/>
            );
        }
    },
];

class RequestList extends React.Component {

    constructor(props) {
        super(props);

        this.getColumnsForUser = this.getColumnsForUser.bind(this);
    }

    getColumnsForUser() {

        if (this.props.isAdmin) {
            return columns;
        } else {

            return columns.filter((col) => !col.hasOwnProperty('isAdmin') || col.isAdmin === false);
        }
    }

    render() {
        return (
            <div>
                <h2>Your Submitted Requests</h2>

                <hr/>

                <div>
                    <Table data={this.props.requests}
                           columns={this.getColumnsForUser()}/>
                </div>
            </div>
        );
    }
}


RequestList.propTypes = {
    submissions: PropTypes.array,
    isAdmin: PropTypes.bool,
    requests: PropTypes.array
};

export default connect(mapStateToProps)(RequestList);