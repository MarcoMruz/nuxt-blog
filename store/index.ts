import Vuex from 'vuex'
import { API_KEY } from '~/config'
import { Post } from '~/types/Post'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [] as Post[],
      token: '',
    },

    mutations: {
      setPosts(state, posts: Post[]) {
        state.loadedPosts = posts
      },

      addPost(state, post: Post) {
        state.loadedPosts.push(post)
      },

      editPost(state, editedPost: Post) {
        const postIndex = state.loadedPosts.findIndex(
          (post) => post.id === editedPost.id
        )

        state.loadedPosts[postIndex] = editedPost
      },

      setToken(state, token) {
        state.token = token
      },
    },

    actions: {
      async nuxtServerInit(vuexContext) {
        try {
          const response = this.$axios.$get(`/posts.json`)
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

      addPost(context, post: Post) {
        return this.$axios
          .$post(`/posts.json?auth=${context.state.token}`, {
            ...post,
            updatedAt: new Date(),
          })
          .then((res) => {
            context.commit('addPost', { ...post, id: res.data.name })
          })
      },

      editPost(context, post: Post) {
        return this.$axios
          .$put(`/posts/${post.id}.json?auth=${context.state.token}`, post)
          .then(() => {
            context.commit('editPost', { ...post, id: post.id })
          })
      },

      authUser(context, { email, password, isLogin }) {
        return this.$axios
          .post(
            `https://identitytoolkit.googleapis.com/v1/accounts:${
              isLogin ? 'signInWithPassword' : 'signUp'
            }?key=${API_KEY}`,
            {
              email,
              password,
              returnSecureToken: true,
            }
          )
          .then((response) => {
            context.commit('setToken', response.data.idToken)
            this.$router.replace('/admin')
          })
      },
    },

    getters: {
      posts(state): Post[] {
        return state.loadedPosts
      },

      isAuthenticated(state): boolean {
        return !!state.token
      },
    },
  })
}

export default createStore
