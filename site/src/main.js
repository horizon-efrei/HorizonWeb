import { createApp } from 'vue'

import App from './App.vue'
import router from '@/router/index'
import './assets/css/tailwind.css'

import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

import 'remixicon/fonts/remixicon.css'

createApp(App)
  .use(router)
  .use(VueTippy)
  .mount('#app')
