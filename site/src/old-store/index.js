import { createStore } from 'vuex'

import { files } from './files.module'
import { profiles } from './profiles.module'
import { user } from './user.module'
import { crous } from './crous.module'

const store = createStore({
    state: {},
    modules: {
        files,
        profiles,
        user,
        crous,
    },
})

export default store
