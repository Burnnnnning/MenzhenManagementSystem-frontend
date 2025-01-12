<template>
    <div class="image-container">
      <img src="@/assets/河南省黄河供水区范围图.png" alt="河南省黄河供水区图" class="centered-image" />
    </div>
  </template>
  
  <script>
  export default {
    name: 'RegionMap'
  };
  </script>
  
  <style scoped>
  .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    overflow: auto; /* 允许滚动以查看完整图片 */
  }
  
  .centered-image {
    display: block;
    width: auto; /* 保持图片的原始宽度 */
    height: auto; /* 保持图片的原始高度 */
  }
  </style>