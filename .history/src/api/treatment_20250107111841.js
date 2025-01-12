import http from '@/utils/http';

const BASE_URL = '/treatment'; // 基础路径改为 /treatment

const api_treatment = {
  // 获取所有诊疗项目信息
  getAllTreatmentItems() {
    return http.get(`${BASE_URL}/get_all_treatment_items`); // 方法名和路径改为诊疗项目
  },
  // 添加诊疗项目信息
  addTreatmentItem(item) {
    return http.get(`${BASE_URL}/add_treatment_item`, item); // 方法名和路径改为诊疗项目
  },
};

export default api_treatment;