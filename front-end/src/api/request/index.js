import { FetchApi } from '../../axios';

function getListRequest(data) {
    return FetchApi('/v1.0/request', 'get', data)
}

function deleteRequest(data) {
    return FetchApi('/v1.0/request', 'delete', data)
}

function createRequest(data) {
    return FetchApi('/v1.0/request', 'post', data)
}

function updateRequest(data) {
    return FetchApi('/v1.0/request', 'put', data)
}

function getRequestByID(data) {
    return FetchApi(`/v1.0/request/${data}`, 'get')
}

export default {
    getListRequest,
    deleteRequest,
    createRequest,
    updateRequest,
    getRequestByID
}