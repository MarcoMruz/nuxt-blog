import Vuex from 'vuex'
import { API_DB_URL } from '~/config'
import { Post } from '~/types/Post'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [] as Post[],
    },

    mutations: {
      setPosts(state, posts: Post[]) {
        state.loadedPosts = posts
      },
    },

    actions: {
      async nuxtServerInit(vuexContext) {
        try {
          const response = this.$axios.get(`${API_DB_URL}/posts.json`)
          const posts = [] as Post[]

          for (const key in (await response).data) {
            posts.push({ ...(await response).data[key], id: key })
          }

          vuexContext.commit('setPosts', posts)
        } catch (error) {
          throw new Error(error)
        }
      },
      setPosts(context, posts: Post[]) {
        context.commit('setPosts', posts)
      },
    },

    getters: {
      posts(state): Post[] {
        return state.loadedPosts
      },
    },
  })
}

export default createStore
