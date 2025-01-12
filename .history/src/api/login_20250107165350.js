import http from '@/utils/http';

const BASE_URL = '/user_login'; // 修改基础路径为 /drug

const api_login = {
    check_login(){
        return http.post(`${BASE_URL}`);
    },
};

export default api_login;