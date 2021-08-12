// import axios from 'axios';
const axios = require('axios')

export const FetchApi = async (url, method = 'get', body, headers) => {
    // let lang = JSON.parse(localStorage.getItem("TVADLocale"));
    // let lg_key;
    // if (!lang) {
    //     lg_key = "vn"
    // }
    // lg_key = lang.key;
    // if (!lg_key) {
    //     lg_key = "vn"
    // }
    // let token = localStorage.getItem("x-token-key");
    try {
        let opts = {
            method,
            url: `${process.env.REACT_APP_API_URL.trim()}${url}`,
            timeout: 1 * 1000 * 60,//1phut
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // 'access-token': token,
                // 'lg-key': lg_key
            }
        }
        if (method === 'get') {
            opts.params = body;
        } else {
            opts.data = body;
        }
        let fetchdata = await axios(opts);
        if (fetchdata.data.code !== 200) {
            return fetchdata.data.message;
        }
        return fetchdata.data;
    } catch (error) {
        let { response } = error;
        if (response) {
            return response.data.message;
        }
        return error.message;
    }
};

export const FetchApiUpload = async (url, method = 'get', body) => {
    try {
        let opts = {
            method,
            url,
            timeout: 1 * 1000 * 60,//1phut
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }
        if (method === 'get') {
            opts.params = body;
        } else {
            opts.data = body;
        }
        let fetchdata = await axios(opts);
        if (fetchdata.data.code !== 200) {
            return fetchdata.data.message;
        }
        return fetchdata.data;
    } catch (error) {
        let { response } = error;
        if (response) {
            return response.data.message;
        }
        return error.message;
    }
}