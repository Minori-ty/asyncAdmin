<template>
    <div class="wrap">
        <el-card>
            <el-select v-model="userInfo.username" placeholder="选择登陆">
                <el-option value="user" label="用户"></el-option>
                <el-option value="admin" label="管理员"></el-option>
            </el-select>
            <el-input value="123456"></el-input>
            <div style="display: flex; justify-content: center">
                <el-button type="primary" @click="Login">登录</el-button>
            </div>
        </el-card>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import usePinia from '../../pinia'

let { login } = usePinia()
const userInfo = ref({
    username: 'user',
    password: '123456',
})

const router = useRouter()
const Login = async () => {
    //一定要等到完全登录了再跳转
    await login({ username: userInfo.value.username, password: userInfo.value.password })
    console.log(router.getRoutes())

    router.push('/about/index')
}
</script>
<style scoped lang="scss">
.wrap {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    .el-card {
        width: 300px;
        height: 150px;
        .el-select {
            width: 100%;
        }
    }
}
</style>
