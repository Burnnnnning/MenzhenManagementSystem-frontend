<template>
    <div class="doctor">
      <div class="header">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="收费信息表" name="table">
            <ChargeTable />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </template>
  
  <script>
  import { ElTabs, ElTabPane } from 'element-plus';
  import ChargeTable from '@/components/charge/ChargeTable'; // 修改导入路径
  
  export default {
    name: 'Charge',
    components: {
      ElTabs,
      ElTabPane,
      ChargeTable, // 使用 ChargeTable 组件
    },
    data() {
      return {
        activeTab: 'table',
      };
    },
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