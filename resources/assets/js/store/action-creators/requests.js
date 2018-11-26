import {OK, NO_CONTENT} from 'http-status-codes';
import axios from 'axios';
import {addingRequest, addRequest, addRequestError, markRequest} from 'MCT/store/actions/index';

import {API_URL} from "MCT/utils/api";

const postFiles = (requestId, files) => {

    let formData = new FormData();


    if (Array.isArray(files) && files.length > 0) {


        for (let i = 0; i < files.length; i++) {

            let file = files[i];

            formData.append('files[' + i + ']', file);
        }

        return axios.post(`${API_URL}/request/${requestId}/files/upload`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                switch (response.status) {

                    case OK:

                        return response.data;

                    default:
                        return [];
                }
            });

    } else {
        return [];
    }
};

const postRequest = (payload) => {

    return function (dispatch) {

        const {files, ...jsonPayload} = payload;

        return axios.post(`${API_URL}/request`, jsonPayload)
            .then(response => {

                switch (response.status) {

                    case OK:

                        const requestId = response.data.id;

                        if (payload.files && payload.files.length > 0) {

                            return postFiles(requestId, payload.files)
                                .then((uploadResponse) => {

                                    const fileLinks = [];

                                    Object.keys(uploadResponse).forEach((key) => {
                                        fileLinks.push({
                                            name: key,
                                            link: uploadResponse[key]
                                        })
                                    });

                                    return {
                                        ...response.data,
                                        files: fileLinks
                                    };
                                });

                        } else {
                            return response.data;
                        }

                    default:
                        break;
                }

            })
            .then(request => {
                dispatch(addRequest(request));
            })
            .catch(error => {
                dispatch(addRequestError(error));
            });

    };
};

const markRequestAs = (payload) => {
    return function (dispatch) {
        return axios.patch(`${API_URL}/request/${payload.requestId}/markAs/${payload.status}`,
            {
                reason: payload.reason
            })
            .then(response => {
                switch (response.status) {
                    case OK:
                        dispatch(markRequest(payload));
                        return response;
                }
            })
    }
};

export {
    postRequest,
    markRequestAs
};