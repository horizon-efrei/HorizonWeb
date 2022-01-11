import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}/`

class UsersService {
    getUsers(query) {
        return axios.get(API_URL + 'users', { params: query, withCredentials: true }).then(
            res => res.data.items
        )
    }
}

export default new UsersService()
