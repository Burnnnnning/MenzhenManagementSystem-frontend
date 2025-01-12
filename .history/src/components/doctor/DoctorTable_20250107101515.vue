<template>
  <div>
    <el-row justify="space-between" align="middle" style="margin-bottom: 10px">
      <!-- 添加医生信息按钮（左侧） -->
      <el-button type="success" @click="handleAdd" style="margin-top: -10px">添加医生信息</el-button>

      <!-- 搜索框和查询按钮（右侧） -->
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="searchForm.name" placeholder="请输入医生姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>


  <div class="table-container" v-loading="loading">
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="Doctor_Number" label="医生编号" min-width="100"></el-table-column>
      <el-table-column prop="Name" label="医生姓名" min-width="120"></el-table-column>
      <el-table-column prop="Gender" label="医生性别" min-width="100"></el-table-column>
      <el-table-column prop="Age" label="医生年龄" min-width="100" sortable></el-table-column>
      <el-table-column prop="Department" label="医生科室" min-width="150" sortable></el-table-column>
      <el-table-column prop="Contact_Phone" label="联系电话" min-width="120" sortable></el-table-column>
      <el-table-column prop="Outpatient_Time" label="出诊时间" min-width="150" sortable></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 对话框 -->
  <el-dialog v-model="centerDialogVisible" :title="dialogTitle" width="500" center>
    <el-form :model="form" label-width="100px">
      <!-- 医生编号不可修改 -->
      <el-form-item label="医生编号">
        <el-input v-model="form.Doctor_Number" placeholder="请输入医生编号" :disabled="dialogTitle === '编辑'"></el-input>
      </el-form-item>
      <el-form-item label="医生姓名">
        <el-input v-model="form.Name" placeholder="请输入医生姓名"></el-input>
      </el-form-item>
      <el-form-item label="医生性别">
        <el-select v-model="form.Gender" placeholder="请选择性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="医生年龄">
        <el-input v-model="form.Age" placeholder="请输入医生年龄"></el-input>
      </el-form-item>
      <el-form-item label="医生科室">
        <el-input v-model="form.Department" placeholder="请输入医生科室"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.Contact_Phone" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="出诊时间">
        <el-input v-model="form.Outpatient_Time" placeholder="请输入出诊时间"></el-input>
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
</template>
<script>
import api_doctor from '@/api/doctor'; // 导入 API 模块

export default {
  name: 'DoctorTable',
  data() {
    return {
      loading: false, // 加载状态
      structData: [], // 原始数据
      tableData: [], // 表格数据
      centerDialogVisible: false, // 控制对话框显示
      dialogTitle: '', // 对话框标题
      form: {
        Doctor_Number: '', // 医生编号
        Name: '',
        Gender: '',
        Age: '',
        Department: '',
        Contact_Phone: '',
        Outpatient_Time: '',
      }, // 表单数据
      searchForm: {
        name: '',
      } // 搜索表单数据

    };
  },
  methods: {
    // 搜索医生信息
    async search() {
      const keyword = this.searchForm.name.trim(); // 获取搜索关键字
      if (!keyword) {
        // 如果关键字为空，重置表格数据为原始数据
        this.tableData = [...this.structData];
        this.$message.warning('已重置表格数据'); // 提示重置成功
        return;
      }

      try {
        this.loading = true; // 显示加载状态
        // 调用搜索 API
        const response = await api_doctor.searchDoctor(keyword);
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
        Doctor_Number: '', // 新增时清空编号
        Name: '',
        Gender: '',
        Age: '',
        Department: '',
        Contact_Phone: '',
        Outpatient_Time: '',
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
          // 调用新增医生接口
          const response = await api_doctor.addDoctor({
            doctor_number: this.form.Doctor_Number,
            doctor_name: this.form.Name,
            gender: this.form.Gender,
            age: this.form.Age,
            department: this.form.Department,
            contact: this.form.Contact_Phone,
            outpatient: this.form.Outpatient_Time,
          });
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
          // 调用更新医生接口
          const response = await api_doctor.updateDoctor({
            doctor_number: this.form.Doctor_Number,
            new_name: this.form.Name,
            new_gender: this.form.Gender,
            new_age: this.form.Age,
            new_department: this.form.Department,
            new_contact: this.form.Contact_Phone,
            new_outpatient_time: this.form.Outpatient_Time,
          });
          if (response.code === 200) {
            this.$message.success('更新成功'); // 提示更新成功
            // 更新表格数据
            const index = this.tableData.findIndex(item => item.Doctor_Number === this.form.Doctor_Number);
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
        const response = await api_doctor.deleteDoctor(row.Doctor_Number); // 调用删除接口
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
        // 调用API获取所有医生数据
        const response = await api_doctor.getAllDoctors();
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
          Doctor_Number: item.Doctor_Number, // 医生编号
          Name: item.Name, // 医生姓名
          Gender: item.Gender, // 医生性别
          Age: item.Age, // 医生年龄
          Department: item.Department, // 医生科室
          Contact_Phone: item.Contact_Phone, // 联系电话
          Outpatient_Time: item.Outpatient_Time, // 出诊时间
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