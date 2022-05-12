import { RouteRecordRaw } from 'vue-router'

export function asyncRouter(role: string): RouteRecordRaw[] {
    //根据角色返回不同的动态路由
    if (role === 'admin') {
        return [
            {
                path: '/about',
                name: 'about',
                component: () => import('../Layout/index.vue'),
                children: [
                    {
                        path: 'index',
                        name: 'about',
                        component: () => import('../pages/About/index.vue'),
                    },
                ],
                // children: [],
            },
            {
                path: '/analyze',
                name: 'analyze',
                component: () => import('../Layout/index.vue'),
                children: [
                    {
                        path: 'index',
                        name: 'analyze',
                        component: () => import('../pages/Analyze/index.vue'),
                    },
                ],
            },
            {
                path: '/permission',
                name: 'permission',
                component: () => import('../Layout/index.vue'),
                children: [
                    {
                        path: 'index',
                        name: 'permission',
                        component: () => import('../pages/Permission/index.vue'),
                    },
                ],
            },
        ]
    } else if (role === 'user') {
        return [
            {
                path: '/about',
                name: 'about',
                component: () => import('../Layout/index.vue'),
                children: [
                    {
                        path: 'index',
                        name: 'about',
                        component: () => import('../pages/About/index.vue'),
                    },
                ],
            },
            {
                path: '/analyze',
                name: 'analyze',
                component: () => import('../Layout/index.vue'),
                children: [
                    {
                        path: 'index',
                        name: 'analyze',
                        component: () => import('../pages/Analyze/index.vue'),
                    },
                ],
            },
        ]
    } else {
        return []
    }
}
