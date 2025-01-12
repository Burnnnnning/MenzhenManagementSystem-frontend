import http from '@/utils/http';

const BASE_URL = '/patient_treatment_item'; // 修改基础路径为 

const api_patient_treatment_item = {

    // 获取所有治疗项目信息
    getAllPatientTreatmentItems() {
        return http.get(`${BASE_URL}/get_all_patient_treatment_items`); // 修改方法名和路径
    },
    // 添加治疗项目信息
    addPatientTreatmentItem(form) {
        return http.get(`${BASE_URL}/add_patient_treatment_item`, {
            params: {
                patient_number: form.Patient_Number, // 患者编号
                item_number: form.Item_Number, // 项目编号
                treatment_time: form.Treatment_Time, // 治疗时间
            },
        });
    },
    // 删除治疗项目信息
    deletePatientTreatmentItem(id) {
        return http.get(`${BASE_URL}/delete_patient_treatment_item`, {
            params: {
                patient_treatment_item_number: id, // 治疗项目编号
            },
        });
    },
    // 更新治疗项目信息
    updatePatientTreatmentItem(form) {
        return http.get(`${BASE_URL}/update_patient_treatment_item`, {
            params: {
                patient_treatment_item_number: form.Patient_Treatment_Item_Number, // 治疗项目编号
                new_patient_number: form.Patient_Number, // 新患者编号
                new_item_number: form.Item_Number, // 新项目编号
                new_treatment_time: form.Treatment_Time, // 新治疗时间
            },
        });
    },
    // 搜索治疗项目信息
    searchPatientTreatmentItem(patientNumber) {
        return http.get(`${BASE_URL}/get_patient_treatment_item`, {
            params: {
                patient_number: patientNumber, // 患者编号
            },
        });
    },
};

export default api_patient_treatment_item;