import {
    ADD_REQUEST,
    ADDING_REQUEST_ERROR,
    MARK_REQUEST_AS,
    UPDATE_REQUEST
} from "MCT/store/action-types/requests";

import {DELETE_NOTIFICATION} from 'MCT/store/action-types/user';

const addRequest = request => (
    {
        type: ADD_REQUEST,
        payload: request
    }
);

const updateRequest = request => (
    {
        type: UPDATE_REQUEST,
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

const removeNotification = payload => (
    {
        type: DELETE_NOTIFICATION,
        payload: payload
    }
);

export {
    addRequest,
    removeNotification,
    markRequest,
    updateRequest,
    addRequestError
}