import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Mock from './mock'; // 引入mock模块
Mock.start(); //并且执行初始化函数
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
