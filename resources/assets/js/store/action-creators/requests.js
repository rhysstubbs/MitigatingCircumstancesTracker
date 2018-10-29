import {OK, NO_CONTENT} from 'http-status-codes';
import {API_URL, HEADERS, CONFIG} from "MCT/utils/api";
import axios from 'axios';

import {addingRequest, deletedRequest, addRequest, addRequestError} from 'MCT/store/actions/index';

const postRequest = (payload) => {

    return function (dispatch) {

        dispatch(addingRequest);

        return axios.post(`${API_URL}/request/i7433085`, payload)
            .then(response => {
                switch (response.status) {

                    case OK:
                        return response.data;

                    case NO_CONTENT:
                        return {};
                }
            })
            .then(request => {
                dispatch(addRequest(request));
            })
            .catch(error => {
                dispatch(addRequestError(error));
            })
    };
};


const deleteRequest = (payload) => {

    return function (dispatch) {

        console.log("API DELETING");

        dispatch(deletedRequest(payload));

        /**return axios.patch(`${API_URL}/request/${payload.id}`, payload.data)
         .then(response => {
                switch (response.status) {
                    case OK:

                        return response;
                }
            })*/
    }
};

export {
    postRequest,
    deleteRequest
};