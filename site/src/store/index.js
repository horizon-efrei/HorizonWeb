import { createStore } from 'vuex'
import { auth } from './auth.module'
import { posts } from './posts.module'
import { userConfig } from './userConfig.module'

const store = createStore({
  state: {
  },
  modules: {
    auth,
    posts,
    userConfig
  }
})

export default store
