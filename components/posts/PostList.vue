<template>
  <section class="featured-posts">
    <PostPreview :post="getPost" :is-admin="isAdmin" />
  </section>
</template>
<script lang="ts">
import PostPreview from '@/components/posts/PostPreview.vue'
import { Post } from '~/types/Post'

export default {
  components: {
    PostPreview,
  },

  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    getPost(): Post {
      return {
        id: '1',
        title: 'This is the first post',
        previewText: 'Lorem ipsum dolor sit amet',
        thumbnail:
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhedgetrade.com%2Fwp-content%2Fuploads%2F2019%2F03%2FBlockchain-Coding.jpg&f=1&nofb=1',
      }
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
