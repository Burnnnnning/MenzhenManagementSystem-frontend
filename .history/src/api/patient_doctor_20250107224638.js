import http from '@/utils/http';

const BASE_URL = '/patient_doctor'; // 修改基础路径为 

const api_patient_doctor = {

    getAllPatientDoctors() {
        return http.get(`${BASE_URL}/get_all_patient_doctors`); // 修改方法名和路径
    },

};

export default api_patient_doctor;