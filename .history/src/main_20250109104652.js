import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import 'element-plus/dist/index.css';
import '@/assets/css/global.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'; // 确保导入图标
import Header from '@/components/Header.vue';

const app = createApp(App);
app.component('Header', Header);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.use(ElementPlus, { locale: zhCn }).use(store).use(router).mount('#app');


