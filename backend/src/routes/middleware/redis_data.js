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
    console.log('Redis connected successfully 1!');
});

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