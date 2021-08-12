export function Result(handle) {
    return async function (req, res) {
        try {
            let data = await handle(req);
            //data la kết quả hàm handle khi xử lý xong
            return res.send({
                code: 200,
                message: 'Success',
                data: data
            });
        }
        catch (err) {
            return res.send({
                code: 401,
                message: err.message,
            });
        }
    };
}