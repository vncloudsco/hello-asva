import { MidUser } from '../models/middle';

class UserController {
    async createUser(req) {
        let data = req.body;
        return MidUser.createUser(data);
    }

    async getListUser(req) {
        let { page, size, type, sort_id, title, status } = req.query;
        return MidUser.getListUser({ page, size, type, sort_id, title, status });
    }

}

export default new UserController();