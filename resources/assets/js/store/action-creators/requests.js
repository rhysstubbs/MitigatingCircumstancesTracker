import {OK} from 'http-status-codes';
import axios from 'axios';
import {addRequest, addRequestError, markRequest, updateRequest} from 'MCT/store/actions/index';

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

        let options = {};

        if (payload.hasOwnProperty("id")) {
            options = {
                method: 'patch',
                path: `${API_URL}/request/${payload.id}`,
                existing: true
            }
        } else {
            options = {
                method: 'post',
                path: `${API_URL}/request`,
                existing: false
            }
        }

        return axios[options.method](options.path, jsonPayload)
            .then(response => {

                switch (response.status) {

                    case OK:

                        if (files && files.length > 0) {

                            const requestId = response.data.id;

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

                if (options.existing) {
                    dispatch(updateRequest(request))
                } else {
                    dispatch(addRequest(request));
                }
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