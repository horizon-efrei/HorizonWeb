const initialState = {
    posts: [{
        votes: { attrs: () => {},
            slot: (post) => post.upvotes - post.downvotes,
            value: (post) => post.upvotes - post.downvotes,
            comp: ['div'],
            name: 'Votes' },
        status: { attrs: () => {},
            slot: (post) => post.state,
            value: (post) => post.state,
            comp: ['div'],
            name: 'État' },
        title: { attrs: () => {},
            slot: (post) => post.title,
            value: (post) => post.title,
            comp: ['div'],
            name: 'Titre' },
        user: { attrs: (post) => { return {username: post.author.username, avatar: post.author.avatar, reputation: post.author.reputation }},
            slot: () => {},
            value: (post) => post.author.username,
            comp: ['user-preview', '@/components/Dashboard/UserPreview.vue'],
            name: 'OP' },
        lastActivity: { attrs: (post) => { return {dateString: post.contentLastUpdatedAt} },
            slot: (post) => post.contentLastUpdatedAt,
            value: () => "",
            comp: ['date-preview', '@/components/Dashboard/DatePreview.vue'],
            name: 'Dernière activité' },
        createdAt: { attrs: (post) => { return {dateString: post.createdAt} },
            slot: (post) => post.createdAt,
            value: () => "",
            comp: ['date-preview', '@/components/Dashboard/DatePreview.vue'],
            sort: 0,
            name: 'Date de création' },
        type: { attrs: () => {},
            slot: (post) => post.type,
            value: () => "",
            comp: ['div'],
            name: 'Type' },
        tags: { attrs: (post) => {return {tags: post.tags}},
            slot: () => {},
            value: (post) => post.tags,
            comp: ['tags-list', '@/components/List/TagsList.vue'],
            name: 'Tags' },
        actions: { attrs: () => {},
            slot: () => {},
            value: () => "",
            comp: ['ModalButton', '@/components/Dashboard/ModalButton.vue'],
            name: 'Actions' }
    }],
    page: 0
}

export const posts = {
    namespaced: true,
    getters: {
    },
    state: initialState,
    actions: {
    },
    mutations: {
    }
}
