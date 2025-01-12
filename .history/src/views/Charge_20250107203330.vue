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
              <el-input v-model="queryForm.patientName" placeholder="请输入患者姓名" @input="handleSearch" clearable />
            </el-form-item>
            <el-form-item v-if="patientOptions.length > 0" label="选择患者" class="large-font">
              <el-select v-model="queryForm.selectedPatient" placeholder="请选择患者" @change="handlePatientSelect"
                clearable>
                <el-option v-for="patient in patientOptions" :key="patient.id"
                  :label="`${patient.name} (${patient.idCard})`" :value="patient.id" />
              </el-select>
            </el-form-item>
            <!-- 患者信息 -->
            <el-form-item label="患者姓名" class="large-font">
              <el-input v-model="form.patientName" disabled />
            </el-form-item>
            <el-form-item label="身份证号" class="large-font">
              <el-input v-model="form.idCard" disabled />
            </el-form-item>
            <el-form-item label="医保类型" class="large-font">
              <el-input v-model="form.insuranceType" disabled />
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
import { getAllPatients } from '@/api/patient'; // 导入 API 方法

export default {
  data() {
    return {
      mockPatients: [], // 初始化为空数组
      queryForm: {
        patientName: '',
        selectedPatient: '',
      },
      patientOptions: [],
      form: {
        patientName: '',
        idCard: '',
        insuranceType: '',
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
      if (this.queryForm.patientName) {
        this.patientOptions = this.mockPatients.filter((patient) =>
          patient.name.includes(this.queryForm.patientName)
        );
      } else {
        this.patientOptions = [];
      }
    },
    handlePatientSelect(patientId) {
      const selectedPatient = this.mockPatients.find((patient) => patient.id === patientId);
      if (selectedPatient) {
        this.form.patientName = selectedPatient.name;
        this.form.idCard = selectedPatient.idCard;
        this.form.insuranceType = selectedPatient.insuranceType;
        this.form.feeDetails = selectedPatient.feeDetails;
        this.form.totalAmount = selectedPatient.totalAmount;
        this.form.insuranceAmount = selectedPatient.insuranceAmount;
        this.form.payAmount = selectedPatient.payAmount;
      }
    },
    handleSettlement() {
      console.log('结算信息:', this.form);
    },
  },
  async mounted() {
    try {
      const response = await getAllPatients(); // 调用 API 获取数据
      this.mockPatients = response.data; // 假设返回的数据在 response.data 中
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