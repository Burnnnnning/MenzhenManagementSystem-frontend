<template>
    <div class="doctor">
        <div class="header" >
            <el-tabs v-model="activeTab" style="position: fixed">
                <el-tab-pane label="患者管理" name="patient_table">
                    <PatientTable />
                </el-tab-pane>
                <el-tab-pane label="诊疗表" name="patient_treatment_table">
                    <PatientTreatmentTable />
                </el-tab-pane>
                <el-tab-pane label="处方表" name="patient_drug_table">
                    <PatientDrugTable />
                </el-tab-pane>
                <el-tab-pane label="挂号表" name="patient_doctor_table">
                    <PatientDoctorTable />
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
import PatientDoctorTable from '@/components/patient/PatientDoctorTable';

export default {
    name: 'Patient',
    components: {
        ElTabs,
        ElTabPane,
        PatientTable,
        PatientTreatmentTable,
        PatientDrugTable,
        PatientDoctorTable
    },
    data() {
        return {
            activeTab: 'patient_table' // 默认显示
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
    margin-bottom: 0px;
}

.content {
    border: 1px solid #ccc;
    padding: 10px;
    width: 100%;
}
</style>