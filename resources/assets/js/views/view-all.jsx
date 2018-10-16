import React from "react";
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ReactTableDefaults} from "react-table";
import DialogLauncher from "MCT/components/dialog-launcher";
import ViewRequestDialog from "MCT/components/dialogs/view-request-dialog";
import ArchiveRequestDialog from "MCT/components/dialogs/archive-request-dialog"

Object.assign(ReactTableDefaults, {
    showPagination: false,
    filterable: false,
    sortable: false,
    resizable: false,
    minRows: 0,
    defaultPageSize: 10,
});

const mapStateToProps = state => {
    return {requests: state.requests}
};

const columns = [
    {
        Header: 'ID',
        accessor: 'id'
    },
    {
        Header: "Status",
        accessor: "status"
    },
    {
        Header: "Date Submitted",
        accessor: "dateSubmitted"
    },
    {
        Header: 'Description',
        accessor: 'desc'
    },
    {
        Header: '',
        type: 'custom',
        className: 'action',
        headerClassName: 'action',
        Cell: (row) => {
            return (
                <div>
                    <DialogLauncher className={"btn-mini outlined-primary"}
                                    dialog={ViewRequestDialog}
                                    dialogData={row.original}
                                    buttonText='View'
                                    variant="outlined"
                                    color="primary"
                                    size="small"/>
                </div>

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
            return columns.filter((col) => col.isAdmin);
        } else {
            return columns.filter((col) => !col.isAdmin);
        }
    }

    render() {
        return (
            <div>
                <h2>Your Submitted Requests</h2>

                <hr/>

                <div>
                    <ReactTable
                        columns={columns}
                        data={this.props.requests}
                        getTdProps={(state, rowInfo, column) => {
                            if ((column.type === 'action' || column.type === 'custom') && typeof column.Cell === 'function') {
                                return column.Cell;
                            }
                            return column;
                        }}

                    />
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