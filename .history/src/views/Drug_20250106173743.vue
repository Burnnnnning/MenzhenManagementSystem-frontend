<template>
    <div class="doctor">
        <div class="header">
            <el-tabs v-model="activeTab">
                <el-tab-pane label="药品信息表" name="table">
                    <DrugTable />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { ElTabs, ElTabPane } from 'element-plus';
import DrugTable from '@/components/drug/DrugTable';  // 修改导入路径

export default {
    name: 'Drug',
    components: {
        ElTabs,
        ElTabPane,
        DrugTable,  // 使用 DrugTable 组件
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