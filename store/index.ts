import Vuex from 'vuex'
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
      nuxtServerInit(vuexContext) {
        return new Promise((resolve) => {
          setTimeout(() => {
            vuexContext.commit('setPosts', [
              {
                id: '1',
                title: 'This is the first post',
                previewText: 'Lorem ipsum dolor sit amet',
                thumbnail:
                  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhedgetrade.com%2Fwp-content%2Fuploads%2F2019%2F03%2FBlockchain-Coding.jpg&f=1&nofb=1',
              },
            ])

            resolve(1)
          }, 1500)
        })
      },
      setPosts(context, posts: Post[]) {
        context.commit('setPosts', posts)
      },
    },

    getters: {
      posts(state) {
        return state.loadedPosts
      },
    },
  })
}

export default createStore
