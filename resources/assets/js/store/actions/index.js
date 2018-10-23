import {ADD_REQUEST, EDIT_REQUEST, DELETE_REQUEST} from "MCT/store/action-types";

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
        type: EDIT_REQUEST
    }
);

const deleteRequest = request => (
    {
        type: DELETE_REQUEST
    }
);

export {
    addRequest,
    editRequest,
    deleteRequest
}