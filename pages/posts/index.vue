<template>
  <section class="featured-posts">
    <PostList :posts="posts" />
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import PostList from '@/components/posts/PostList.vue'
import { Post } from '~/types/Post'

export default Vue.extend({
  components: {
    PostList,
  },

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
