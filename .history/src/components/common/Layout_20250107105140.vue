<template>
  <div>
    <!-- 头部 -->
    <Header style="position: fixed; top: 0; left: 0; right: 0; z-index: 2;" />
    <!-- 主体 -->
    <div style="position: fixed; display: flex; margin-top: 50px;">
      <!-- 内容 -->
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header.vue";

export default {
  name: "Layout",
  components: {
    Header
  },
}
</script>

<style scoped></style>