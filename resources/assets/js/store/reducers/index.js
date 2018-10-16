import {ADD_REQUEST} from '../action-types';

const initialState = {
    user: window.app.data.user,
    requests: [
        {
            id: "MCR-001",
            status: "In Review",
            dateSubmitted: 1538406743,
            desc: "This is a test"
        }
    ]
};

const rootReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_REQUEST:
            return {...state, articles: state.articles.concat(action.payload)};

        default:
            return state;
    }
};

export default rootReducer;