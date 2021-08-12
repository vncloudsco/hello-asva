export default function Paging(page, limit) {
    let paging = {};
    limit = parseInt(limit) || 20;
    page = parseInt(page) || 1;

    if (page && limit) {
        paging.skip = limit * (page - 1);
    }
    if (limit) {
        paging.limit = limit;
    }
    return paging;
}