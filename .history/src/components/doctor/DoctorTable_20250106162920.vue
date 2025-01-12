<template>
    <div class="table-container" v-loading="loading">
      <el-table :data="tableData" border stripe   style="width: 100%">
        <el-table-column type="index"  label="序号" min-width="10px"></el-table-column>
        <el-table-column prop="doctor" label="行政区"></el-table-column>
        <el-table-column prop="cityCounty" label="市/县"></el-table-column>
        <el-table-column prop="count" label="个数" sortable ></el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  import api_doctor from '@/api/doctor';
  
  export default {
    name: 'DoctorTable',
    data() {
      return {
        tableData: [], // 存储表格数据
        structData: [], // 存储原始数据
        totalCount: 0 ,// 存储总个数
        loading: false//表格加载状态
      };
    },
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
        }finally{
          this.loading = false;
        }
      },

      getTableData() {
        // 统计每个医生出现的次数
        const doctorCounts = {};
        this.structData.forEach(item => {
          const doctor = item.doctor;
          if (doctorCounts[doctor]) {
            doctorCounts[doctor]++;
          } else {
            doctorCounts[doctor] = 1;
          }
        });
  
      }
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