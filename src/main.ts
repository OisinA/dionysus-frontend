import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies'
import VueSpinners from 'vue-spinners'
import Home from './components/Home.vue';
import Login from './components/auth/Login.vue';
import Profile from './components/Profile.vue';
import Logout from './components/auth/Logout.vue';
import Team from './components/Team.vue';
import Problems from './components/problems/Problems.vue';
import Problem from './components/problems/Problem.vue';
import Submissions from './components/problems/Submissions.vue';
import Leaderboard from './components/Leaderboard.vue';

import AdminApp from './components/admin/AdminApp.vue';
import AdminHome from './components/admin/AdminHome.vue';
import UserApp from './components/admin/users/UserApp.vue';
import UserAdd from './components/admin/users/UserAdd.vue';
import UserList from './components/admin/users/UserList.vue';
import UserGet from './components/admin/users/UserGet.vue';
import ProblemApp from './components/admin/problems/ProblemApp.vue';
import ProblemAdd from './components/admin/problems/ProblemAdd.vue';
import ProblemList from './components/admin/problems/ProblemList.vue';
import Settings from './components/admin/Settings.vue';
import SubmissionList from './components/admin/problems/SubmissionList.vue';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueCookies);
Vue.use(VueSpinners);

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
        path: '/submission',
        component: Submissions,
      },
      {
        path: '/team/:team_id',
        component: Team,
      },
      {
        path: '/problem',
        component: Problems,
      },
      {
        path: '/problem/:problem_id',
        component: Problem,
      },
      {
        path: '/leaderboard',
        component: Leaderboard,
      },

      {
        path: '/admin',
        component: AdminApp,
        children: [
          {
            path: '',
            component: AdminHome,
          },
          {
            path: '/admin/settings',
            component: Settings,
          },
          {
            path: '/admin/user',
            component: UserApp,
            children: [
              {
                path: '/admin/user/add',
                component: UserAdd,
              },
              {
                path: '/admin/user/list',
                component: UserList,
              },
              {
                path: '/admin/user/:user_id',
                component: UserGet,
              },
            ]
          },
          {
            path: '/admin/problem',
            component: ProblemApp,
            children: [
              {
                path: '/admin/problem/add',
                component: ProblemAdd,
              },
              {
                path: '/admin/problem/list',
                component: ProblemList,
              },
            ]
          },
          {
            path: '/admin/submissions',
            component: SubmissionList,
          }
        ]
      }
];

const router = new VueRouter({
  routes,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
