import { MidNews } from '../models/middle';

class NewsController {
    // async createPost(req) {
    //     let NOTIFY = req.NOTIFY;
    //     let data = req.body;
    //     return MidNews.createPost(data, NOTIFY);
    // }

    // async updatePost(req) {
    //     let NOTIFY = req.NOTIFY;
    //     let data = req.body;
    //     return MidNews.updatePost(data, NOTIFY);
    // }

    async getListNews(req) {
        let { page, size, type } = req.query;
        return MidNews.getListNews({ page, size, type });
    }

    // async deletePost(req) {
    //     let NOTIFY = req.NOTIFY;
    //     let { id } = req.body;
    //     return MidNews.deletePost(id, NOTIFY);
    // }

    // getPostById(req) {
    //     let { id } = req.params;
    //     return MidNews.getPostById(id);
    // }

}

export default new NewsController();