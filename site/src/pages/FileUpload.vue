<template>
  <div>
    <input type="file" id="myFile" name="filename">
    <input type="submit" @click="upload">
    <pre id="response"></pre>
    <button @click="search">BOUTON</button>
    <pre id="receive"></pre>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import fetch from 'node-fetch'

export default defineComponent({
  name: 'FileUpload',
  props: {
  },
  methods: {
    upload: async () => {
      const input = document.getElementById('myFile')
      const file = input.files[0]
      console.log('FILE', file)
      if (file) {
        const data = new FormData()
        data.append('file', file)
        console.log('DATA', data)
        fetch('http://localhost:5000/files/course-docs/upload', {
          method: 'POST',
          body: data,
          headers: {
            'X-Api-Version': 1,
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTU5YjE0MzY3NmIwOGViZWRlYzAyODQiLCJ1c2VybmFtZSI6InVzcm5fZWxsaW90IiwiaWF0IjoxNjMzODE4OTE4LCJleHAiOjE2MzM4MjI1MTh9.3rgnwPrXTbNsUA3Wgo0L-DLabZFOvHKkpglbVEMql_c'
          }
        }).then(res => { document.getElementById('response').innerHTML = res })
      }
    },

    search: async () => {
      fetch('http://localhost:5000/files/course-docs/search?page=1', {
        method: 'GET',
        headers: {
          'X-Api-Version': 1,
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTU5YjE0MzY3NmIwOGViZWRlYzAyODQiLCJ1c2VybmFtZSI6InVzcm5fZWxsaW90IiwiaWF0IjoxNjMzODE4OTE4LCJleHAiOjE2MzM4MjI1MTh9.3rgnwPrXTbNsUA3Wgo0L-DLabZFOvHKkpglbVEMql_c'
        }
      }).then(res => res.json()).then(res => { document.getElementById('receive').innerHTML = JSON.stringify(res) })
    }
  }
})
</script>

<style scoped>
</style>
