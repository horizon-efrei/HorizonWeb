<template>
  <form method="post" action="http://localhost:5000/posts" enctype="multipart/form-data">
    <input type="file" id="myFile" name="filename">
    <input type="submit">
  </form>
</template>

<script lang="js">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FileUpload',
  props: {
  },
  methods: {
  }
})
</script>

<style scoped>
</style>
