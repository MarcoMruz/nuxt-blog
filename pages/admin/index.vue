<template>
  <div class="admin-page">
    <section class="new-post">
      <button @click="$router.push({ name: 'admin-new-post' })">
        Create Post
      </button>
    </section>
    <section class="existing-posts">
      <h1>Existing Posts</h1>
      <PostList is-admin :posts="posts" />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Post } from '@/types/Post'

export default Vue.extend({
  layout: 'admin',

  computed: {
    posts(): Post[] {
      return this.$store.getters.posts
    },
  },
})
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>
