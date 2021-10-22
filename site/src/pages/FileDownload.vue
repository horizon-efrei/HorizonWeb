<template>
  <img :src="url">
</template>

<script lang="js">

import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'FileDownload',
  date () {
    return {
      url: ''
    }
  },
  methods: {
    download: async () => {
      axios.get('http://localhost:5000/files/download/19/star_platinum.jpg', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTU5YjE0MzY3NmIwOGViZWRlYzAyODQiLCJ1c2VybmFtZSI6InVzcm5fZWxsaW90IiwiaWF0IjoxNjMzOTA0MTI3LCJleHAiOjE2MzM5MDc3Mjd9.8vkrViqd4Hj-Br2f7UAQbSVlqh15HxVQpjp8zpqzqLk'
        }
      }).then(res => { this.url = res.data.url })
    }
  }
})
</script>

<style scoped>
</style>
