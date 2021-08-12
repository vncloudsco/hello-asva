import { MidRequest } from '../models/middle';

class RequestController {
    async createRequest(req) {
        let data = req.body;
        return MidRequest.createRequest(data);
    }

    async updateRequest(req) {
        let data = req.body;
        return MidRequest.updateRequest(data);
    }

    async getListRequest(req) {
        let router = req.originalUrl ? req.originalUrl : '';
        let { page, size, sort_createdAt, sort_viewAt, createdAt_start, createdAt_end, viewAt_start, viewAt_end,
            sender_phone, support_count, type, crawl, title } = req.query;
        return MidRequest.getListRequest({ page, size, sort_createdAt, sort_viewAt, createdAt_start, createdAt_end, viewAt_start, viewAt_end, sender_phone, support_count, type, crawl, title, router });
    }

    async deleteRequest(req) {
        let { id } = req.body;
        return MidRequest.deleteRequest(id);
    }

    async getRequestById(req) {
        let { id } = req.params;
        return MidRequest.getRequestById(id);
    }

}

export default new RequestController();