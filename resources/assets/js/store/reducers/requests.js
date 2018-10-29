import {ADD_REQUEST, EDIT_REQUEST, DELETED_REQUEST, ARCHIVE_REQUEST} from '../action-types/requests';

const requests = (state = null, action) => {
    if (!!action.type) {
        switch (action.type) {

            case ADD_REQUEST:
                return [...state, action.payload];

            case ARCHIVE_REQUEST:
                return state;

            case EDIT_REQUEST:
                return state;

            case DELETED_REQUEST:

                console.log("DELETING", true, action.payload);

                return state.filter(request => {
                    return request.id !== action.payload
                });

            default:
                return state;
        }
    } else {
        return state;
    }
};

export default requests;