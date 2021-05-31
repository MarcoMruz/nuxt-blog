<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{ post.title }}</h1>
      <div class="post-details">
        <div class="post-detail">{{ post.updatedAt }}</div>
        <div class="post-detail">{{ post.author }}</div>
      </div>
      <p class="post-content">{{ post.content }}</p>
    </section>
    <section class="post-feedback">
      <p><a href="mailto:marcomruz1@gmail.com">send email to the author</a></p>
    </section>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { API_DB_URL } from '~/config'

export default Vue.extend({
  asyncData({ $axios, params }) {
    return $axios
      .get(`${API_DB_URL}/posts/${params.id}.json`)
      .then((response) => {
        return {
          post: response.data,
        }
      })
      .catch((error) => console.error(error))
  },
})
</script>
<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>
