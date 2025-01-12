import http from '@/utils/http';

const BASE_URL = '/drug'; // 修改基础路径为 /drug

const api_drug = {
    // 获取所有患者数据
    getAllDrugs() {
        return http.get(`${BASE_URL}/get_all_drug_infos`); // 修改方法名和路径
    }
};

export default api_drug;