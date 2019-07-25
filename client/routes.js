/* /client/routes.js */

// Components
import Home from '/imports/vue/pages/home.vue';
import Leaderboard from '/imports/vue/pages/leaderboard.vue';

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: Leaderboard,
  },
];
