import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'
import { asyncRouter } from '../router/asyncRouter'
import { RouteRecordRaw } from 'vue-router'

export default defineStore({
    id: 'main',
    state: () => ({
        userInfo: {
            username: '',
            password: '',
            token: '',
            role: '',
        },
        currentIndex: '/about',
        menu: [] as RouteRecordRaw[],
    }),
    actions: {
        async login({ username, password }: { username: string; password: string }) {
            //登录前先退出，把上一次登录的用户信息和路由注销掉
            this.logout()

            const { data } = await axios.post('/api/login', {
                username,
                password,
            })

            this.userInfo.role = data.role
            this.userInfo.username = data.username
            this.userInfo.token = data.token
        },
        logout() {
            //退出时只删除动态添加的路由
            asyncRouter(this.userInfo.role).forEach((i) => {
                router.removeRoute(i.name as string)
            })
            this.currentIndex = '/about'
            // this.menu = []
            this.userInfo = {
                username: '',
                password: '',
                token: '',
                role: '',
            }
            this.menu = []
        },
        SETMENUS(data: RouteRecordRaw[]) {
            if (this.menu.length === 0) {
                console.log('添加了')
                this.menu = data
            }
        },
        changeCurrentIndex(path: string) {
            this.currentIndex = path
        },
    },
    persist: {
        enabled: true, // 开启缓存  默认会存储在本地localstorage
        // strategies: [{ storage: sessionStorage, paths: ['userInfo'] }],
    },
})
