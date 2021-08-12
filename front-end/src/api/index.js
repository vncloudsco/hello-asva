import users from './users';
import news from './news';
import category from './category';
import request from './request';
let api = {
    ...users,
    ...news,
    ...category,
    ...request
}

export default api;