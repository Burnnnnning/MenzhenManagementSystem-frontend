<template>
    <div class="doctor">
      <div class="header">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="患者信息表" name="table">
            <PatientTable />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </template>
  
  <script>
  import { ElTabs, ElTabPane } from 'element-plus';
  import PatientTable from '@/components/doctor/PatientTable';
  
  export default {
    name: 'Patient',
    components: {
      ElTabs,
      ElTabPane,
      PatientTable,
    },
    methods: {
  
    }
  };
  
  </script>
  
  <style scoped>
  .doctor {
    padding: 20px;
    width: 100%;
  }
  
  .header {
    margin-bottom: 20px;
  }
  
  .content {
    border: 1px solid #ccc;
    padding: 10px;
    width: 100%;
  }
  </style>