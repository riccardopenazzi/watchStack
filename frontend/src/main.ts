import '@/utils/utils'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { registerPlugins } from '@/plugins'

import WatchStack from './WatchStack.vue'

import router from '@/router'

import 'unfonts.css'

const app = createApp(WatchStack)

registerPlugins(app)

app.use(router)
app.use(createPinia())

app.mount('#app')
