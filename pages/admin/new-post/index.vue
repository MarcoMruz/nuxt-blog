<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmit" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from '@/components/admin/AdminPostForm'
import { API_DB_URL } from '@/config'

export default {
  components: {
    AdminPostForm,
  },

  layout: 'admin',

  methods: {
    onSubmit(post) {
      this.$axios.post(`${API_DB_URL}/posts.json`, post)
    },
  },
}
</script>

<style></style>
