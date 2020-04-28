import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Todo from '../components/todo.vue';
Vue.use(VueRouter);

const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err);
};
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/todo/:id',
        name: 'todo',
        component: Todo
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
