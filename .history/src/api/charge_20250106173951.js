import http from '@/utils/http';

const BASE_URL = '/charge'; // 修改基础路径为 /charge

const api_charge = {
    // 获取所有患者数据
    getAllCharges() {
        return http.get(`${BASE_URL}/`); // 修改方法名和路径
    }
};

export default api_charge;