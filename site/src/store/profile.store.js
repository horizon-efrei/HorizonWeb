import { defineStore } from 'pinia'
import $axios from '../shared/config/axios.config'

export const useProfilesStore = defineStore('profile', {
    state: () => ({
        user: null,
        contacts: [],
        clubs: [],
    }),
    actions: {
        replaceUser(user) {
            this.user = user
            return user
        },
        replaceContacts(contacts) {
            this.contacts = contacts
            return contacts
        },
        replaceClubs(clubs) {
            this.clubs = clubs
            return clubs
        },
        async getUser(userId) {
            return await $axios.get(`users/${userId}`).then((res) => this.replaceUser(res.data))
        },
        async getContacts(userId) {
            return await $axios.get(`contacts/users/${userId}`).then((res) => this.replaceContacts(res.data))
        },
        async getClubs(userId) {
            return await $axios.get(`clubs/memberships/${userId}`).then((res) => this.replaceClubs(res.data))
        },
        async getContactsTypes() {
            return await $axios.get('/contacts').then((res) => res.data)
        },
        async patchUser(props) {
            return await $axios.patch('users', props).then((res) => this.replaceUser(res.data))
        },
    },
})
