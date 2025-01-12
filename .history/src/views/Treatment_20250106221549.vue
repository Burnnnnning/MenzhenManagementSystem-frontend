<template>
    <div class="treatment">
        <div class="header">
            <el-tabs v-model="activeTab">
                <TreatmentTable />
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { ElTabs, ElTabPane } from 'element-plus';
import TreatmentTable from '@/components/treatment/TreatmentTable'; // 引入 TreatmentTable 组件

export default {
    name: 'Treatment',
    components: {
        ElTabs,
        ElTabPane,
        TreatmentTable,
    },
    methods: {

    }
};
</script>

<style scoped>
.treatment {
    padding: 20px;
    width: 100%;
}

.header {
    margin-bottom: 20px;
}
</style>