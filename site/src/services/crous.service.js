import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

class CrousService {
    getOneMenu(menuId) {
        return axios.get(`${API_URL}/crous/menu/${menuId}`, { withCredentials: true }).then((res) => res.data)
    }
}

export default new CrousService()
