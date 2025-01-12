<template>
    <div class="header">
      <div class="title">
        <span style="font-size: larger;">门诊收费管理系统</span>
      </div>
      <div class="nav">
        <router-link to="/doctor" class="nav-button" active-class="active" exact-active-class="active">医生信息管理</router-link>
        <router-link to="/patient" class="nav-button" active-class="active" exact-active-class="active">患者信息管理</router-link>
        <router-link to="/treatment" class="nav-button" active-class="active" exact-active-class="active">诊疗项目管理</router-link>
        <router-link to="/drug" class="nav-button" active-class="active" exact-active-class="active">药品信息管理</router-link>
        <router-link to="/charge" class="nav-button" active-class="active" exact-active-class="active">费用结算管理</router-link>
        <router-link to="/manager" class="nav-button" active-class="active" exact-active-class="active">收费人员管理</router-link>
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
  import { Avatar } from '@element-plus/icons-vue';
  import router from "@/router";
  
  export default {
    name: "Header",
    components: {
      ElDropdown,
      ElDropdownMenu,
      ElDropdownItem,
      ElIcon,
      Avatar
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
    z-index: 1000;/* 使头部始终在最上层 */
  }
  
  .title {
    font-weight: bold;
    flex: 1;
  }
  
  .nav {
    display: flex;
    justify-content: center; /* 使导航按钮居中对齐 */
    gap: 20px; /* 增加按钮之间的距离 */
    flex: 1;
  }
  
  .nav-button {
    color: white;
    border: 1px solid white; /* 边框大小调整为1px */
    border-radius: 15px; /* 树叶型的框 */
    padding: 2px 8px; /* 调整内边距 */
    font-size: 14; /* 调整字体大小 */
    transition: background-color 0.3s;
    text-decoration: none; /* 去掉链接下划线 */
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px; /* 设置按钮高度 */
  }
  
  .nav-button:hover {
    background-color: #e18c42;
  }
  
  .active {
    background-color: #e18c42; /* 选中时的背景颜色 */
  }
  
  .user-info {
    display: flex;
    align-items: center;
  }
  
  .user-info span {
    display: flex;
    align-items: center;
    font-size: 15;
    cursor: pointer;
    color: white; /* 设置用户名颜色为白色 */
  }
  
  .user-info .el-icon {
    margin-left: 10px;
    color: white; /* 设置图标颜色为白色 */
  }
  </style>