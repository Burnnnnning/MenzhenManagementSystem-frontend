<template>
  <div class="settlement-page">
    <h2 sytle="">费用结算</h2>

    <!-- 使用 el-row 和 el-col 实现左右布局 -->
    <el-row :gutter="20">
      <!-- 左侧：查询框 -->
      <el-col :span="80">
        <el-card class="query-card">
          <el-form :model="queryForm" label-width="100px" class="query-form">
            <el-divider content-position="left">个人信息</el-divider>
            <el-form-item label="患者姓名">
              <el-input
                v-model="queryForm.patientName"
                placeholder="请输入患者姓名"
                @input="handleSearch"
                clearable
              />
            </el-form-item>
            <el-form-item v-if="patientOptions.length > 0" label="选择患者">
              <el-select
                v-model="queryForm.selectedPatient"
                placeholder="请选择患者"
                @change="handlePatientSelect"
                clearable
              >
                <el-option
                  v-for="patient in patientOptions"
                  :key="patient.id"
                  :label="`${patient.name} (${patient.idCard})`"
                  :value="patient.id"
                />
              </el-select>
            </el-form-item>
            <!-- 患者信息 -->
            <el-form-item label="患者姓名">
              <el-input v-model="form.patientName" disabled />
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input v-model="form.idCard" disabled />
            </el-form-item>
            <el-form-item label="医保类型">
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
            <el-divider content-position="center" style="font-weight: bold; font-size: 20px;">费用明细</el-divider>
            <el-table :data="form.feeDetails" style="width: 100%" stripe>
              <el-table-column prop="item" label="项目" />
              <el-table-column prop="price" label="单价" />
              <el-table-column prop="quantity" label="数量" />
              <el-table-column prop="amount" label="金额" />
            </el-table>

            <!-- 总费用 -->
            <!-- <el-divider content-position="left">费用总计</el-divider> -->
            <el-form-item label="总费用">
              <el-input v-model="form.totalAmount" disabled />
            </el-form-item>
            <el-form-item label="医保报销">
              <el-input v-model="form.insuranceAmount" disabled />
            </el-form-item>
            <el-form-item label="自费金额">
              <el-input v-model="form.payAmount" disabled />
            </el-form-item>

            <!-- 支付方式 -->
            <el-form-item label="支付方式">
              <el-select
                v-model="form.paymentMethod"
                placeholder="请选择支付方式"
                clearable
              >
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

<script setup>
import { ref, reactive } from 'vue';

// 模拟患者数据
const mockPatients = [
  {
    id: 1,
    name: '张三',
    idCard: '123456789012345678',
    insuranceType: '城镇职工医保',
    feeDetails: [
      { item: '挂号费', price: 10, quantity: 1, amount: 10 },
      { item: '检查费', price: 200, quantity: 1, amount: 200 },
      { item: '药品费', price: 50, quantity: 2, amount: 100 },
    ],
    totalAmount: 310,
    insuranceAmount: 150,
    payAmount: 160,
  },
  {
    id: 2,
    name: '张三',
    idCard: '876543210987654321',
    insuranceType: '城乡居民医保',
    feeDetails: [
      { item: '挂号费', price: 10, quantity: 1, amount: 10 },
      { item: '检查费', price: 150, quantity: 1, amount: 150 },
      { item: '药品费', price: 30, quantity: 3, amount: 90 },
    ],
    totalAmount: 250,
    insuranceAmount: 100,
    payAmount: 150,
  },
  {
    id: 3,
    name: '李四',
    idCard: '112233445566778899',
    insuranceType: '城镇职工医保',
    feeDetails: [
      { item: '挂号费', price: 10, quantity: 1, amount: 10 },
      { item: '检查费', price: 300, quantity: 1, amount: 300 },
      { item: '药品费', price: 80, quantity: 1, amount: 80 },
    ],
    totalAmount: 390,
    insuranceAmount: 200,
    payAmount: 190,
  },
];

// 查询表单
const queryForm = reactive({
  patientName: '',
  selectedPatient: '',
});

// 患者选项（模拟数据）
const patientOptions = ref([]);

// 费用结算表单
const form = reactive({
  patientName: '',
  idCard: '',
  insuranceType: '',
  feeDetails: [], // 费用明细
  totalAmount: 0, // 总费用
  insuranceAmount: 0, // 医保报销金额
  payAmount: 0, // 自费金额
  paymentMethod: '', // 支付方式
});

// 处理查询
const handleSearch = () => {
  if (queryForm.patientName) {
    patientOptions.value = mockPatients.filter((patient) =>
      patient.name.includes(queryForm.patientName)
    );
  } else {
    patientOptions.value = [];
  }
};

// 处理患者选择
const handlePatientSelect = (patientId) => {
  const selectedPatient = mockPatients.find((patient) => patient.id === patientId);
  if (selectedPatient) {
    form.patientName = selectedPatient.name;
    form.idCard = selectedPatient.idCard;
    form.insuranceType = selectedPatient.insuranceType;
    form.feeDetails = selectedPatient.feeDetails; // 动态更新费用明细
    form.totalAmount = selectedPatient.totalAmount; // 动态更新总费用
    form.insuranceAmount = selectedPatient.insuranceAmount; // 动态更新医保报销金额
    form.payAmount = selectedPatient.payAmount; // 动态更新自费金额
  }
};

// 处理结算
const handleSettlement = () => {
  console.log('结算信息:', form);
  // 调用后端 API 提交结算请求
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
</style>