import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 导入路由
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'

const app = createApp(App);
const pinia = createPinia()
const persist = createPersistedState()
pinia.use(persist)
app.use(pinia)
app.use(router); // 使用路由
app.mount('#app');