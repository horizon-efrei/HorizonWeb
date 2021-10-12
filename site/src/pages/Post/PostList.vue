<template>
  <div>
    <div class="text-3xl text-1">
      Liste des Threads :
    </div>
    <div>
      <PostListingCard
        class="mt-1"
        :title="'Probleme lors de la création de Threads'"
      />

      <PostListingCard
        class="mt-1"
        :title="'Probleme lors de la création de Threads'"
      />

      <PostListingCard
        class="mt-1"
        :title="'Probleme lors de la création de Threads'"
      />

      <PostListingCard
        class="mt-1"
        :title="'Probleme lors de la création de Threads'"
      />
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import PostListingCard from '@/components/PostListingCard.vue'

export default defineComponent({
  name: 'PostList',
  components: { PostListingCard }
})
</script>

<style scoped>
</style>
