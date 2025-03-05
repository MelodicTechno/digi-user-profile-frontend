import { createApp } from 'vue';
import { createPinia } from 'pinia'; // 导入 Pinia
import App from './App.vue';
import router from './router'; // 导入路由
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faUserChart, faChartLine, faStore, faUsers } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// library.add(faUserChart, faChartLine, faStore, faUsers);

const app = createApp(App);
// app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia()); // 使用 Pinia
app.use(router); // 使用路由
app.mount('#app');