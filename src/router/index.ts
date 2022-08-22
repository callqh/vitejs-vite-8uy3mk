import type { Router } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: 'home',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home.vue'),
    },
    {
      path: '/child',
      name: 'child',
      component: () => import('../views/child.vue'),
    },
  ],
});

export default router;
