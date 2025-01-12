import http from '@/utils/http';

const BASE_URL = '/patient_treatment_item'; // 修改基础路径为 

const api_patient_treatment_item = {

    // 获取所有治疗项目信息
    getAllPatientTreatmentItems() {
        return http.get(`${BASE_URL}/get_all_patient_treatment_items`); // 修改方法名和路径
    },
    // 删除治疗项目信息
    deletePatientTreatmentItem(id) {
        return http.get(`${BASE_URL}/delete_patient_treatment_item`, {
            params: {
                patient_treatment_item_number: id, // 治疗项目编号
            },
        });
    },
};

export default api_patient_treatment_item;