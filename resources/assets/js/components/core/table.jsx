import React from "react";
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import {ReactTableDefaults} from "react-table";

Object.assign(ReactTableDefaults, {
    showPagination: false,
    filterable: false,
    sortable: true,
    resizable: false,
    minRows: 15,
    defaultPageSize: 15,
});

const columnTypes = {

};

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

                    if (column.type === 'custom' && typeof column.Cell === 'function') {

                        return column.Cell;

                    } else {

                        return column.Cell = (row) => {

                            let cellValue = null;

                            if (column.hasOwnProperty("type") && !!column.type) {

                                cellValue = columnTypes[column.type](row, column);

                            } else {

                                cellValue = (!row.value ? 'N/A' : row.value);
                            }

                            return cellValue;
                        }
                    }
                }}
                {...this.props}
            />
        );
    }
}

RequestList.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    showPagination: PropTypes.bool,
    showPaginationTop: PropTypes.bool,
    showPaginationBottom: PropTypes.bool,
    showPageSizeOptions: PropTypes.bool,
    pageSizeOptions: PropTypes.array,
    showPageJump: PropTypes.bool,
    collapseOnSortingChange: PropTypes.bool,
    collapseOnPageChange: PropTypes.bool,
    collapseOnDataChange: PropTypes.bool,
    freezeWhenExpanded: PropTypes.bool,
    sortable: PropTypes.bool,
    multiSort: PropTypes.bool,
    resizable: PropTypes.bool,
    filterable: PropTypes.bool,
    defaultSortDesc: PropTypes.bool,
    defaultSorted: PropTypes.array,
    defaultFiltered: PropTypes.array,
    defaultResized: PropTypes.array,
    defaultExpanded: PropTypes.array,
    defaultFilterMethod: PropTypes.func
};

export default RequestList;