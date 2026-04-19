import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/modules/auth/store/authStore'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast)

app.mount('#app')
// createApp(App).mount('#app')
createApp(App).use(router).mount('#app')

const pinia = createPinia()
app.use(pinia)

const auth = useAuthStore()
auth.loadFromStorage()
