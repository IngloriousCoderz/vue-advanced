import { createApp } from 'vue'
import { createPinia } from 'pinia'

// import App from './01-options-api/App.vue'
// import App from './02-composition-api/App.vue'
// import App from './03-state-locality/App.vue'
// import App from './04-composables/App.vue'
// import App from './05-state-manager/App.vue'
import App from './06-client-server/App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
