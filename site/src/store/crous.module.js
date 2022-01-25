import crousService from '@/services/crous.service'

const initialState = { menu: null }

export const crous = {
    namespaced: true,
    state: initialState,
    actions: {
        getMenuById({ commit },menuId) {
            console.log(menuId)
            return crousService.getOneMenu(menuId).then(
                success => {
                    commit('fetchMenu',success)
                    Promise.resolve(success)
                },
                error => {
                    console.log(error)
                    Promise.reject(error)
                },
            )
        },
    },
    mutations: {
        fetchMenu(state,success) {
            state.menu = success
        },
    },
}
