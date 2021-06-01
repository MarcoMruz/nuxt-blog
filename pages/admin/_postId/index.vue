<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="post" @submit="onSubmit" />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AdminPostForm from '@/components/admin/AdminPostForm.vue'
import { Post } from '@/types/Post'

export default Vue.extend({
  components: {
    AdminPostForm,
  },

  layout: 'admin',
  middleware: 'auth',

  async asyncData({ $axios, params }) {
    let post = { data: '' }
    try {
      post = await $axios.get(`/posts/${params.postId}.json`)
    } catch (error) {
      console.error(error)
    }

    return { post: post.data }
  },

  data() {
    return {
      post: {} as Post,
    }
  },

  methods: {
    onSubmit(post: Post) {
      this.$store
        .dispatch('editPost', {
          ...post,
          id: this.$route.params.postId,
        })
        .then(() => this.$router.replace('/admin'))
    },
  },
})
</script>
