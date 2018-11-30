import {ADD_REQUEST, DELETED_REQUEST, MARK_REQUEST_AS} from '../action-types/requests';

const requests = (state = null, action) => {
    if (action.type) {
        switch (action.type) {

            case ADD_REQUEST:
                return [...state, action.payload];

            case MARK_REQUEST_AS:

                return state.map((request) => {

                    if (request.id === action.payload.requestId) {

                        request.status = action.payload.status.toPascalCase();
                        return request;
                    }

                    return request;
                });

            case DELETED_REQUEST:
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