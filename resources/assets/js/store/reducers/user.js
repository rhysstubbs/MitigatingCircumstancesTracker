import {DELETE_NOTIFICATION} from 'MCT/store/action-types/user';

const users = (state = [], action) => {
    if (action.type) {
        switch (action.type) {

            case DELETE_NOTIFICATION: {
                return {
                    ...state,
                    notifications: [
                        ...state.notifications.filter(notification => notification.id !== action.payload)
                    ]
                };
            }

            default: {
                return state;
            }

        }
    } else {
        return state;
    }
};

export default users;