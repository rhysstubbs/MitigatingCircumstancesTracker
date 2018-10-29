import Moment from "react-moment";
import StoreButton from "MCT/components/core/store-button";
import DialogLauncher from "MCT/components/core/dialog-launcher";
import ViewRequestDialog from "MCT/components/dialogs/view-request-dialog";
import React from "react";

import { deleteRequest } from "MCT/store/action-creators/requests";

export const requestColumns = [
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
                    onClick={deleteRequest}
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