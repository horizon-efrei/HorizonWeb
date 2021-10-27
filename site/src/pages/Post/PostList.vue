<template>
  <div>
    <div
      class="absolute py-12 hero h-52 w-full top-0 left-0"
    >
      <h3
        class="text-4xl font-bold text-0"
        style="padding-left: 5%; padding-right: 5%;"
      >
        Liste des Posts
      </h3>
    </div>
    <div class="relative mt-32 mb-10 flex flex-col mx-auto w-11/12">
      <PostListingCard
        v-for="post in posts"
        :key="post.id"
        class="mb-4"
        :post="post"
      />
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import PostListingCard from '@/components/Card/PostListingCard.vue'

export default defineComponent({
  name: 'PostList',
  components: { PostListingCard },
  data () {
    return {
      posts: []
    }
  },
  created () {
    this.$store.dispatch('posts/fetchPosts', { page: this.$store.state.posts.page }).then(
      data => {
        this.posts = this.$store.state.posts.posts
      },
      error => {
        this.loading = false
        this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString()
      }
    )
  }
})
</script>

<style scoped>
</style>
