import { useAuth } from '@/modules/Auth'
import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/auth/Login.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const { isAuthenticated, user } = useAuth();
    if (
        isAuthenticated.value === false &&
        to.meta.requiresAuth === true
    ) {
        next({ name: 'Login' })
    } else {
        next()
    }
})

export default router
