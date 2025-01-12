<template>
  <div class="doctor">
    <div class="header">
      <el-tabs v-model="activeTab">
        <DoctorTable />
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { ElTabs, ElTabPane } from 'element-plus';
import DoctorTable from '@/components/doctor/DoctorTable';

export default {
  name: 'Doctor',
  components: {
    ElTabs,
    ElTabPane,
    DoctorTable,
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