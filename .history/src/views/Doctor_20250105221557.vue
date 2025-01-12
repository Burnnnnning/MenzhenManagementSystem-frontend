<template>
  <div class="doctor">
    <div class="header">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="河南省黄河供水区图" name="map">
          <DoctorMap />
        </el-tab-pane>
        <el-tab-pane label="河南省黄河供水区表" name="table">
          <DoctorTable />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { ElTabs, ElTabPane } from 'element-plus';
import DoctorTable from '@/components/doctor/DoctorTable';
import DoctorMap from '@/components/doctor/DoctorMap';

export default {
  name: 'Doctor',
  components: {
    ElTabs,
    ElTabPane,
    DoctorTable,
    DoctorMap
  },
  data() {
    return {
      activeTab: 'map' // 默认显示河南省黄河供水区表
    };
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