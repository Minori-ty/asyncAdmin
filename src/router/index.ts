import { createRouter, createWebHashHistory } from 'vue-router'
export const routes = [
    {
        path: '/',
        redirect: () => {
            return '/login'
        },
    },
    {
        path: '/login',
        component: () => import('../pages/Login/index.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('../pages/404/index.vue'),
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router
