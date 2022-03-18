import { defineStore } from 'pinia'
import $axios from '../shared/config/axios.config'

export const useProfilesStore = defineStore('profile', {
    state: () => ({
        user: null,
        contacts: [],
        clubs: [],
    }),
    actions: {
        changeUser(user) {
            this.user = user
            return user
        },
        changeContacts(contacts) {
            this.contacts = contacts
            return contacts
        },
        changeClubs(clubs) {
            this.clubs = clubs
            return clubs
        },
        async loadUser(userId) {
            return await $axios.get(`users/${userId}`).then((res) => this.changeUser(res.data))
        },
        async loadContacts(userId) {
            return await $axios.get(`contacts/users/${userId}`).then((res) => this.changeContacts(res.data))
        },
        async loadClubs(userId) {
            return await $axios.get(`clubs/memberships/${userId}`).then((res) => this.changeClubs(res.data))
        },
    },
})
