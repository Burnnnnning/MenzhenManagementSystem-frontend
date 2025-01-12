import http from '@/utils/http';

const BASE_URL = '/patient_drug_info'; // 假设后端接口的基础路径是 /patient_drug_info

const api_patient_drug_info = {
    // 获取所有处方信息
    getAllPatientDrugInfos() {
        return http.get(`${BASE_URL}/get_all_patient_drug_infos`);
    },

    // 删除处方信息
    deletePatientDrugInfo(id) {
        return http.get(`${BASE_URL}/delete_patient_drug_info`, {
            params: {
                patient_drug_info_number: id, // 处方编号
            },
        });
    },

    // 添加处方信息
    addPatientDrugInfo(form) {
        return http.get(`${BASE_URL}/add_patient_drug_info`, {
            params: {
                patient_drug_info_number: form.Patient_Drug_Info_Number, // 处方编号
                patient_number: form.Patient_Number, // 患者编号
                drug_number: form.Drug_Number, // 药品编号
                usage: form.Usage, // 使用量
                issue_date: form.Issue_Date, // 开具日期
            },
        });
    },

    // 更新处方信息
    updatePatientDrugInfo(form) {
        return http.get(`${BASE_URL}/update_patient_drug_info`, {
            params: {
                patient_drug_info_number: form.Patient_Drug_Info_Number, // 处方编号
                new_patient_number: form.Patient_Number, // 新患者编号
                new_drug_number: form.Drug_Number, // 新药品编号
                new_usage: form.Usage, // 新使用量
                new_issue_date: form.Issue_Date, // 新开具日期
            },
        });
    },

    // 搜索处方信息
    searchPatientDrugInfo(patientNumber) {
        return http.get(`${BASE_URL}/get_patient_drug_info`, {
            params: {
                patient_number: patientNumber, // 患者编号
            },
        });
    },
};

export default api_patient_drug_info;