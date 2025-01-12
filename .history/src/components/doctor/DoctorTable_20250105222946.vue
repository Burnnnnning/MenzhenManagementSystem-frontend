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
        this.tableData = [];
        this.totalCount = 0;
        let countStart = 0;
  
        if (Array.isArray(this.structData)) {
          this.structData.forEach((r, index) => {
            let count = 0;
            let cityCounty = '';
  
            if (Array.isArray(r.children)) {
              r.children.forEach((c) => {
                if (c.name.includes('*')) countStart++;
                cityCounty += c.name + '  ,';
                count ++;
              });
            }
            this.tableData.push({
              index: index + 1,
              doctor: r.name,
              cityCounty: cityCounty.slice(0, -1), // 去除最后一个逗号
              count
            });
            this.totalCount += count;
          });
          this.totalCount -= countStart;
          // 添加合计行
          this.tableData.push({
            index: '',
            doctor: '合计（现状）',
            cityCounty: '备注：带“*”的县（市）表示规划供水范围',
            count: this.totalCount
          });
        } else {
          console.error('structData is not an array');
        }
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