<template>
  <section class="featured-posts">
    <PostList isAdmin />
  </section>
</template>
<script lang="ts">
import PostList from '@/components/posts/PostList.vue'

export default {
  components: {
    PostList,
  },
}
</script>
<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
