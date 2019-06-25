import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies'
import VueSpinners from 'vue-spinners'
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Profile from './components/Profile.vue';
import Logout from './components/Logout.vue';
import Team from './components/Team.vue';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueCookies);
Vue.use(VueSpinners)

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
      {
        path: '/logout',
        component: Logout,
      },
      {
        path: '/team/:team_id',
        component: Team,
      },
];

const router = new VueRouter({
  routes,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
