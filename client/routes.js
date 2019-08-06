// Components
import Home from './pages/home.vue';
import Leaderboard from './pages/leaderboard.vue';
import Toys from './pages/toys.vue';

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
  {
    path: '/toys',
    name: 'toys',
    component: Toys,
    meta: { layout: 'bare' },
  },
];
