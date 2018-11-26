import Moment from "react-moment";
import DialogLauncher from "MCT/components/core/dialog-launcher";
import ViewRequestDialog from "MCT/components/dialogs/view-request-dialog";
import React from "react";

import requestStatus from 'MCT/constants/request-status';

import OpenIcon from '@material-ui/icons/OpenInBrowser';

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

            return (
                <p style={{color: color}} className={'m-0 p-0'}>{row.original.status}</p>
            )
        },
        filterMethod: (filter, row) => {

            if (filter.value === "submitted") {
                return true;
            }

            return row["status"].toLowerCase() === filter.value.toLowerCase();
        },
        Filter: ({filter, onChange}) => {
            return (
                <select
                    onChange={event => onChange(event.target.value)}
                    style={{width: "100%"}}
                    value={filter ? filter.value : "submitted"}>

                    <option value={"all"}>Show All</option>

                    {requestStatus.map(status => {
                        return (
                            <option value={status} key={status}>{status.toPascalCase()}</option>
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
        Cell: (row) => <Moment format="D/MM/YYYY">{row.original.dateSubmitted}</Moment>
    },
    {
        Header: 'Description',
        accessor: 'description'
    },
    {
        Header: '',
        type: 'custom',
        className: 'action',
        isAdmin: true,
        headerClassName: 'action',
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