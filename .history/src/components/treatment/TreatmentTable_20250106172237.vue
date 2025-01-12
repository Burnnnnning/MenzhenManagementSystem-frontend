<template>
    <div class="table-container" v-loading="loading">
        <el-table :data="tableData" border stripe style="width: 100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="Item_Number" label="项目编号" min-width="120"></el-table-column>
            <el-table-column prop="Item_Name" label="项目名称" min-width="150"></el-table-column>
            <el-table-column prop="Price" label="价格" min-width="120" sortable></el-table-column>
        </el-table>
    </div>
</template>

<script>
import api_treatment from '@/api/treatment'; // 假设 API 文件名为 treatment.js
import { it } from 'element-plus/es/locale';

export default {
    name: 'TreatmentTable',
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
                // 调用API获取所有治疗项目数据
                const response = await api_treatment.getAllTreatmentItems();
                console.log('API Response:', response); // 打印 API 返回的数据
                if (response.code === 200) {
                    this.tableData = response.data; // 保存数据
                    this.getTableData();
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
        getTableData() {
            this.tableData = this.structData.map((item) => {
                return {
                    Item_Number:item.Item_Number,
                    Item_Name:item.Item_Name,
                    Price:item.Price
                    
                };
            });
        }
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