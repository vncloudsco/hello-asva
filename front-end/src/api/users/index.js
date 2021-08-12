import { FetchApi } from '../../axios';

function getListPost(data) {
    return FetchApi('/v1.0/request', 'get', data)
}

function deletePost(data) {
    return FetchApi('/v1.0/posts', 'delete', data)
}

function createPost(data) {
    return FetchApi('/v1.0/posts', 'post', data)
}

function updatePost(data) {
    return FetchApi('/v1.0/posts', 'put', data)
}
function updateBlog(data) {
    return FetchApi('/v1.0/posts/update-blog', 'put', data)
}

function getPostByID(data) {
    return FetchApi(`/v1.0/posts/${data}`, 'get')
}

export default {
    getListPost,
    deletePost,
    createPost,
    updatePost,
    getPostByID,
    updateBlog
}