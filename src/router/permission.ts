import { asyncRouter } from './asyncRouter'
import router, { routes } from './index'
import usePinia from '../pinia'
import { RouteRecordRaw } from 'vue-router'

router.beforeEach(async (to, from, next) => {
    const { userInfo, SETMENUS, changeCurrentIndex } = usePinia()
    let list = asyncRouter(userInfo.username)
    if (userInfo.token) {
        //如果token存在，则说明登录了，进入相应权限页面
        //每次进入前都要添加路由，防止页面刷新重置路由
        await addRouter(list)
        console.log(router.getRoutes())

        //去除掉父路由
        const allRoutes = router.getRoutes().filter((i) => i.children.length <= 0)
        //去除掉基础路由，否则回出错
        const asyncRoute = allRoutes.filter((i) => !['/', '/login', '/:pathMatch(.*)*'].includes(i.path))
        console.log(asyncRoute)

        SETMENUS(asyncRoute)
        console.log(to.name)

        changeCurrentIndex(to.fullPath)
        if (!to.name) {
            //如果to.name不存在，说明是动态路由，让其判断在不在该角色的动态路由表中
            if (asyncRoute.findIndex((i) => i.path === to.fullPath) !== -1) {
                // console.log(to.fullPath)

                changeCurrentIndex(to.fullPath)
                //如果在，则跳转
                next({ ...to, replace: true })
            } else {
                //如果不在，则说明不在路由表中，直接放行，让路由匹配去拦截
                next()
            }
        } else {
            //如果to.name存在，说明是进入基础路由，则直接跳转
            next()
        }
    } else {
        //如果没有登录，则直接放行，让路由匹配去拦截
        next()
    }
})

const addRouter = (routerList: RouteRecordRaw[]) => {
    //当路由小于等于基础路由时，才去添加动态路由，否则就是添加过了，不再重复添加
    if (router.getRoutes().length <= 3) {
        routerList.forEach((i) => {
            router.addRoute(i)
        })
    }
}
