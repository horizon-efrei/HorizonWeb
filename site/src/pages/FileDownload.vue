<template>
    <img :src="`${res.url}`">
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import fetch from 'node-fetch'

export default defineComponent({
  name: 'FileDownload',
  props: {
  },
  methods: {
    download: async () => {
      fetch('http://localhost:5000/files/download/19/star_platinum.jpg ', {
        method: 'GET',
        headers: {
          'X-Api-Version': 1,
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTU5YjE0MzY3NmIwOGViZWRlYzAyODQiLCJ1c2VybmFtZSI6InVzcm5fZWxsaW90IiwiaWF0IjoxNjMzOTA0MTI3LCJleHAiOjE2MzM5MDc3Mjd9.8vkrViqd4Hj-Br2f7UAQbSVlqh15HxVQpjp8zpqzqLk'
        }
      }).then(res => { console.log(res.url) }).then(response => response.json()) // .then(res => { this.image = res.url }) // .then(res => { document.getElementById('receive').innerHTML = res })
    }
  }
})
</script>

<style scoped>
</style>
