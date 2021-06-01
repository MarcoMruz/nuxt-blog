<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmit" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from '@/components/admin/AdminPostForm'

export default {
  components: {
    AdminPostForm,
  },

  layout: 'admin',
  middleware: ['check-auth', 'auth'],

  methods: {
    onSubmit(post) {
      this.$store
        .dispatch('addPost', post)
        .then(() => this.$router.replace('/admin'))
    },
  },
}
</script>

<style></style>
