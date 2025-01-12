import http from '@/utils/http';

const BASE_URL = '/user_login'; // 修改基础路径为 /drug

const api_login = {
    check_login(){
        return http.post(`${BASE_URL}`);
    },
    getAllUserLogins(){
        return http.get(`${BASE_URL}/get_all_user_logins`);
    }
};

export default api_login;