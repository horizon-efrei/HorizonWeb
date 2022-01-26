import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

class CrousService {
    getOneMenu(menuId) {
        return axios.get(`${API_URL}/crous/menu/${menuId}`, { withCredentials: true }).then((res) => res.data)
    }

    getOneInfo(infoId) {
        return axios.get(`${API_URL}/crous/infos/${infoId}`, { withCredentials: true }).then((res) => res.data)
    }

    getToday() {
        return axios.get(`${API_URL}/crous/today`, { withCredentials: true }).then(res => res.data)
    }

    getDate(date) {
        return axios.get(`${API_URL}/crous/daily/${date}`, { withCredentials: true }).then(res => res.data)
    }

    getFood() {
        return axios.get(`${API_URL}/crous/food`, { withCredentials: true }).then(res => res.data)
    }

    postMenu({
        starters,dishes,desserts,date, 
    }) {
        return axios.post(`${API_URL}/crous/menu`, {
            starters,
            dishes,
            desserts,
            date, 
        }, { withCredentials: true }).then(res => res.data)
    }
}

export default new CrousService()
