import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import './router/permission'
import piniaPersist from 'pinia-plugin-persist'
import './assets/css/basic.css'

const pinia = createPinia()
pinia.use(piniaPersist)

createApp(App).use(router).use(ElementPlus).use(pinia).mount('#app')
