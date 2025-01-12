import http from '@/utils/http'

const BASE_URL = '/doctor';

const api_doctor = {

  getAllDoctors() {
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