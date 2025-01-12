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
    return http.get(`${BASE_URL}/add_doctor`, {
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
  updateDoctor(form) {
    console.log(form);
    console.log(form.new_name);
    return http.get(`${BASE_URL}/update_doctor`, {
      params: {
        doctor_number: form.doctor_number,
        new_name: form.doctor_name,
        new_gender: form.gender,
        new_age: form.age,
        new_department: form.department,
        new_contact: form.contact,
        new_outpatient_time: form.outpatient
      }
    });
  },
}

export default api_doctor;