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
            activeTab: 'patient_table' // 默认显示河南省黄河供水区表
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
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white; /* 设置背景色 */
    z-index: -1000; /* 确保在最上层 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 可选：添加阴影 */
}

.content {
    border: 1px solid #ccc;
    padding: 10px;
    width: 100%;
}

</style>