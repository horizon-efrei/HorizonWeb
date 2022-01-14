import UserService from '@/services/users.service';

const initialState = { users: null, socialsAccounts: [], socials:[], userClubs:[], favorites: [] }

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
        },
        updateUser({commit}, newUser) {
            newUser = {description: newUser.description}
            return UserService.updateUser(newUser).then(
                success => {
                    commit('modifyUserSuccess', success)
                    return Promise.resolve(success)
                },
                error => {
                    console.log(error)
                    return Promise.reject(error)
                }
            )
        },
        addSocialAccount({commit},request){
            return UserService.addSocialAccount(request).then(
                success => {
                    commit('addSocialAccountSuccess',success)
                    return Promise.resolve(success)
                },
                error => {
                    console.log(error)
                    return Promise.reject(error)
                }
            )
        },
        patchSocialAccount({commit},request){
            return UserService.patchSocialAccount(request).then(
                success => {
                    commit('patchSocialAccountSuccess',success)
                    return Promise.resolve(success)
                },
                error => {
                    console.log(error)
                    return Promise.reject(error)
                }
            )
        },
        removeSocialAccount({commit},socialAccountId){
            return UserService.removeSocialAccount(socialAccountId).then(
                success => {
                    commit('removeSocialAccountSuccess',socialAccountId)
                    return Promise.resolve(success)
                },
                error => {
                    console.log(error)
                    return Promise.reject(error)
                }
            )
        },
        replaceSocialAccount({commit}, request){
            UserService.removeSocialAccount(request[1].socialAccountId).then(
                () => {
                    return UserService.addSocialAccount([request[0],request[1].social.socialId,request[1].pseudo,request[1].link]).then(
                        success =>{
                            console.log("success remove",success)
                            commit("replaceSocialAccountSuccess",{socialAccount:success,socialAccountId:request[1].socialAccountId})
                            return Promise.resolve(success)
                        },
                        error =>{
                            console.log(error)
                            return Promise.reject(error)
                        }
                    )
                },
                error => {
                    console.log(error)
                    return Promise.reject(error)
                }
            )
        },
        getFavorites({commit}){
            return UserService.getFavorites().then(
                success => {
                    commit("fetchUserFavorites",success)
                    return Promise.resolve(success)
                },
                error => {
                    console.log(error)
                    return Promise.reject(error)
                }
            )
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
        },
        modifyUserSuccess(state,user){
            state.user = user
        },
        addSocialAccountSuccess(state, socialAccount){
            state.socialsAccounts.push(socialAccount)
        },
        patchSocialAccountSuccess(state,socialAccount){
            state.socialsAccounts = state.socialsAccounts.map((a)=> {
                if(a.socialAccountId != socialAccount.socialAccountId){
                    return a
                }return socialAccount})
        },
        removeSocialAccountSuccess(state,socialAccountId){
            state.socialsAccounts = state.socialsAccounts.filter((a)=> a.socialAccountId!=socialAccountId)
        },
        replaceSocialAccountSuccess(state,{socialAccount,socialAccountId}){
            state.socialsAccounts = state.socialsAccounts.map((social)=> {
                if(social.socialAccountId != socialAccountId){
                    return social
                }
                return socialAccount
            })
        },
        fetchUserFavorites(state,favorites){
            state.favorites = favorites
        }
    }
}
