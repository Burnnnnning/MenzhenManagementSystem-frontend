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
                patient_number = form.Patient_Number,
                name = form.name,
                gender = form.gender,
                age = form.age,
                contact = form.contact,
                address = form.address,
                medical_record = form.medical_record,
                doctor_number = form.doctor_number
            }
        }); // 修改方法名和路径
    }
};

// Patient_Number: '', // 新增时清空编号
// Name: '',
// Gender: '',
// Age: '',
// ID_Card_Number: '', // 新增时清空身份证号
// Symptom: '',
// Contact_Info: '',
// Medical_Insurance: '',

export default api_patient;