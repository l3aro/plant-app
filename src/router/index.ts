import { useAuth } from '@/modules/Auth';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const GUARD_AUTH = 'auth';
const GUARD_GUEST = 'guest';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { guard: GUARD_AUTH }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/Login.vue'),
        meta: { guard: GUARD_GUEST }
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated.value === false && to.meta.guard === GUARD_AUTH) {
        next({ name: 'login' });
        return;
    }
    if (isAuthenticated.value === true && to.meta.guard === GUARD_GUEST) {
        next({ name: 'home' });
        return;
    }
    next();
});

export default router;
