<template>
    <h1>404,请返回登录页面<el-button @click="toLogin">返回登录页面</el-button></h1>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const toLogin = () => {
    router.push('/login')
}
</script>
<style scoped></style>
