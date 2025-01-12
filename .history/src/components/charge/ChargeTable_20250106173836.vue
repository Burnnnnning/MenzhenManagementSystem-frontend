<template>
    <div class="table-container" v-loading="loading">
        <el-table :data="tableData" border stripe style="width: 100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="Charge_Number" label="收费编号" min-width="120"></el-table-column>
            <el-table-column prop="Patient_Number" label="患者编号" min-width="120"></el-table-column>
            <el-table-column prop="Patient_Drug_Info_Number" label="药品关联编号" min-width="150"></el-table-column>
            <el-table-column prop="Patient_Treatment_Item_Number" label="诊疗项目关联编号" min-width="180"></el-table-column>
            <el-table-column prop="Charge_Amount" label="收费金额" min-width="120" sortable></el-table-column>
            <el-table-column prop="Username" label="操作员" min-width="120"></el-table-column>
            <el-table-column prop="Charge_Date" label="收费日期" min-width="120"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import api_charge from '@/api/charge'; // 假设 API 文件名为 charge.js

export default {
    name: 'ChargeTable',
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
                // 调用API获取所有收费数据
                const response = await api_charge.getAllCharges();
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
                Charge_Number: item.Charge_Number,
                Patient_Number: item.Patient_Number,
                Patient_Drug_Info_Number: item.Patient_Drug_Info_Number,
                Patient_Treatment_Item_Number: item.Patient_Treatment_Item_Number,
                Charge_Amount: item.Charge_Amount,
                Username: item.Username,
                Charge_Date: item.Charge_Date,
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