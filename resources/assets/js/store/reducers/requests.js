import {ADD_REQUEST, EDIT_REQUEST, DELETE_REQUEST} from '../action-types/action-types';

const initialState = window.app.data.requests;

const requests = (state = initialState, action) => {
    switch (action.type) {

        case ADD_REQUEST:
            console.log("ADD_REQUEST", action);
            return state;

        case EDIT_REQUEST:
            console.log("EDIT_REQUEST", action);
            return state;

        case DELETE_REQUEST:
            console.log("DELETE_REQUEST", action);
            return state;

        default:
            return state;
    }
};

export default requests;