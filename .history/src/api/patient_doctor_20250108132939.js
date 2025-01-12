import http from '@/utils/http';

const BASE_URL = '/patient_doctor'; 

const api_patient_doctor = {
    // 获取所有患者与医生关系信息
    getAllPatientDoctors() {
        return http.get(`${BASE_URL}/get_all_patient_doctors`);
    },

    // 删除患者与医生关系信息
    deletePatientDoctor(id) {
        return http.get(`${BASE_URL}/delete_patient_doctor`, {
            params: {
                patient_doctor_number: id, // 关系编号
            },
        });
    },

    // 添加患者与医生关系信息
    addPatientDoctor(form) {
        return http.get(`${BASE_URL}/add_patient_doctor`, {
            params: {
                patient_doctor_number: form.Patient_Doctor_Number, // 关系编号
                patient_number: form.Patient_Number, // 患者编号
                doctor_number: form.Doctor_Number, // 医生编号
                medical_time: form.Medical_Time, // 就诊时间
            },
        });
    },

    // 更新患者与医生关系信息
    updatePatientDoctor(form) {
        return http.get(`${BASE_URL}/update_patient_doctor`, {
            params: {
                patient_doctor_number: form.Patient_Doctor_Number, // 关系编号
                new_patient_number: form.Patient_Number, // 新患者编号
                new_doctor_number: form.Doctor_Number, // 新医生编号
                new_medical_time: form.Medical_Time, // 新就诊时间
            },
        });
    },

    // 搜索患者与医生关系信息
    searchPatientDoctor(patientNumber) {
        return http.get(`${BASE_URL}/get_patient_doctor`, {
            params: {
                patient_number: patientNumber, // 患者编号
            },
        });
    },
};

export default api_patient_doctor;