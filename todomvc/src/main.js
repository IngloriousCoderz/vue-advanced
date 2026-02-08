import { createApp } from 'vue'
import { createPinia } from 'pinia'

// import App from './01-multi-component/App.vue'
import App from './02-state-locality/App.vue'
// import App from './03-state-manager/App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
