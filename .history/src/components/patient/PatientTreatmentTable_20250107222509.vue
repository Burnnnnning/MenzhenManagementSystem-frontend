<template>
    <div>
        <!-- 搜索框和按钮 -->
        <el-row justify="space-between" align="middle">
            <!-- 添加治疗项目按钮（左侧） -->
            <el-button type="success" @click="handleAdd" style="margin-top: -15px">添加治疗项目</el-button>

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
</script>