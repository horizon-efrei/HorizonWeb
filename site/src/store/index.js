import { createStore } from 'vuex'
import { auth } from './auth.module'
import { crous } from './crous.module'
import { files } from './files.module'
import { posts } from './posts.module'
import { thread } from './thread.module'
import { userConfig } from './userConfig.module'
import { users } from './users.module'

const store = createStore({
    state: {},
    modules: {
        auth,
        posts,
        files,
        userConfig,
        users,
        thread,
        crous,
    },
})

export default store
