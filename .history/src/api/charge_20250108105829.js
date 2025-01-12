import http from '@/utils/http';

const BASE_URL = '/charge'; // 修改基础路径为 /charge

const api_charge = {

    getCharge(patient_number) {
        return http.get(`${BASE_URL}/get_charge`, {
            params: {
                patient_number: patient_number
            }
        });
    },
    SettleCharge(patient_number) {
        return http.get(`${BASE_URL}/settle_charge`, {
            params: {
                patient_number: patient_number,
            }
        });
    },

};

export default api_charge;