<template>
  <div class="settlement-page">
    <h2>费用结算</h2>

    <!-- 使用 el-row 和 el-col 实现左右布局 -->
    <el-row :gutter="20">
      <!-- 左侧：查询框 -->
      <el-col :span="8">
        <el-card class="query-card">
          <el-form :model="queryForm" label-width="100px" class="query-form">
            <el-divider content-position="center" class="large-font">
              个人信息
            </el-divider>
            <el-form-item label="患者姓名" class="large-font">
              <el-input v-model="queryForm.Name" placeholder="请输入患者姓名" clearable style="width: 80%;" />
              <el-button type="primary" @click="handleSearch" style="margin-left: 10px;">查询</el-button>
            </el-form-item>
            <el-form-item v-if="patientOptions.length > 0" label="选择患者" class="large-font">
              <el-select v-model="queryForm.selectedPatient" placeholder="请选择患者" @change="handlePatientSelect"
                clearable>
                <el-option v-for="patient in patientOptions" :key="patient.Patient_Number"
                  :label="`${patient.Name} (${patient.ID_Card_Number})`" :value="patient.Patient_Number" />
              </el-select>
            </el-form-item>
            <!-- 患者信息 -->
            <el-form-item label="姓名" class="large-font">
              <el-input v-model="form.Name" disabled />
            </el-form-item>
            <el-form-item label="年龄" class="large-font">
              <el-input v-model="form.Age" disabled />
            </el-form-item>
            <el-form-item label="性别" class="large-font">
              <el-input v-model="form.Gender" disabled />
            </el-form-item>
            <el-form-item label="联系方式" class="large-font">
              <el-input v-model="form.Contact_Info" disabled />
            </el-form-item>
            <el-form-item label="身份证号" class="large-font">
              <el-input v-model="form.ID_Card_Number" disabled />
            </el-form-item>
            <el-form-item label="医保类型" class="large-font">
              <el-input v-model="form.Medical_Insurance" disabled />
            </el-form-item>
            <el-form-item label="症状" class="large-font">
              <el-input v-model="form.Symptom" disabled />
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <!-- 右侧：费用结算表单 -->
      <el-col :span="16">
        <el-card class="settlement-card">
          <el-form :model="form" label-width="80px" class="settlement-form">
            <!-- 费用明细 -->
            <el-divider content-position="center" class="large-font">
              费用明细
            </el-divider>
            <el-table :data="form.feeDetails" style="width: 100%; font-size: 16px;" stripe>
              <el-table-column prop="item" label="项目" />
              <el-table-column prop="price" label="单价" />
              <el-table-column prop="quantity" label="数量" />
              <el-table-column prop="amount" label="金额" />
            </el-table>

            <!-- 总费用 -->
            <el-form-item label="总费用" class="large-font">
              <el-input v-model="form.totalAmount" disabled />
            </el-form-item>
            <el-form-item label="医保报销" class="large-font">
              <el-input v-model="form.insuranceAmount" disabled />
            </el-form-item>
            <el-form-item label="自费金额" class="large-font">
              <el-input v-model="form.payAmount" disabled />
            </el-form-item>

            <!-- 支付方式 -->
            <el-form-item label="支付方式" class="large-font">
              <el-select v-model="form.paymentMethod" placeholder="请选择支付方式" clearable>
                <el-option label="现金" value="cash" />
                <el-option label="银行卡" value="card" />
                <el-option label="微信" value="wechat" />
                <el-option label="支付宝" value="alipay" />
              </el-select>
            </el-form-item>

            <!-- 结算按钮 -->
            <el-form-item>
              <el-button type="primary" @click="handleSettlement">结算</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api_charge from '@/api/patient'; // 导入 API 方法
import { ElMessage } from 'element-plus'; // 引入 Element Plus 的消息提示组件

export default {
  data() {
    return {
      mockPatients: [], // 初始化为空数组
      queryForm: {
        Name: '',
        selectedPatient: '',
      },
      patientOptions: [],
      form: {
        Name: '',
        Age: '',
        Gender: '',
        Contact_Info: '',
        ID_Card_Number: '',
        Medical_Insurance: '',
        Symptom: '',
        feeDetails: [],
        totalAmount: 0,
        insuranceAmount: 0,
        payAmount: 0,
        paymentMethod: '',
      },
    };
  },
  methods: {
    handleSearch() {
      if (this.queryForm.Name) {
        // 过滤患者列表
        this.patientOptions = this.mockPatients.filter((patient) =>
          patient.Name.includes(this.queryForm.Name)
        );

        // 如果查不到患者，提示用户
        if (this.patientOptions.length === 0) {
          ElMessage.warning('查无此人，请检查患者姓名是否正确！');
          this.clearForm(); // 清空表单数据
        }
      } else {
        // 如果输入框为空，清空患者选项和其他信息
        this.patientOptions = [];
        this.clearForm();
      }
    },
    handlePatientSelect(patientNumber) {
      const selectedPatient = this.mockPatients.find((patient) => patient.Patient_Number === patientNumber);
      if (selectedPatient) {
        // 更新表单数据
        this.form.Name = selectedPatient.Name;
        this.form.Age = selectedPatient.Age;
        this.form.Gender = selectedPatient.Gender;
        this.form.Contact_Info = selectedPatient.Contact_Info;
        this.form.ID_Card_Number = selectedPatient.ID_Card_Number;
        this.form.Medical_Insurance = selectedPatient.Medical_Insurance;
        this.form.Symptom = selectedPatient.Symptom;
        this.form.feeDetails = selectedPatient.feeDetails || [];
        this.form.totalAmount = selectedPatient.totalAmount || 0;
        this.form.insuranceAmount = selectedPatient.insuranceAmount || 0;
        this.form.payAmount = selectedPatient.payAmount || 0;
      }
    },
    clearForm() {
      // 清空表单数据
      this.form.Name = '';
      this.form.Age = '';
      this.form.Gender = '';
      this.form.Contact_Info = '';
      this.form.ID_Card_Number = '';
      this.form.Medical_Insurance = '';
      this.form.Symptom = '';
      this.form.feeDetails = [];
      this.form.totalAmount = 0;
      this.form.insuranceAmount = 0;
      this.form.payAmount = 0;
      this.form.paymentMethod = '';
    },
    handleSettlement() {
      console.log('结算信息:', this.form);
    },
  },
  async mounted() {
    try {
      const response = await api_charge.getAllPatients(); // 调用 API 获取数据
      this.mockPatients = response.data; // 假设返回的数据在 response.data 中
      console.log('Patients:', this.mockPatients);
    } catch (error) {
      console.error('获取患者数据失败:', error);
    }
  },
};
</script>

<style scoped>
.settlement-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.query-card,
.settlement-card {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.el-form-item {
  margin-bottom: 18px;
}

.el-divider {
  margin: 20px 0;
}

.el-table {
  margin-bottom: 20px;
}

.large-font {
  font-size: 18px;
  /* 统一字体大小 */
}
</style>