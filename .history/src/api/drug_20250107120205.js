import http from '@/utils/http';

const BASE_URL = '/drug'; // 修改基础路径为 /drug

const api_drug = {
    getAllDrugs() {
        return http.get(`${BASE_URL}/get_all_drug_infos`); // 修改方法名和路径
    },
    // 添加药品信息
    addDrug(form) {
        console.log(form);
        return http.get(`${BASE_URL}/add_drug_info`, {
            params: {
                drug_number: form.Drug_Number,
                drug_name: form.Drug_Name,
                drug_price: form.Drug_Price,
                drug_production_date: form.Drug_Production_Date
            }
        })
    }
};

export default api_drug;