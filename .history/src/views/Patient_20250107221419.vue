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
            activeTab: 'patient_table' // 默认显示
        };
    },
    mounted() {
        // 禁用滚轮事件
        window.addEventListener('wheel', this.preventScroll, { passive: false });
    },
    beforeDestroy() {
        // 组件销毁时移除事件监听
        window.removeEventListener('wheel', this.preventScroll);
    },
    methods: {
        preventScroll(event) {
            event.preventDefault(); // 阻止默认滚轮行为
        }
    }
};
</script>

<style scoped>
/* 禁用页面滚动 */
html,
body {
    overflow: hidden;
    height: 100%;
}

.doctor {
    padding: 20px;
    width: 100%;
    height: 100vh;
    /* 高度占满视口 */
    overflow: hidden;
    /* 禁用滚动 */
}

.header {
    margin-bottom: 0px;
}

.content {
    border: 1px solid #ccc;
    padding: 10px;
    width: 100%;
}
</style>