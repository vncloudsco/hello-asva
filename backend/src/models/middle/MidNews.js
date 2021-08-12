import { User, News } from '../../models';
import { Paging } from '../../util';

class MidNews {
    async createNews(data) {
    }

    async getListNews({ page, size, type }) {
        let paging = Paging(page, size)
        let result = await News.find().populate('creator').populate('category').exec();
        return result
    }

}

export default new MidNews();
