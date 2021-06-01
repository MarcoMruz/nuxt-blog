import Vuex from 'vuex'
import Cookie from 'js-cookie'
import { API_DB_URL, API_KEY } from '~/config'
import { Post } from '~/types/Post'

function getExpirationDateOfToken(expiresIn: number): string {
  return new Date().getTime() + +expiresIn * 1000 + ''
}

function saveTokenToSession(token: string, expiresIn: number) {
  localStorage.setItem('token', token)
  localStorage.setItem('tokenExpiration', getExpirationDateOfToken(expiresIn))

  Cookie.set('jwt', token)
  Cookie.set('expirationDate', getExpirationDateOfToken(expiresIn))
}

function getCookie(name: string, req: any) {
  const cookie = req.headers.cookie
    .split(';')
    .find((c: string) => c.trim().startsWith(`${name}=`))

  if (!cookie) return null

  return cookie.split('=')[1]
}

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [] as Post[],
      token: null,
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

      clearToken(state) {
        state.token = null
      },
    },

    actions: {
      async nuxtServerInit(vuexContext) {
        try {
          const response = await this.$axios.get(`${API_DB_URL}/posts.json`)
          const posts = [] as Post[]

          for (const key in response.data) {
            posts.push({ ...response.data[key], id: key })
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

            saveTokenToSession(response.data.idToken, response.data.expiresIn)

            this.$router.replace('/admin')
          })
      },

      initAuth(context, req) {
        let token = null
        let expiration = 0
        if (req) {
          if (!req.headers.cookie) return

          if (getCookie('jwt', req)) {
            token = getCookie('jwt', req)
            expiration = getCookie('expirationDate', req)
          } else return
        } else {
          token = localStorage.getItem('token')
          expiration = +localStorage.getItem('tokenExpiration')!
        }

        if (new Date().getTime() > expiration || !token) {
          context.commit('clearToken')
          return
        }

        context.commit('setToken', token)
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
