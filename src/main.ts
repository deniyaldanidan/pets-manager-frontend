import './assets/main.css'
import myAxios from './api/myAxios'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { unAuthState, useAuthStore } from './stores/auth'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const authStore = useAuthStore()

myAxios
  .post('/auth/refresh')
  .then((res) => {
    const accToken = res.data?.accessToken
    if (typeof res.data?.accessToken === 'string') {
      authStore.setAuth(accToken)
      return
    }
    console.log('Please log in')
  })
  .catch(() => {
    console.log('Please log in...')
    authStore.authValues = { ...unAuthState }
    // authStore.resetAuth()
    return
  })

app.mount('#app')
