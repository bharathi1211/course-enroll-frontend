import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
//import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

// pinia.use(piniaPluginPersistedstate) 

app.use(pinia)
app.use(router)
app.mount('#app')
