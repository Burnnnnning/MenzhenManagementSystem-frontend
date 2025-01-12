import http from '@/utils/http'

const BASE_URL = '/statistic';

const api_statistic = {
    getWaterResourceSummaries(doctorName, year) {
        /**
         * 请求说明：获取指定市和年份的水资源概要信息
         * 参数：
         *   - doctorName: 市的名称
         *   - year: 年份
         * 返回数据格式：json
         */
        return http.get(`${BASE_URL}/get_all_water_resource_summaries`, {
            params: {
                doctor_name: doctorName,
                year_mark: year
            }
        });
    }
};

export default api_statistic; 