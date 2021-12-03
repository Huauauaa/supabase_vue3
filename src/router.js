import { createRouter, createWebHistory } from 'vue-router';

import Layout from './Layout.vue';
import SignIn from './views/sign-in.view.vue';
import SignUp from './views/sign-up.view.vue';
import Home from './views/home.view.vue';
import Setting from './views/setting.view.vue';
import Welcome from './views/welcome.view.vue';

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: 'welcome',
    children: [
      {
        path: '',
        name: 'welcome',
        component: Welcome,
        meta: {
          public: true,
        },
      },
      {
        path: 'home',
        name: 'home',
        component: Home,
      },
      {
        path: 'setting',
        name: 'setting',
        component: Setting,
      },
    ],
  },
  {
    path: '/auth',
    component: Layout,
    children: [
      {
        path: 'sign-in',
        name: 'signIn',
        component: SignIn,
      },
      {
        path: 'sign-up',
        name: 'signUp',
        component: SignUp,
        meta: {
          public: true,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  console.log(to);
  if (to?.meta?.public) {
    next();
  } else if (!localStorage.getItem('auth') && to.name !== 'signIn') {
    console.log(11);
    next({ name: 'signIn' });
  } else {
    console.log(22);
    next();
  }
});
export default router;
