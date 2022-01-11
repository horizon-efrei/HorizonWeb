import UsersService from '../services/users.service'
import { uniqBy } from '@/utils/uniqBy'

const initialState = { users: [], page: 0 }

export const users = {
    namespaced: true,
    getters: {
        getUsers(state) {
            return state.users
        }
    },
    state: initialState,
    actions: {
        fetchUsers({ commit, state }, query) {
            state.page++
            return UsersService.getUsers({ page: state.page, ...query }).then(
                users => {
                    commit('fetchSuccess', users)
                    return Promise.resolve(users)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },
        refreshUsers({ commit }) {
            commit('refreshUsers')
        },
        newFetchUsers({ dispatch }, query) {
            dispatch('refreshUsers')
            return dispatch('fetchUsers', query)
        },
    },
    mutations: {
        fetchSuccess(state, users) {
            state.users = uniqBy([...state.users, ...users], (a, b) => a.userId === b.userId)
        },
        refreshUsers(state) {
            state.users = []
            state.page = 0
        }
    }
}
