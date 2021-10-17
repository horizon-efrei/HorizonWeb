import { createApp } from 'vue'

import App from './App.vue'
import store from './store'

import router from '@/router/index'
import './assets/css/tailwind.css'

import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

import 'remixicon/fonts/remixicon.css'

createApp(App)
  .use(store)
  .use(router)
  .use(VueTippy)
  .mount('#app')
