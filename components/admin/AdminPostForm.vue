<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>

      <AppControlInput v-model="editedPost.title">Title</AppControlInput>

      <AppControlInput v-model="editedPost.thumbnailLink"
        >Thumbnail Link</AppControlInput
      >

      <AppControlInput v-model="editedPost.content" control-type="textarea"
        >Content</AppControlInput
      >

      <AppButton type="submit">Save</AppButton>

      <AppButton
        type="button"
        style="margin-left: 10px"
        btn-style="cancel"
        @click="onCancel"
        >Cancel</AppButton
      >
    </form>
  </div>
</template>

<script>
import AppControlInput from '@/components/ui/AppControlInput'
import AppButton from '@/components/ui/AppButton'

export default {
  components: {
    AppControlInput,
    AppButton,
  },
  props: {
    post: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      editedPost: this.post ?? {
        author: '',
        title: '',
        thumbnailLink: '',
        content: '',
      },
    }
  },

  methods: {
    handleSubmit() {
      // save the post
    },

    onCancel() {
      this.$router.push('/admin')
    },
  },
}
</script>

<style scoped>
.container {
  max-width: 50%;
  margin: auto;
}
</style>
