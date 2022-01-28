import { createStore } from 'vuex'

import { auth } from './auth.module'
import { files } from './files.module'
import { profiles } from './profiles.module'
import { reports } from './reports.modules'
import { threads } from './threads.module'
import { user } from './user.module'
import { crous } from './crous.module'

const store = createStore({
    state: {},
    modules: {
        auth,
        files,
        profiles,
        reports,
        threads,
        user,
        crous,
    },
})

export default store
