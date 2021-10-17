const theme = JSON.parse(localStorage.getItem('themePreference'))
const initialState = { theme: theme === 'dark' ? 'dark' : 'light' }

export const userConfig = {
  namespaced: true,
  state: initialState,
  getters: {
    getTheme (state) {
      return state.theme
    }
  },
  actions: {
    switchTheme ({ state, commit }) {
      commit('setTheme', state.theme === 'dark' ? 'light' : 'dark')
    }
    // login ({ commit }, user) {
    //   return AuthService.login(user).then(
    //     user => {
    //       commit('loginSuccess', user)
    //       return Promise.resolve(user)
    //     },
    //     error => {
    //       commit('loginFailure')
    //       return Promise.reject(error)
    //     }
    //   )
    // },
    // logout ({ commit }) {
    //   AuthService.logout()
    //   commit('logout')
    // },
    // register ({ commit }, user) {
    //   return AuthService.register(user).then(
    //     response => {
    //       commit('registerSuccess')
    //       return Promise.resolve(response.data)
    //     },
    //     error => {
    //       commit('registerFailure')
    //       return Promise.reject(error)
    //     }
    //   )
    // }
  },
  mutations: {
    setTheme (state, theme) {
      state.theme = theme
      localStorage.setItem('themePreference', JSON.stringify(theme))
    }
  }
}
