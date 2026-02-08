import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './default-app/App.vue'
import router from './default-app/router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
