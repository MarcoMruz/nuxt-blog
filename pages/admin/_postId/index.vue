<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" />
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

  data() {
    return {
      loadedPost: {
        author: 'Marco',
        title: 'lorem ipsum',
        content: 'super amazing website you are on',
        thumbnailLink:
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhedgetrade.com%2Fwp-content%2Fuploads%2F2019%2F03%2FBlockchain-Coding.jpg&f=1&nofb=1',
      },
    }
  },
}
</script>
