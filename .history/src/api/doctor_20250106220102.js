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
    return http.get(`${BASE_URL}/update_doctor`, {
      params: {
        doctor_number: form.doctor_number,
        new_name: form.new_name,
        new_gender: form.new_gender,
        new_age: form.new_age,
        new_department: form.new_department,
        new_contact: form.new_contact,
        new_outpatient_time: form.new_outpatient_time
      }
    });
  },
  searchDoctor(name) {
    console.log(name);
    return http.get(`${BASE_URL}/get_doctor_by_doctor_number`, {
      params: {
        doctor_number: name
      }
    });
  }
}

export default api_doctor;