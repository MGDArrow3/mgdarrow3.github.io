export const routes = [
  {
    name: 'LAuth',
    path: '/auth',
    component: () => import('@/layouts/LAuth.vue'),
    children: [
      {
        name: 'Auth',
        path: '',
        component: () => import('@/views/TheAuth.vue'),
      },
    ],
  },
  {
    name: 'LBasic',
    path: '/',
    component: () => import('@/layouts/LBasic.vue'),
    children: [
      {
        name: 'Menu',
        path: '',
        component: () => import('@/views/TheMenu.vue'),
      },

      {
        name: 'Storage',
        path: 'storage',
        component: () => import('@/views/TheStorage.vue'),
      },
      {
        name: 'Accept',
        path: 'accept',
        component: () => import('@/views/TheAccept.vue'),
      },
      {
        name: 'Donate',
        path: 'donate',
        component: () => import('@/views/TheDonate.vue'),
      },
      {
        name: 'History',
        path: 'history',
        component: () => import('@/views/TheHistory.vue'),
      },
      {
        name: 'Donors',
        path: 'donors',
        component: () => import('@/views/TheDonors.vue'),
      },
      {
        name: 'Givers',
        path: 'givers',
        component: () => import('@/views/TheGivers.vue'),
      },
      {
        name: 'Categories',
        path: 'categories',
        component: () => import('@/views/TheCategories.vue'),
      },
      {
        name: 'Items',
        path: 'items',
        component: () => import('@/views/TheItems.vue'),
      },
      {
        name: 'Settings',
        path: 'settings',
        component: () => import('@/views/TheSettings.vue'),
      },
    ],
  },
];
