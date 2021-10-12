import { createRouter, createWebHistory } from 'vue-router'
import Content from '@/components/Content.vue'
import PostView from '@/pages/Post/PostView.vue'
import PostNew from '@/pages/Post/PostNew.vue'
import FileUpload from '@/pages/FileUpload.vue'
import PostList from '@/pages/Post/PostList.vue'

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
    path: '/file_upload',
    component: FileUpload
  },

  {
    path: '/posts',
    component: PostList
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
  history: createWebHistory(),
  routes
})

export default router
