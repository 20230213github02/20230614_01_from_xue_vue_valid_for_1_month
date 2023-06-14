import { createRouter, createWebHashHistory } from 'vue-router';
import welcome from '@/components/views/welcome.vue';
import login from '@/components/views/login.vue';
import kanli from '@/components/views/kanli.vue';
import zaikai from '@/components/views/zaikai.vue';
import xingui from '@/components/views/xingui.vue';
import biebiao from '@/components/views/biebiao.vue';
import queren from '@/components/views/queren.vue';


const routes = [
  {
    path: '/',
    redirect:'login'
  },
  {
    path: '/login',
    name: 'login',
    
    component: login
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: welcome
  },
  {
    path: '/kanli',
    name: 'kanli',
    component: kanli
  },
  {
    path: '/zaikai',
    name: 'zaikai',
    component: zaikai
  },
  {
    path: '/xingui',
    name: 'xingui',
    component: xingui
  },
  {
    path: '/queren',
    name: 'queren',
    component: queren
  },
  {
    path: '/biebiao',
    name: 'biebiao',
    component: biebiao
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
