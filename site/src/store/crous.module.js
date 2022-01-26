import crousService from '@/services/crous.service'

const initialState = {
    menu: null,
    food: [],
}

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
        getToday({ commit }) {
            return crousService.getToday().then(
                success => {
                    commit('fetchDate',success)
                    Promise.resolve(success)
                },
                error => {
                    console.log(error)
                    Promise.reject(error)
                },
            )
        },
        getDate({ commit },date) {
            return crousService.getDate(date).then(
                success => {
                    commit('fetchDate',success)
                    Promise.resolve(success)
                },
                error => {
                    console.log(error)
                    Promise.reject(error)
                },
            )
        },
        getFood({ commit }) {
            return crousService.getFood().then(
                success => {
                    commit('fetchFood',success)
                    Promise.resolve(success)
                },
                error => {
                    console.log(error)
                    Promise.reject(error)
                },
            )
        },
        postMenu({ commit },{
            starters,dishes,desserts,date,
        }) {
            return crousService.postMenu({
                starters,
                dishes,
                desserts,
                date,
            }).then(
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
        postFood({ commit },{
            name,type,
        }) {
            return crousService.postFood({
                name,
                type,
            }).then(
                success => {
                    commit('updateFood',success)
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
        fetchDate(state, success) {
            state.menu = success.menu
            state.info = success.infos
        },
        fetchFood(state, success) {
            state.food = success
        },
        updateFood(state,success) {
            state.food = [...state.food,success]
        },
    },
}
