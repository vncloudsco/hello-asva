import { User, Request, News } from '../../models';
import { Paging } from '../../util';
const redis = require("redis");
const redisClient = redis.createClient({
    host: '203.171.21.222',
    port: 6382,
    password: 'BECth4aOlrPmF2wAiiaa',
    persistent: true,
    connect_timeout: 3600000,
    db: process.env.REDIS_DB || 5
});

redisClient.on('connect', function () {
    console.log('Redis connected successfully 2!');
});

class MidRequest {
    async createRequest(data) {
        let { data_request, data_news, data_users } = data;
        try {
            let request;
            const users = await User.create(data_users)
            try {
                const news = await News.create({
                    ...data_news,
                    creator: users._id
                })
                try {
                    request = await Request.create({
                        ...data_request,
                        receiveUserId: news._id
                    });
                } catch (err) {
                    console.log(err.message)
                }
            } catch (err) {
                console.log(err.message)
            }
            await redisClient.del('/meeyland/v1.0/request', function (err, reply) {
                console.log(reply); // 1
            });
            return request
        } catch (err) {
            console.log(err.message)
        }
    }

    async updateRequest(data) {
        let { data_request, data_news, data_users } = data;
        let request_data = await Request.findById(data_request._id)
        if (request_data) {
            let news_data = await News.where({ _id: request_data.receiveUserId }).update(data_news)
            let user_data;
            if (news_data) {
                user_data = await User.where({ _id: news_data.creator }).update(data_users)
            }
            request_data = await Request.where({ _id: data_request._id }).update(data_request)
            await redisClient.del('/meeyland/v1.0/request', function (err, reply) {
                console.log(reply);
            });
            return request_data
        }
    }

    async getListRequest({ page, size, sort_createdAt, sort_viewAt, createdAt_start, createdAt_end, viewAt_start, viewAt_end, sender_phone, support_count, type, crawl, title, router }) {
        let paging = Paging(page, size);
        let order = {};
        let where = {};

        if (createdAt_start && createdAt_end) {
            where = {
                ...where,
                createdAt: { $gte: createdAt_start, $lte: createdAt_end }
            }
        }
        if (viewAt_start && viewAt_end) {
            where = {
                ...where,
                viewAt: { $gte: viewAt_start, $lte: viewAt_end }
            }
        }
        //Tim kiem theo phone
        if (sender_phone) {
            where = {
                ...where,
                senderPhone: { $regex: sender_phone, $options: "i" }
            }
        }
        //Tim kiem theo so lan nhac lich
        if (support_count) {
            where = {
                ...where,
                supportCount: support_count
            }
        }
        //Tim kiem theo loai xem nha
        if (type) {
            where = {
                ...where,
                type
            }
        }
        // //Tim kiem theo loai tin
        // if (crawl) {
        //     where = {
        //         ...where,
        //         crawl
        //     }
        // }
        // //Tim kiem tieu de tin
        // if (title) {
        //     where = {
        //         ...where,
        //         title: { $regex: title, $options: "i" }
        //     }
        // }

        if (sort_createdAt) {
            order = {
                ...order,
                createdAt: sort_createdAt
            }
        }
        if (sort_viewAt) {
            order = {
                ...order,
                createdAt: sort_viewAt
            }
        }
        else {
            order = { createdAt: -1 }
        }

        let result = await Request.find(where).populate(
            {
                path: 'receiveUserId',
                populate: [
                    { path: 'creator', model: 'User' },
                    { path: 'category', model: 'Category' }
                ],
                match: title ? { title: { $regex: title, $options: "i" } } : '',
                match: crawl ? { crawl: crawl } : '',
            }
        ).sort(order).skip(paging.skip).limit(paging.limit);

        let count = await Request.find().count();
        let data_list = {
            count: count,
            rows: result
        }
        if (router == "/meeyland/v1.0/request") {
            await redisClient.set(router, JSON.stringify(data_list));
        }
        return data_list
    }

    async getRequestById(id) {
        let result = await Request.findById(id).populate(
            {
                path: 'receiveUserId',
                populate: [
                    { path: 'creator', model: 'User' },
                    { path: 'category', model: 'Category' }
                ]
            }
        );
        if (!result) {
            console.error(err);
        }
        return result
    }

    async deleteRequest(id) {
        let result = await Request.findByIdAndDelete(id);
        if (result) {
            await redisClient.del('/meeyland/v1.0/request', function (err, reply) {
                console.log(reply); // 1
            });
            return result
        } else {
            console.error(err);
        }
    }

}

export default new MidRequest();