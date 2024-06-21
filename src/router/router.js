import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import Auth from '@/services/auth';

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

// eslint-disable-next-line no-unused-vars
router.beforeEach(async (to, from) => {
  const isAuthenticated = await Auth.isAuthenticated();

  if (!isAuthenticated && to.name !== 'Auth') {
    return { name: 'Auth' };
  }
});
