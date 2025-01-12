import http from '@/utils/http';

const BASE_URL = '/drug'; // 修改基础路径为 /drug

const api_drug = {
    getAllDrugs() {
        return http.get(`${BASE_URL}/get_all_drug_infos`); // 修改方法名和路径
    },
    // 添加药品信息
    addDrug(form) {
        return http.get(`${BASE_URL}/add_drug_info`, {
            params: {
                drug_number: form.Drug_Number,
                drug_name: form.Drug_Name,
                drug_price: form.Drug_Price,
                drug_production_date: form.Drug_Production_Date
            }
        })
    },
    // 删除药品信息
    deleteDrug(Drug_Number) {
        return http.get(`${BASE_URL}/delete_drug_info`, {
            params: {
                drug_number: Drug_Number
            }
        })
    },
    // 修改药品信息
    updateDrug(form) {
        return http.get(`${BASE_URL}/update_drug_info`, {
            params: {
                drug_number: form.Drug_Number,
                new_drug_name: form.Drug_Name,
                new_drug_price: form.Drug_Price,
                new_drug_production_date: form.Drug_Production_Date
            }
        })
    }
};

export default api_drug;