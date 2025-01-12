<template>
  <div class="not-found">
    <h1>404</h1>
    <p>你访问的页面不存在......</p>
    <p>{{ countdown }} 秒后自动返回首页</p>
    <router-link to="/">回到首页</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data() {
    return {
      countdown: 5 // 倒计时初始值
    };
  },
  methods: {
    startCountdown() {
      const interval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(interval);
          this.$router.push('/'); // 倒计时结束后跳转到首页
        }
      }, 1000);
    }
  },
  mounted() {
    this.startCountdown(); // 组件挂载后开始倒计时
  }
};
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f8f8f8;
  color: #333;
}

.not-found h1 {
  font-size: 6rem;
  margin: 0;
}

.not-found p {
  font-size: 1.5rem;
  margin: 1rem 0;
}

.not-found a {
  color: #007bff;
  text-decoration: none;
  font-size: 1.2rem;
}
</style>