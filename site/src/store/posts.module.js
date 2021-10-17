import PostsService from '../services/posts.service'

const initialState = { posts: [], page: 1 }

export const posts = {
  namespaced: true,
  state: initialState,
  actions: {
    fetchPosts ({ commit }, query) {
      return PostsService.getPosts(query).then(
        posts => {
          commit('fetchSuccess', posts)
          return Promise.resolve(posts)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    newFetchPosts ({ commit }, query) {
      commit('refreshPosts')
      return PostsService.getPosts({ page: 1, ...query }).then(
        posts => {
          commit('fetchSuccess', posts)
          return Promise.resolve(posts)
        },
        error => {
          console.log(error)
          return Promise.reject(error)
        }
      )
    },
    addPost ({ commit }, post) {
      return PostsService.addPost(post).then(
        newPost => {
          commit('addPostSuccess', newPost)
          return Promise.resolve(newPost)
        },
        error => {
          console.log(error)
          return Promise.reject(error)
        }
      )
    },
    modifyPost ({ commit }, id, newPost) {
      return PostsService.modifyPost(id, newPost).then(
        modifiedPost => {
          commit('modifyPostSuccess', id, modifiedPost)
          return Promise.resolve(modifiedPost)
        },
        error => {
          console.log(error)
          return Promise.reject(error)
        }
      )
    },
    deletePost ({ commit }, id) {
      return PostsService.modifyPost(id).then(
        success => { commit('deletePostSuccess', id) },
        error => { console.log(error) }
      )
    }
  },
  mutations: {
    refreshPosts (state) {
      state.posts = []
      state.page = 1
    },
    fetchSuccess (state, posts) {
      state.posts = [...new Set([...state.posts, ...posts])]
      state.page++
    },
    addPostSuccess (state, newPost) {
      state.posts.unshift(newPost)
    },
    modifyPostSuccess (state, id, modifedPost) {
      state.posts = state.posts.map(post => modifedPost ? post.id === id : post)
    },
    deletePostSuccess (state, id) {
      state.posts = state.posts.filter(post => post.id !== id)
    }
  }
}
