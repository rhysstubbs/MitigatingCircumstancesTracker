import React from "react";
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import {ReactTableDefaults} from "react-table";

Object.assign(ReactTableDefaults, {
    showPagination: true,
    filterable: false,
    sortable: true,
    resizable: false,
    minRows: 15,
    defaultPageSize: 15,
});

class RequestList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ReactTable
                columns={this.props.columns}
                data={this.props.data}
                getTdProps={(state, rowInfo, column) => {

                    if ((column.type === 'action' || column.type === 'custom') && typeof column.Cell === 'function') {
                        return column.Cell;
                    }

                    return column;
                }}
            />
        );
    }
}

RequestList.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired
};

export default RequestList;