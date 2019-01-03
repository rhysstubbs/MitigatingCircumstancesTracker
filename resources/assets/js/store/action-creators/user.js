import {OK} from 'http-status-codes';
import axios from 'axios';
import {removeNotification} from 'MCT/store/actions/index';

import {API_URL} from "MCT/utils/api";

const clearNotification = (payload) => {
    return function (dispatch) {
        return axios.delete(`${API_URL}/user/${payload.username}/notifications/${payload.id}`)
            .then(response => {
                switch (response.status) {
                    case OK:
                        dispatch(removeNotification(payload.id));
                        return response;
                }
            })
    }
};

export {
    clearNotification
};