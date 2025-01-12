import http from '@/utils/http';

const BASE_URL = '/manager'; // 假设后端接口的基础路径是 /manager

const api_manager = {
  // 获取所有用户登录信息
  getAllUserLogins() {
    return http.get(`${BASE_URL}/get_all_user_logins`);
  },

  // 删除用户登录信息
  deleteUserLogin(username, password) {
    return http.get(`${BASE_URL}/delete_user_login`, {
      params: {
        user_name: username, // 用户编号
        password: password
      },
    });
  },
  // 搜索用户登录信息
  searchUserLogin(username) {
    return http.get(`${BASE_URL}/get_user_login`, {
      params: {
        username: username, // 用户名
      },
    });
  },
};

export default api_manager;