<template>
  <section class="featured-posts">
    <PostPreview
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :is-admin="isAdmin"
    />
  </section>
</template>
<script lang="ts">
import PostPreview from '@/components/posts/PostPreview.vue'

export default {
  components: {
    PostPreview,
  },

  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },

    posts: {
      type: Array,
      required: true,
    },
  },
}
</script>
<style scoped>
.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
