import http from '@/utils/http';

const BASE_URL = '/patient'; // 修改基础路径为 /patient

const api_patient = {
    // 获取所有诊疗项目信息
    getAllPatients() {
        return http.get(`${BASE_URL}/get_all_treatment_items`); // 修改方法名和路径
    }
};

export default api_patient;