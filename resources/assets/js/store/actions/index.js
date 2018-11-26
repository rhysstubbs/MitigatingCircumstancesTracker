import {
    ADD_REQUEST,
    ADDING_REQUEST,
    ADDING_REQUEST_ERROR,
    DELETED_REQUEST,
    MARK_REQUEST_AS
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

const markRequest = payload => (
    {
        type: MARK_REQUEST_AS,
        payload: payload
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
    markRequest,
    addRequestError
}