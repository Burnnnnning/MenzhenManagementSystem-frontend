<template>
  <div class="table-container" v-loading="loading">
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="doctor" label="医生姓名" min-width="120"></el-table-column>
      <el-table-column prop="gender" label="医生性别" min-width="100"></el-table-column>
      <el-table-column prop="age" label="医生年龄" min-width="100" sortable></el-table-column>
      <el-table-column prop="department" label="医生科室" min-width="150" sortable></el-table-column>
      <el-table-column prop="phone" label="联系电话" min-width="120" sortable></el-table-column>
      <el-table-column prop="time" label="出诊时间" min-width="150" sortable></el-table-column>
    </el-table>
  </div>
</template>

<script>
import api_doctor from '@/api/doctor';

export default {
  name: 'DoctorTable',
  data() {
    return {
      loading: false, // 加载状态
      structData: [], // 原始数据
      tableData: [], // 表格数据
    };
  },
  methods: {
    // 加载表格数据
    async loadTableData() {
      this.loading = true;
      try {
        // 调用API获取所有医生数据
        const response = await api_doctor.getAllDoctors();
        console.log(response);
        console.log(response.data);
        if (response.code === 200) {
          this.structData = response.data; // 保存原始数据
          this.getTableData(); // 处理数据并渲染表格
        } else {
          console.error('Failed to load table data:', response.message);
        }
      } catch (error) {
        console.error('Failed to load table data:', error);
      } finally {
        this.loading = false;
      }
    },
    // 处理数据并映射到表格
    getTableData() {
      this.tableData = this.structData.map((item) => {
        console.log(item);
        return {
          doctor: item.doctor, // 医生姓名
          gender: item.gender, // 医生性别
          age: item.age, // 医生年龄
          department: item.department, // 医生科室
          phone: item.phone, // 联系电话
          time: item.time, // 出诊时间
        };
      });
    },
  },
  created() {
    this.loadTableData(); // 组件创建时加载数据
  },
};
</script>

<style scoped>
.table-container {
  padding: 20px;
}
</style>