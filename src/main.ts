import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies'
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Profile from './components/Profile.vue';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueCookies);

const routes = [
      {
        path: '',
        component: Home,
      },
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/profile',
        component: Profile,
      },
];

const router = new VueRouter({
  routes,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
