<template>
    <div class="manager">
        <div class="header">
            <el-tabs v-model="activeTab">
                <Manager />
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { ElTabs, ElTabPane } from 'element-plus';
import Manager from '@/components/manager/Manager.vue';

export default {
    name: 'Doctor',
    components: {
        ElTabs,
        ElTabPane,
        Manager,
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