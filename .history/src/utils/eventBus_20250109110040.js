import mitt from 'mitt';
// export const EventBus = mitt(); // 创建并导出 EventBus

import { ref } from 'vue';

const username = ref(''); // 全局状态
const EventBus = {
  onLogin(callback) {
    callback(username.value); // 触发回调
  },
  emitLogin(newUsername) {
    username.value = newUsername; // 更新 username
  },
};

export default EventBus;