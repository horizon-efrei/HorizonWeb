import UserService from '@/services/users.service';

const initialState = { users: null, socialsAccounts: [], socials:[], userClubs:[] }

export const users = {
    namespaced: true,
    state: initialState,
    actions: {
        getUserById({commit}, userId) {
            return UserService.getUserById(userId).then(
                success => {
                    commit('fetchUserSuccess', success)
                    return Promise.resolve(success)
                },
                error => {
                    console.log(error)
                    return Promise.reject(error)
                }
            )
        },
        getUserSocials({commit}, userId) {
            return UserService.getUserSocials(userId).then(
                success => {
                    commit('fetchSocialsAccountsSuccess', success)
                    return Promise.resolve(success)
                },
                error => {
                    console.log(error)
                    return Promise.reject(error)
                }
            )
        },
        getSocials({commit}) {
            return UserService.getSocials().then(
                success => {
                    commit('fetchSocialsSuccess',success)
                    return Promise.resolve(success)
                },
                error => {
                    console.log(error)
                    return Promise.reject(error)
                }
            )
        },
        getClubs({commit}) {
            return UserService.getClubs().then(
                success => {
                    commit('fetchClubsSuccess',success)
                    return Promise.resolve(success)
                },
                error => {
                    console.log(error)
                    return Promise.reject(error)
                }
            )
        },
        getUserClubs({commit}, userId) {
            return UserService.getUserClubs(userId).then(
                success => {
                    commit('fetchUserClubsSuccess',success)
                    return Promise.resolve(success)
                },
                error => {
                    console.log(error)
                    return Promise.reject(error)
                })
        }
    },
    mutations: {
        fetchUserSuccess(state,user){
            state.user = user
        },
        fetchSocialsAccountsSuccess(state,socialsAccounts){
            state.socialsAccounts = socialsAccounts
        },
        fetchSocialsSuccess(state,socials){
            state.socials = socials
        },
        fetchClubsSuccess(state,clubs){
            state.clubs = clubs
        },
        fetchUserClubsSuccess(state,userClubs){
            state.userClubs = userClubs
        }
    }
}
