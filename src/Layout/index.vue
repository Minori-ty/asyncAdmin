<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <el-menu :default-active="currentIndex" class="el-menu-vertical-demo" router>
                    <el-menu-item :index="item.path" v-for="item in list" :key="item.path">
                        <span>{{ item.name }}</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <el-button type="danger" @click="Logout">退出登录</el-button>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import usePinia from '../pinia'
import { useRouter, RouteRecordRaw } from 'vue-router'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

const { userInfo, menu, currentIndex } = storeToRefs(usePinia())
const { logout, changeCurrentIndex } = usePinia()
const router = useRouter()
console.log(userInfo.value)
let list = ref<RouteRecordRaw[]>([])
onMounted(() => {
    list.value = menu.value
})

const changeActiveIndex = (path: string) => {
    // changeCurrentIndex(path)
    currentIndex.value = path
}

const Logout = () => {
    logout()
    router.push('/login')
}
</script>
