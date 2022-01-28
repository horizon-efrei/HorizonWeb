import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

class CrousService {
    getOneMenu(menuId) {
        return axios.get(`${API_URL}/restaurant/daily-menus/${menuId}`, { withCredentials: true }).then((res) => res.data)
    }

    getOneInfo(infoId) {
        return axios.get(`${API_URL}/restaurant/daily-info/${infoId}`, { withCredentials: true }).then((res) => res.data)
    }

    getToday() {
        return axios.get(`${API_URL}/restaurant/date?date=${new Date().toISOString().split('T').shift()}`, { withCredentials: true }).then(res => res.data)
    }

    getDate(date) {
        return axios.get(`${API_URL}/restaurant/date?date=${date}`, { withCredentials: true }).then(res => res.data)
    }

    getFood() {
        return axios.get(`${API_URL}/restaurant/food`, { withCredentials: true }).then(res => res.data)
    }

    postMenu({
        starters,dishes,desserts,date,
    }) {
        return axios.post(`${API_URL}/restaurant/daily-menus`, {
            starters,
            dishes,
            desserts,
            date,
        }, { withCredentials: true }).then(res => res.data)
    }

    postFood({
        name,type,
    }) {
        return axios.post(`${API_URL}/restaurant/food`, {
            name,
            type,
        }, { withCredentials: true }).then(res => res.data)
    }

    updateMenu({
        menuId,menu,
    }) {
        return axios.patch(`${API_URL}/restaurant/daily-menus/${menuId}`,{ ...menu }, { withCredentials: true }).then(res => res.data)
    }
}

export default new CrousService()
