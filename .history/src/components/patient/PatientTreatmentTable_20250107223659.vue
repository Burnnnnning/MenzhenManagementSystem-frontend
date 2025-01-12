<template>
    <div>
        <!-- 搜索框和按钮 -->
        <el-row justify="space-between" align="middle">
            <!-- 添加治疗项目按钮（左侧） -->
            <el-button type="success" @click="handleAdd" style="margin-top: -15px">添加诊疗项目</el-button>

            <!-- 搜索框和查询按钮（右侧） -->
            <el-form :inline="true">
                <el-form-item>
                    <el-input v-model="searchForm.patientNumber" placeholder="请输入患者编号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
        </el-row>

        <!-- 表格 -->
        <div class="table-container" v-loading="loading">
            <el-table :data="tableData" border stripe style="width: 100%">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="Patient_Treatment_Item_Number" label="治疗项目编号" min-width="100"></el-table-column>
                <el-table-column prop="Patient_Number" label="患者编号" min-width="100"></el-table-column>
                <el-table-column prop="Item_Number" label="项目编号" min-width="100"></el-table-column>
                <el-table-column prop="Treatment_Time" label="治疗时间" min-width="150"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button size="small" type="primary"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 对话框 -->
        <el-dialog v-model="centerDialogVisible" :title="dialogTitle" width="500" center>
            <el-form :model="form" label-width="150px">
                <el-form-item label="治疗项目编号">
                    <el-input v-model="form.Patient_Treatment_Item_Number" placeholder="请输入治疗项目编号"
                        :disabled="dialogTitle === '编辑'"></el-input>
                </el-form-item>
                <el-form-item label="患者编号">
                    <el-input v-model="form.Patient_Number" placeholder="请输入患者编号"></el-input>
                </el-form-item>
                <el-form-item label="项目编号">
                    <el-input v-model="form.Item_Number" placeholder="请输入项目编号"></el-input>
                </el-form-item>
                <el-form-item label="治疗时间">
                    <el-date-picker v-model="form.Treatment_Time" type="datetime" placeholder="选择治疗时间"></el-date-picker>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleSave">
                        {{ dialogTitle === "新增" ? "添加" : "保存" }}
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import api_patient_treatment_item from '@/api/patient_treatment_item'; // 导入治疗项目 API 模块

export default {
    name: 'PatientTreatmentItemTable',
    data() {
        return {
            loading: false, // 加载状态
            structData: [], // 原始数据
            tableData: [], // 表格数据
            centerDialogVisible: false, // 控制对话框显示
            dialogTitle: '', // 对话框标题
            form: {
                Patient_Treatment_Item_Number: '', // 治疗项目编号
                Patient_Number: '', // 患者编号
                Item_Number: '', // 项目编号
                Treatment_Time: '', // 治疗时间
            }, // 表单数据
            searchForm: {
                patientNumber: '', // 搜索框绑定的值
            },
        };
    },
    methods: {
        // 搜索治疗项目
        async search() {
            const keyword = this.searchForm.patientNumber.trim(); // 获取搜索关键字
            if (!keyword) {
                // 如果关键字为空，重置表格数据为原始数据
                this.tableData = [...this.structData];
                this.$message.warning('已重置表格数据'); // 提示重置成功
                return;
            }

            try {
                this.loading = true; // 显示加载状态
                // 调用搜索 API
                const response = await api_patient_treatment_item.searchPatientTreatmentItem(keyword);
                if (response.code === 200) {
                    this.tableData = response.data; // 更新表格数据为搜索结果
                    this.$message.success('搜索成功'); // 提示搜索成功
                } else {
                    this.$message.error('搜索失败：' + response.message); // 提示搜索失败
                }
            } catch (error) {
                this.$message.error('搜索失败：' + error.message); // 提示搜索失败
            } finally {
                this.loading = false; // 关闭加载状态
            }
        },
        // 打开新增对话框
        handleAdd() {
            this.dialogTitle = "新增";
            this.form = {
                Patient_Treatment_Item_Number: '', // 新增时清空编号
                Patient_Number: '',
                Item_Number: '',
                Treatment_Time: '',
            }; // 清空表单
            this.centerDialogVisible = true;
        },
        // 打开编辑对话框
        handleEdit(index, row) {
            this.dialogTitle = "编辑";
            this.form = { ...row }; // 填充表单数据
            this.centerDialogVisible = true;
        },
        // 保存或添加数据
        async handleSave() {
            if (this.dialogTitle === "新增") {
                try {
                    this.loading = true; // 显示加载状态
                    // 调用新增治疗项目接口
                    const response = await api_patient_treatment_item.addPatientTreatmentItem(this.form);
                    if (response.code === 200) {
                        this.$message.success('添加成功'); // 提示添加成功
                        this.tableData.push({ ...this.form }); // 将新数据添加到表格中
                        this.centerDialogVisible = false; // 关闭对话框
                    } else {
                        this.$message.error('添加失败：' + response.message); // 提示添加失败
                    }
                } catch (error) {
                    this.$message.error('添加失败：' + error.message); // 提示添加失败
                } finally {
                    this.loading = false; // 关闭加载状态
                }
            } else {
                // 编辑逻辑
                try {
                    this.loading = true; // 显示加载状态
                    // 调用更新治疗项目接口
                    const response = await api_patient_treatment_item.updatePatientTreatmentItem(this.form);
                    if (response.code === 200) {
                        this.$message.success('更新成功'); // 提示更新成功
                        // 更新表格数据
                        const index = this.tableData.findIndex(item => item.Patient_Treatment_Item_Number === this.form.Patient_Treatment_Item_Number);
                        if (index !== -1) {
                            this.tableData.splice(index, 1, { ...this.form });
                        }
                        this.centerDialogVisible = false; // 关闭对话框
                    } else {
                        this.$message.error('更新失败：' + response.message); // 提示更新失败
                    }
                } catch (error) {
                    this.$message.error('更新失败：' + error.message); // 提示更新失败
                } finally {
                    this.loading = false; // 关闭加载状态
                }
            }
        },
        // 删除数据
        async handleDelete(index, row) {
            try {
                this.loading = true; // 显示加载状态
                const response = await api_patient_treatment_item.deletePatientTreatmentItem(row.Patient_Treatment_Item_Number); // 调用删除接口
                if (response.code === 200) {
                    this.$message.success('删除成功'); // 提示删除成功
                    this.tableData.splice(index, 1); // 从表格中移除数据
                } else {
                    this.$message.error('删除失败：' + response.message); // 提示删除失败
                }
            } catch (error) {
                this.$message.error('删除失败：' + error.message); // 提示删除失败
            } finally {
                this.loading = false; // 关闭加载状态
            }
        },
        // 加载表格数据
        async loadTableData() {
            this.loading = true;
            try {
                // 调用API获取所有治疗项目数据
                const response = await api_patient_treatment_item.getAllPatientTreatmentItems();
                console.log('API Response:', response); // 打印 API 返回的数据
                if (response.code === 200) {
                    this.structData = response.data; // 保存原始数据
                    console.log('structData:', this.structData); // 打印 structData
                    this.getTableData(); // 处理数据并渲染表格
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
                console.log('Item:', item); // 打印每条数据
                return {
                    Patient_Treatment_Item_Number: item.Patient_Treatment_Item_Number, // 治疗项目编号
                    Patient_Number: item.Patient_Number, // 患者编号
                    Item_Number: item.Item_Number, // 项目编号
                    Treatment_Time: item.Treatment_Time, // 治疗时间
                };
            });
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
    height: 700px;
    /* 确保表格可见 */
}
</style>