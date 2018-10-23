import {ADD_REQUEST, EDIT_REQUEST, DELETE_REQUEST} from "MCT/store/action-types/action-types";

const addRequest = request => (
    {
        type: ADD_REQUEST,
        payload: {
            request
        }
    }
);

const editRequest = request => (
    {
        type: EDIT_REQUEST,
        payload: request
    }
);

const deleteRequest = request => (
    {
        type: DELETE_REQUEST,
    }
);


export {
    addRequest,
    editRequest,
    deleteRequest
}