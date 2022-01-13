import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}/`

class UserService {
    getPublicContent () {
        return axios.get(API_URL + 'posts', { withCredentials: true })
    }

    getUserById (userId) {
        return axios.get(API_URL +`users/${userId}`, {withCredentials: true})
            .then(res => res.data)
    }

    getUserSocials (userId) {
        return axios.get(API_URL +`socials/user/${userId}`, {withCredentials: true})
            .then(res => res.data)
    }

    getSocials () {
        return axios.get(API_URL +`socials`, {withCredentials: true})
            .then(res => res.data)
    }

    getClubs () {
        return axios.get(API_URL +`clubs`, {withCredentials: true})
            .then(res => res.data)
    }

    getUserClubs (userId) {
        return axios.get(API_URL +`clubs/member/${userId}`, {withCredentials: true})
            .then(res => res.data)
    }

}

export default new UserService()
