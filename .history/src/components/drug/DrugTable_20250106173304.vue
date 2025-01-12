<template>
    <div class="table-container" v-loading="loading">
        <el-table :data="tableData" border stripe style="width: 100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="Drug_Number" label="药品编号" min-width="120"></el-table-column>
            <el-table-column prop="Drug_Name" label="药品名称" min-width="150"></el-table-column>
            <el-table-column prop="Drug_Price" label="药品价格" min-width="120" sortable></el-table-column>
            <el-table-column prop="Drug_Production_Date" label="生产日期" min-width="120"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import api_drug from '@/api/drug'; // 假设 API 文件名为 drug.js

export default {
    name: 'DrugTable', // 修改组件名
    data() {
        return {
            loading: false, // 加载状态
            tableData: [], // 表格数据
        };
    },
    methods: {
        // 加载表格数据
        async loadTableData() {
            this.loading = true;
            try {
                // 调用API获取所有药品数据
                const response = await api_drug.getAllDrugs();
                console.log('API Response:', response); // 打印 API 返回的数据
                if (response.code === 200) {
                    this.tableData = this.mapTableData(response.data); // 处理并保存数据
                } else {
                    console.error('Failed to load table data:', response.message);
                }
            } catch (error) {
                console.error('Failed to load table data:', error);
            } finally {
                this.loading = false;
            }
        },
        // 处理数据并映射到表格
        mapTableData(data) {
            return data.map((item) => ({
                Drug_Number: item.Drug_Number,
                Drug_Name: item.Drug_Name,
                Drug_Price: item.Drug_Price,
                Drug_Production_Date: item.Drug_Production_Date,
            }));
        },
    },
    created() {
        this.loadTableData(); // 组件创建时加载数据
    },
};
</script>

<style scoped>
.table-container {
    padding: 20px;
}

.el-table {
    height: 400px;
    /* 确保表格可见 */
}
</style>