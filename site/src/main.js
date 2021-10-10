import { createApp } from 'vue'

import App from './App.vue'
import router from '@/router/index'
import './assets/css/tailwind.css'
import { quillEditor } from 'vue3-quill'
// import customQuillModule from 'customQuillModule'

// Quill.register('modules/customQuillModule', customQuillModule)

createApp(App)
  .use(router)
  .use(quillEditor)
  .mount('#app')
