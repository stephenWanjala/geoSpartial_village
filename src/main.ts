import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css';


export const API_KEY =import.meta.env.VITE_GOOGLE_API_KEY
export const BEARER_TOKEN =import.meta.env.VITE_BEARER_TOKEN


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
