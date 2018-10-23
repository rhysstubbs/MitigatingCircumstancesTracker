import {ADD_REQUEST, EDIT_REQUEST, DELETE_REQUEST} from '../action-types';

const initialState = [];

const requests = (state = initialState, action) => {
    switch (action.type) {

        case ADD_REQUEST:

            console.log("IT WORKED!", action);

            return state;
            //return {...state, articles: state.articles.concat(action.payload)};

        case EDIT_REQUEST:
            return;

        case DELETE_REQUEST:
            return;

        default:
            return state;
    }
};

export default requests;