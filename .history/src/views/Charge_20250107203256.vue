<script>
import { getAllPatients } from '@/api'; // 导入 API 方法

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