import http from '@/utils/http'

const BASE_URL = '/doctor';

const api_doctor = {

  getAllDoctors() {
    /**
      请求说明：获取河南省黄河供水区的所有省辖市县区信息
      返回数据格式：json
      需要格式（仅response的data部分）：
        "data": [{
        "children": [
        {
          "description": null,
          "id": 2,
          "name": "三门峡市区",
          "parent_id": 1
        },...],
        "description": null,
        "id": 1,
        "name": "三门峡市",
        "parent_id": 0},
        ...]
     * 参数：无 
     */
    return http.get(`${BASE_URL}/get_all_doctors`); // 注意这是反引号 ` 不是单引号 '
  },
  deleteDoctor(id) {
    console.log(id);
    return http.get(`${BASE_URL}/delete_doctor`, {
      params: {
        doctor_number: id
      }
    });
    },
    // addDoctor(doctor) {
    //     return http.post(`${BASE_URL}/add_doctor`, doctor);
    // },
    // updateDoctor(doctor) {
    //     return http.put(`${BASE_URL}/update_doctor`, doctor);
    // },
}

export default api_doctor;