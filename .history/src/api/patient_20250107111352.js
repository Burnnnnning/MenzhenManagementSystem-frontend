import http from '@/utils/http';

const BASE_URL = '/patient'; // 修改基础路径为 /patient

const api_patient = {
    // 获取所有患者数据
    getAllPatients() {
        return http.get(`${BASE_URL}/get_all_patients`); // 修改方法名和路径
    },
    // 添加患者数据
    addPatient(form) {
        return http.get(`${BASE_URL}/add_patient`, {
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
    },
    // 删除患者数据
    deletePatient(patient_number) {
        return http.get(`${BASE_URL}/delete_patient`, {
            params: {
                patient_number: patient_number
            }
        }); // 修改方法名和路径
    },
    // 修改患者数据
    updatePatient(form) {
        return http.get(`${BASE_URL}/update_patient`, {
            params: {
                patient_number: form.Patient_Number,
                new_id_card_number: form.ID_Card_Number,
                new_name: form.Name,
                new_gender: form.Gender,
                new_age: form.Age,
                new_symptom: form.Symptom,
                new_contact_info: form.Contact_Info,
                new_medical_insurance: form.Medical_Insurance
            }
        })
    },
    // 查询患者
    searchPatient(name) {
        return http.get(`${BASE_URL}/search_patient`, {
            params: {
                name: name
            }
        })
    }
};

export default api_patient;