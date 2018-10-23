import React from "react";
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import {ReactTableDefaults} from "react-table";

Object.assign(ReactTableDefaults, {
    showPagination: false,
    filterable: false,
    sortable: false,
    resizable: false,
    minRows: 0,
    defaultPageSize: 10,
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
    data: PropTypes.array,
    columns: PropTypes.array
};

export default RequestList;