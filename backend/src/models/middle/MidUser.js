import { User } from '../../models';
import { Paging } from '../../util';

class MidUser {
    async createUser(data) {
    }

    async getListUser({ page, size, type, sort_id, title, status }) {
        let paging = Paging(page, size)
        let result = await User.find();
        return result
    }

}

export default new MidUser();
