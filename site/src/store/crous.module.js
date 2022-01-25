import crousService from '@/services/crous.service'

const initialState = { menu: null }

export const crous = {
    namespaced: true,
    state: initialState,
    actions: {
        getMenuById({ commit },menuId) {
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
        getInfoById({ commit },infoId) {
            return crousService.getOneInfo(infoId).then(
                success => {
                    commit('fetchInfo',success)
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
        fetchInfo(state,success) {
            state.info = success
        },
    },
}
