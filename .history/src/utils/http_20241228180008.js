import axios from 'axios';

const http = axios.create({
    baseURL: '/api',
    timeout: 30000
});

const whiteUrls = ['/login'];


http.interceptors.request.use(config => {
    if (!config.headers['Content-Type']) {
        if (config.method === 'post' && config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        } else {
            config.headers['Content-Type'] = 'application/json;charset=utf-8';
        }
    }
    return config;
}, error => {
    return Promise.reject(error);
});

http.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res;
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res;
        }
        return res;
    },
    error => {
        console.error('Failed to load region data:', error);
        return Promise.reject(error);
    }
);

export default http;