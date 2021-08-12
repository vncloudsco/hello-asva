import { MidCategory } from '../models/middle';

class CategoryController {
    // async createPost(req) {
    //     let NOTIFY = req.NOTIFY;
    //     let data = req.body;
    //     return MidCategory.createPost(data, NOTIFY);
    // }

    // async updatePost(req) {
    //     let NOTIFY = req.NOTIFY;
    //     let data = req.body;
    //     return MidCategory.updatePost(data, NOTIFY);
    // }

    async getListCategory(req) {
        let { page, size, type } = req.query;
        return MidCategory.getListCategory({ page, size, type });
    }

    // async deletePost(req) {
    //     let NOTIFY = req.NOTIFY;
    //     let { id } = req.body;
    //     return MidCategory.deletePost(id, NOTIFY);
    // }

    // getPostById(req) {
    //     let { id } = req.params;
    //     return MidCategory.getPostById(id);
    // }

}

export default new CategoryController();