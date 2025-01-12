import http from '@/utils/http';

const BASE_URL = '/patient_drug_info'; // 修改基础路径为 

const api_patient_drug_info = {

    getAllPatientTreatmentItems() {
        return http.get(`${BASE_URL}/get_all_patient_drug_info`); // 修改方法名和路径
    },

};

export default api_patient_drug_info;