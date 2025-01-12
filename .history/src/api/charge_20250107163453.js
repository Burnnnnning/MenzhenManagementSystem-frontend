import http from '@/utils/http';

const BASE_URL = '/charge'; // 修改基础路径为 /charge

const api_charge = {

    getCharge(number) {
        return http.get(`${BASE_URL}/get_charge`, {
            params: {
                patient_number: number
            }
        });
    }

};

export default api_charge;