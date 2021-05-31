<template>
  <section class="featured-posts">
    <PostList :posts="posts" />
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import { Post } from '~/types/Post'

export default Vue.extend({
  computed: {
    posts(): Post[] {
      return this.$store.getters.posts
    },
  },
})
</script>
<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
