import redisClient from "../../../config/redis";

const redis_data = async (req, res, next) => {
    let router = req.originalUrl ? req.originalUrl : '';
    if (router == "/meeyland/v1.0/request") {
        await redisClient.get(router, (error, data) => {
            if (data) {
                // console.log(data)
                res.status(200).send(JSON.parse(data))
            }
            if (error) console.log(error)
            else next();
        });
    }
    else {
        next();
    }
}

module.exports = redis_data