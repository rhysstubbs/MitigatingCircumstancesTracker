import Moment from "react-moment";
import DialogLauncher from "MCT/components/core/dialog-launcher";
import ViewRequestDialog from "MCT/components/dialogs/view-request-dialog";
import React from "react";
import requestStatus from 'MCT/constants/request-status';
import OpenIcon from '@material-ui/icons/OpenInBrowser';
import TextField from "@material-ui/core/TextField";
import moment from 'moment';

export const requestColumns = [
    {
        Header: 'ID',
        accessor: 'id',
        type: 'custom',
        isAdmin: false,
        Cell: (row) => {

            return (
                <DialogLauncher className={"btn-mini"}
                                dialog={ViewRequestDialog}
                                dialogData={row.original}
                                buttonIcon={OpenIcon}
                                buttonText={row.original.id}
                                color="secondary"
                                size="small"/>
            )

        }
    },
    {
        Header: "Status",
        accessor: "status",
        type: 'custom',
        Cell: (row) => {

            let color = "";

            if (row.original.status === "Submitted") {
                color = "#57b25d";
            }

            if (row.original.status === "Archived") {
                color = "#4286f4";
            }

            if (row.original.status === "Approved") {
                color = "#f44168";
            }

            if (row.original.status === "Denied") {
                color = "#f43028";
            }

            if (row.original.status === "Updated") {
                color = "#801cd8";
            }

            if (row.original.status === "MoreInfoRequired") {
                color = "#FF8333";
            }

            return (
                <p style={{color: color}} className={'m-0 p-0'}>{row.original.status.toPascalCase().splitByCaps()}</p>
            )
        },
        filterMethod: (filter, row) => {

            const ALL = 'all';

            if (filter.value.toLowerCase() === ALL) {
                return true;
            }

            return row["status"].toLowerCase() === filter.value.toLowerCase();
        },
        Filter: ({filter, onChange}) => {


            return (
                <select
                    onChange={event => onChange(event.target.value)}
                    style={{width: "100%", height: "32px"}}
                    value={filter ? filter.value : "submitted"}>

                    <option value={"all"}>Show All</option>

                    {requestStatus.map(status => {
                        return (
                            <option value={status} key={status}>{status.toPascalCase().splitByCaps()}</option>
                        );
                    })}
                </select>
            )
        }
    },
    {
        Header: "Date Submitted",
        accessor: "dateSubmitted",
        type: 'custom',
        Cell: (row) => (<Moment format="D/MM/YYYY">{row.original.dateSubmitted}</Moment>),
        filterMethod: (filter, row) => {

            filter.value.persist();
            const filterValue = filter.value.currentTarget.value;

            if (filterValue === "" || typeof filterValue === 'undefined' || !filterValue) {
                return true;
            }

            let i = moment(row["dateSubmitted"], 'YYYY-MM-DD HH:mm:ss');
            let j = moment(filterValue, 'YYYY-MM-DD HH:mm:ss');

            return i.isAfter(j, 'day');
        },
        Filter: ({filter, onChange}) => {
            return (
                <TextField
                    id="date"
                    type="date"
                    label="Show all submitted on/after date"
                    fullWidth={true}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={onChange}
                    name={'dateStarted'}
                />
            )
        }
    },
    {
        Header: 'Description',
        accessor: 'description',
        type: 'custom',
        Cell: (row) => {
            return row.original.description.substr(0, 35).concat('...');
        }
    },
    {
        Header: '',
        type: 'custom',
        className: 'action',
        isAdmin: true,
        headerClassName: 'action',
        sortable: false,
        Filter: () => {},
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
    }
];