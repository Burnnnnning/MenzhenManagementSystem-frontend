<template>
    <div class="doctor">
        <div class="header">
            <el-tabs v-model="activeTab">
                <el-tab-pane label="患者管理" name="patient_table">
                    <PatientTable />
                </el-tab-pane>
                <el-tab-pane label="诊疗表" name="patient_treatment_table">
                    <PatientTreatmentTable />
                </el-tab-pane>
                <el-tab-pane label="处方表" name="patient_drug_table">
                    <PatientDrugTable />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { ElTabs, ElTabPane } from 'element-plus';
import PatientTable from '@/components/patient/PatientTable';
import PatientTreatmentTable from '@/components/patient/PatientTreatmentTable';
import PatientDrugTable from '@/components/patient/PatientDrugTable';

export default {
    name: 'Patient',
    components: {
        ElTabs,
        ElTabPane,
        PatientTable,
        PatientTreatmentTable,
        PatientDrugTable
    },
    data() {
        return {
            activeTab: 'patient_table'  // 默认显示患者管理
        };
    },
    methods: {

    }
};

</script>

<style scoped>
.doctor {
    margin: 0 auto;
    padding: 20px;
}

.header {
    position: relative;
    height: 80vh;
    /* 设置固定高度，可以根据需要调整 */
    overflow-y: auto;
    /* 启用垂直滚动条 */
}
</style>