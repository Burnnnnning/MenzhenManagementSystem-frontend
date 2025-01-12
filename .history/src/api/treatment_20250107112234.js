import http from '@/utils/http';

const BASE_URL = '/treatment'; // 基础路径改为 /treatment

const api_treatment = {
  // 获取所有诊疗项目信息
  getAllTreatmentItems() {
    return http.get(`${BASE_URL}/get_all_treatment_items`); // 方法名和路径改为诊疗项目
  },
  // 添加诊疗项目信息
  addTreatmentItem(form) {
    return http.get(`${BASE_URL}/add_treatment_item`, {
      params: {
        item_number: form.Item_Number,
        item_name: form.Item_Name,
        price: form.Price,
      }
    });
  },
  // 删除诊疗项目信息
  deleteTreatmentItem(id) {
    return http.get(`${BASE_URL}/delete_treatment_item`, {
      params: {
        item_number: id
      }
    });
  },
};

export default api_treatment;