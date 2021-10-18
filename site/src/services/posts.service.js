import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:5000/api/'

class PostsService {
  getPosts (query) {
    console.log('queries', query, authHeader())
    return axios.get(API_URL + 'posts', { params: query, headers: authHeader() }).then(
      res => res.data.items
    )
  }

  addPost (post) {
    return axios.post(API_URL + 'posts', post, { headers: authHeader() })
  }

  modifyPost (id, newPost) {
    return axios.post(API_URL + 'posts', { id, newPost }, { headers: authHeader() })
  }

  deletePost (id) {
    return axios.delete(API_URL + 'posts', { id }, { headers: authHeader() })
  }
}

export default new PostsService()
