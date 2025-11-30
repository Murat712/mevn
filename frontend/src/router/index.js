import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import BooksView from '@/views/BooksView.vue';
import DashboardView from '@/views/DashboardView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import BookDetailView from '@/views/BookDetailView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/books',
      name: 'books',
      component: BooksView,
    },
    {
      path: '/books/:id',
      name: 'book-detail',
      component: BookDetailView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiredAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
  ],
  linkActiveClass: 'active-link',
});

router.beforeEach((to, from, next) => {
  const requiredAuth = to.matched.some(url => url.meta.requiredAuth);
  const isLoggedIn = localStorage.getItem('user');

  if (requiredAuth && !isLoggedIn) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
