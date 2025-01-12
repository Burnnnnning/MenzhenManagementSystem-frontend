<template>
  <div class="header">
    <div class="title">
      <span style="font-size: larger;">门诊收费管理系统</span>
    </div>
    <div class="nav">
      <router-link to="/doctor" class="nav-button" active-class="active" exact-active-class="active">
        <el-icon>
          <User />
        </el-icon>
        <span>医生信息管理</span>
      </router-link>
      <router-link to="/patient" class="nav-button" active-class="active" exact-active-class="active">
        <el-icon>
          <User />
        </el-icon>
        <span>患者信息管理</span>
      </router-link>
      <router-link to="/treatment" class="nav-button" active-class="active" exact-active-class="active">
        <el-icon>
          <Document />
        </el-icon>
        <span>诊疗项目管理</span>
      </router-link>
      <router-link to="/drug" class="nav-button" active-class="active" exact-active-class="active">
        <el-icon>
          <MedicineBox />
        </el-icon>
        <span>药品信息管理</span>
      </router-link>
      <router-link to="/charge" class="nav-button" active-class="active" exact-active-class="active">
        <el-icon>
          <Money />
        </el-icon>
        <span>费用结算管理</span>
      </router-link>
      <router-link to="/manager" class="nav-button" active-class="active" exact-active-class="active">
        <el-icon>
          <Setting />
        </el-icon>
        <span>收费人员管理</span>
      </router-link>
    </div>
    <div class="user-info">
      <el-dropdown trigger="click" class="hover">
        <span class="user-name">
          {{ username }}
          <el-icon class="user-icon">
            <Avatar />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="exit">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElIcon } from 'element-plus';
import { Avatar, User, Document, MedicineBox, Money, Setting } from '@element-plus/icons-vue';
import router from "@/router";

export default {
  name: "Header",
  components: {
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElIcon,
    Avatar,
    User,
    Document,
    MedicineBox,
    Money,
    Setting
  },
  data() {
    return {
      username: '管理员', // 这里可以替换为实际的用户名
    }
  },
  methods: {
    exit() {
      // 退出系统的逻辑
      router.push('/login');
      console.log('退出系统');
    }
  }
}
</script>

<style scoped>
.header {
  height: 60px;
  line-height: 60px;
  background-color: #09bbff;
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: white;
  z-index: 1000;
  /* 使头部始终在最上层 */
}

.title {
  font-weight: bold;
  flex: 1;
}

.nav {
  display: flex;
  justify-content: center;
  /* 使导航按钮居中对齐 */
  gap: 15px;
  /* 增加按钮之间的距离 */
  flex: 1;
}

.nav-button {
  color: white;
  border: 1px solid white;
  /* 边框大小调整为1px */
  border-radius: 15px;
  /* 树叶型的框 */
  padding: 8px 20px;
  /* 调整内边距，增加按钮大小 */
  font-size: 14px;
  /* 调整字体大小 */
  transition: background-color 0.3s, transform 0.2s;
  text-decoration: none;
  /* 去掉链接下划线 */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  /* 增加按钮高度 */
  white-space: nowrap;
  /* 防止文字换行 */
}

.nav-button:hover {
  background-color: #e18c42;
  transform: scale(1.05);
  /* 悬停时稍微放大 */
}

.active {
  background-color: #e18c42;
  /* 选中时的背景颜色 */
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info span {
  display: flex;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
  color: white;
  /* 设置用户名颜色为白色 */
}

.user-info .el-icon {
  margin-left: 10px;
  color: white;
  /* 设置图标颜色为白色 */
}
</style>