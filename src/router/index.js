import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import OrganizerDashboard from '../views/OrganizerDashboard.vue';
import TrainerDashboard from '../views/TrainerDashboard.vue';
import JudgeDashboard from '../views/JudgeDashboard.vue';
import HostDashboard from '../views/HostDashboard.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/organizer',
    name: 'OrganizerDashboard',
    component: OrganizerDashboard,
  },
  {
    path: '/trainer',
    name: 'TrainerDashboard',
    component: TrainerDashboard,
  },
  {
    path: '/judge',
    name: 'JudgeDashboard',
    component: JudgeDashboard,
  },
  {
    path: '/host',
    name: 'HostDashboard',
    component: HostDashboard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
