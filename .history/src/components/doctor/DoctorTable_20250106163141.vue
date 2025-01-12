<template>
  <div class="table-container" v-loading="loading">
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column type="index" label="医生编号" min-width="10px"></el-table-column>
      <el-table-column prop="doctor" label="医生姓名"></el-table-column>
      <el-table-column prop="cityCounty" label=""></el-table-column>
      <el-table-column prop="count" label="个数" sortable></el-table-column>
    </el-table>
  </div>
</template>

<script>
import api_doctor from '@/api/doctor';

export default {
  name: 'DoctorTable',
  methods: {
    async loadTableData() {
      this.loading = true;
      try {
        // 调用API获取所有医生数据
        const response = await api_doctor.getAllDoctors();
        console.log(response);
        if (response.code === 200) {
          this.structData = response.data;
          this.getTableData();
        } else {
          console.error('Failed to load table data:', response.message);
        }
      } catch (error) {
        console.error('Failed to load table data:', error);
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.loadTableData();
  }
};
</script>

<style scoped>
.table-container {
  padding: 20px;
}

.summary {
  margin-top: 10px;
  font-size: 12px;
  font-weight: bold;
}
</style>