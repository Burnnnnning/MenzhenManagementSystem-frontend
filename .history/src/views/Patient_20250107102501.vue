<template>
    <div class="doctor">
        <div class="header">
            <el-tabs v-model="activeTab">
                <el-tab-pane label="患者管理" name="patient_table">
                    <PatientTable />
                </el-tab-pane>
                </el-tab-pane label="诊疗表" name="patient_treatment_table">
                <patinet_treatmentTable />
                </el-tab-pane>
            </el-tabs>

        </div>
    </div>
</template>

<script>
import { ElTabs, ElTabPane } from 'element-plus';
import PatientTable from '@/components/patient/PatientTable';
import patinet_treatmentTable from '@/components/patient/patinet_treatmentTable';

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