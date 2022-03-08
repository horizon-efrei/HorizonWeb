import { defineStore } from 'pinia'
import $axios from '../shared/config/axios.config'



export const useProfileStore = defineStore('profile', {
    state: () => ({
        user: null,
        socialsAccounts: [],
        socials: [],
        clubs: [],
        userClubs: [],
    }),
    actions: {
        changeUser(user) {
            this.user = user;
        },
        async loadUser(userId) {
            return await $axios
                .get(`users/${userId}`)
                .then(this.changeUser())
        },
        async loadSocialsAccounts(userId) {
            return await $axios
                .get(`users/${userId}`)
                .then()
        },

    },
})
