import http from '@/utils/http';

const BASE_URL = '/manager'; // 假设后端接口的基础路径是 /manager

const api_manager = {
  // 获取所有用户登录信息
  getAllUserLogins() {
    return http.get(`${BASE_URL}/get_all_user_logins`);
  },

  // 删除用户登录信息
  deleteUserLogin(id) {
    return http.get(`${BASE_URL}/delete_user_login`, {
      params: {
        user_number: id, // 用户编号
      },
    });
  },

  // 添加用户登录信息
  addUserLogin(form) {
    return http.get(`${BASE_URL}/add_user_login`, {
      params: {
        user_number: form.User_Number, // 用户编号
        username: form.Username, // 用户名
        password: form.Password, // 密码
      },
    });
  },

  // 更新用户登录信息
  updateUserLogin(form) {
    return http.get(`${BASE_URL}/update_user_login`, {
      params: {
        user_number: form.User_Number, // 用户编号
        new_username: form.Username, // 新用户名
        new_password: form.Password, // 新密码
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