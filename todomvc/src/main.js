import { createApp } from 'vue'
import { createPinia } from 'pinia'

// import App from './01-options-api/App.vue'
// import App from './02-composition-api/App.vue'
import App from './03-state-locality/App.vue'
// import App from './04-state-manager/App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
