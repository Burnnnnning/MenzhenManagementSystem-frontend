<template>
    <div class="table-container" v-loading="loading">
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="Name" label="患者姓名" min-width="120"></el-table-column>
        <el-table-column prop="Gender" label="性别" min-width="100"></el-table-column>
        <el-table-column prop="Age" label="年龄" min-width="100" sortable></el-table-column>
        <el-table-column prop="Symptom" label="症状" min-width="150"></el-table-column>
        <el-table-column prop="Contact_Info" label="联系方式" min-width="120"></el-table-column>
        <el-table-column prop="Medical_Insurance" label="医保信息" min-width="150"></el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  import api_patient from '@/api/patient'; // 假设 API 文件名为 patient.js
  
  export default {
    name: 'PatientTable',
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
          // 调用API获取所有患者数据
          const response = await api_patient.getAllPatients();
          console.log('API Response:', response); // 打印 API 返回的数据
          if (response.code === 200) {
            this.structData = response.data; // 保存原始数据
            console.log('structData:', this.structData); // 打印 structData
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
          console.log('Item:', item); // 打印每条数据
          return {
            Name: item.Name, // 患者姓名
            Gender: item.Gender, // 性别
            Age: item.Age, // 年龄
            Symptom: item.Symptom, // 症状
            Contact_Info: item.Contact_Info, // 联系方式
            Medical_Insurance: item.Medical_Insurance, // 医保信息
          };
        });
        console.log('tableData:', this.tableData); // 打印最终的 tableData
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
  
  .el-table {
    height: 700px; /* 确保表格可见 */
  }
  </style>