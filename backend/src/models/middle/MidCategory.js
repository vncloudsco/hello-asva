import { User, Category } from '../../models';
import { Paging } from '../../util';

class MidCategory {
    async createCategory(data) {
    }

    async getListCategory({ page, size, type}) {
        let paging = Paging(page, size)
        let song = await Category.find();
        console.log("11111111111111111111111111111111", song)
        return song
    }

}

export default new MidCategory();