import { ADD_REQUEST } from "MCT/store/action-types";

export const addRequest = request => (
    {
        type: ADD_REQUEST,
        payload: {
            request
        }
    }
);