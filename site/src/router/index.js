import { createRouter, createWebHashHistory } from 'vue-router'
import AdminSide from '@/pages/AdminSide.vue'
import Content from '@/pages/Content.vue'
import PostView from '@/pages/Post/PostView.vue'
import PostNew from '@/pages/Post/PostNew.vue'
import FileUpload from '@/pages/FileUpload.vue'
import PostList from '@/pages/Post/PostList.vue'
import Filler from '@/pages/Filler.vue'
import Settings from '@/pages/Settings.vue'

const routes = [
  {
    path: '/',
    component: Content
  },
  {
    path: '/post',
    component: PostView
  },
  {
    path: '/new_post',
    component: PostNew
  },

  {
    path: '/dashboard',
    component: AdminSide
  },

  {
    path: '/file_upload',
    component: FileUpload
  },

  {
    path: '/posts',
    component: PostList
  },

  {
    path: '/filler',
    component: Filler
  },

  {
    path: '/my_account',
    component: Settings
  },

  {
    path: '/secret',
    component: Content,
    beforeEnter: (to, from, next) => {
      // ...
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
