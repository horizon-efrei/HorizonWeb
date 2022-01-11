import { createStore } from 'vuex'
import { auth } from './auth.module'
import { posts } from './posts.module'
import { users } from './users.module'
import { files } from './files.module'
import { userConfig } from './userConfig.module'
import { dashboard } from './dashboard.modules'

const store = createStore({
    state: {
    },
    modules: {
        auth,
        posts,
        users,
        files,
        dashboard,
        userConfig
    }
})

export default store
