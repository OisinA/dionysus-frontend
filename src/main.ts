import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Main from './components/Main.vue'

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
      {
        path: '',
        component: Home,
      },
      {
        path: '/login',
        component: Login,
      },
];

const router = new VueRouter({
  routes,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
