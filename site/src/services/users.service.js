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
            .then(res => res.data.items)
    }

    getSocials () {
        return axios.get(API_URL +`socials`, {withCredentials: true})
            .then(res => res.data.items)
    }

    getClubs () {
        return axios.get(API_URL +`clubs`, {withCredentials: true})
            .then(res => res.data.items)
    }

    getUserClubs (userId) {
        return axios.get(API_URL +`clubs/member/${userId}`, {withCredentials: true})
            .then(res => res.data)
    }

    updateUser ( newUser ) {
        return axios.patch(API_URL + `users/update`,newUser, {withCredentials:true}).then(res=>res.data)
    }

    addSocialAccount(request){
        return axios.post(API_URL + `socials/user/${request[0]}/${request[1]}`,{pseudo:request[2],link:request[3]}, {withCredentials:true}).then(res => res.data)
    }

    patchSocialAccount(request){
        return axios.patch(API_URL + `socials/account/${request[0]}`,{pseudo:request[1],link:request[2]}, {withCredentials:true}).then(res => res.data)
    }

    removeSocialAccount(socialAccountId){
        return axios.delete(API_URL + `socials/account/${socialAccountId}`, {withCredentials:true})
    }

    getFavorites(){
        return axios.get(API_URL + `favorites`, {withCredentials: true}).then(res => res.data.items)
    }

}

export default new UserService()
