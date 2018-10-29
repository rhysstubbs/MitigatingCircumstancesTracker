import {
    ADD_REQUEST,
    EDIT_REQUEST,
    DELETE_REQUEST,
    ADDING_REQUEST,
    ADDING_REQUEST_ERROR,
    DELETED_REQUEST
} from "MCT/store/action-types/requests";

const addingRequest = status => (
    {
        type: ADDING_REQUEST,
        payload: status
    }
);

const addRequest = request => (
    {
        type: ADD_REQUEST,
        payload: request
    }
);

const editRequest = request => (
    {
        type: EDIT_REQUEST,
        payload: request
    }
);

const deletedRequest = (requestId) => (
    {
        type: DELETED_REQUEST,
        payload: requestId
    }
);

const addRequestError = error => (
    {
        type: ADDING_REQUEST_ERROR,
        payload: error
    }
);

export {
    addRequest,
    addingRequest,
    editRequest,
    addRequestError,
    deletedRequest
}