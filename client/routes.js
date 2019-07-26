// Components
import Home from './pages/home.vue';
import Leaderboard from './pages/leaderboard.vue';

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
