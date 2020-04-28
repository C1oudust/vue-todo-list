import Vue from 'vue';
import Vuex from 'vuex';

// import state from './state';
// import mutations from './mutations';
// import actions from './actions';

Vue.use(Vuex);
import { getTodoList } from '../api/api';
export default new Vuex.Store({
  state: {
    todoList: [],
    menuOpen: false //移动端的时候菜单是否开启
  },
  getters: {
    getTodoList(state) {
      return state.todoList; // 派生状态todoList
    }
  },
  mutations: {
    EDITTODE(state, data) {
      // 定义名为 EDITTODE函数用作改变todoList的值
      state.todoList = data;
    },
    MENUOPEN(state) {
      // 定义名为 MENUOPEN函数用作改变menuOpen的值
      state.menuOpen = !state.menuOpen;
    }
  },
  actions: {
    getTodo: context => {
      return new Promise(resolve => {
        /**
             *调用 getTodo这个函数的时候
             会调用getTodoList这个ajax请求函数，
             函数返回值后，在调用store.js里面的EDITTODE方法，并且把值传给它。
             */
        getTodoList().then(res => {
          context.commit('EDITTODE', res.data.todos);
          resolve();
        });
      });
    },
    updateMenu: context => {
      context.commit('MENUOPEN'); // 调用store.js里面的MENUOPEN方法
    }
  },
  modules: {}
});
