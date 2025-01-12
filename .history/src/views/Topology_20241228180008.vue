<template>
  <div class="net">
    <div id="svgContainer" class="centered-image"></div>
  </div>
</template>
<script>
export default {
  name: 'Topology',
  data() {
    return {
    };
  },
  mounted() {
    const svgUrl = require('../assets/河南省黄河干流取水口门分布概化图.svg');

    fetch(svgUrl)
      .then(response => response.text())
      .then(svgText => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');

        // 设置viewBox属性以使SVG自适应
        svgDoc.documentElement.setAttribute('viewBox', '0 0 640 480');
        const svgContainer = document.getElementById('svgContainer');
        svgContainer.innerHTML = new XMLSerializer().serializeToString(svgDoc.documentElement);
      })
      .catch(error => console.error('Error fetching SVG:', error));
  }
}
</script>
<style>
.net {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Optional: to center vertically */
}
.centered-image {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.centered-image svg {
  width: 100%;
  height: 100%;
}
</style>