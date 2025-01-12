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
  addDoctor(form) {
    return http.post(`${BASE_URL}/add_doctor`, {
      params: {
        doctor_number: form.doctor_number,
        name: form.doctor_name,
        gender: form.gender,
        age: form.age,
        department: form.department,
        contact: form.contact,
        outpatient_time: form.outpatient
      }
    });
  },
  // updateDoctor(doctor) {
  //     return http.put(`${BASE_URL}/update_doctor`, doctor);
  // },
}

export default api_doctor;