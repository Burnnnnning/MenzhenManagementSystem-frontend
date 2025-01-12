import http from '@/utils/http';

const BASE_URL = '/patient'; // 修改基础路径为 /patient

const api_patient = {
    // 获取所有患者数据
    getAllPatients() {
        return http.get(`${BASE_URL}/get_all_patients`); // 修改方法名和路径
    },
    // 添加患者数据
    addPatient(form) {
        return http.post(`${BASE_URL}/add_patient`, {
            params: {
                patient_number: form.Patient_Number,
                name: form.Name,
                gender: form.Gender,
                age: form.Age,
                id_card_number: form.ID_Card_Number,
                symptom: form.Symptom,
                contact_info: form.Contact_Info,
                medical_insurance: form.Medical_Insurance,
            }
        }); // 修改方法名和路径
    }
};

export default api_patient;