<template>
  <div>
    <input
      id="myFile"
      type="file"
      name="filename"
    >
    <input
      type="submit"
      @click="upload"
    >
    <pre id="response" />
    <button @click="search">
      BOUTON
    </button>
    <pre id="receive" />
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'FileUpload',
  props: {
  },
  methods: {
    upload: async () => {
      const input = document.getElementById('myFile')
      const file = input.files[0]

      if (file) {
        const data = new FormData()
        data.append('file', file)

        axios.post('http://localhost:5000/files/course-docs/upload', data, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTU5YjE0MzY3NmIwOGViZWRlYzAyODQiLCJ1c2VybmFtZSI6InVzcm5fZWxsaW90IiwiaWF0IjoxNjMzODE4OTE4LCJleHAiOjE2MzM4MjI1MTh9.3rgnwPrXTbNsUA3Wgo0L-DLabZFOvHKkpglbVEMql_c'
          }
        }).then(res => { document.getElementById('response').innerHTML = JSON.stringify(res.data) })
      }
    },

    search: async () => {
      axios.get('http://localhost:5000/files/course-docs/search?page=1', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTU5YjE0MzY3NmIwOGViZWRlYzAyODQiLCJ1c2VybmFtZSI6InVzcm5fZWxsaW90IiwiaWF0IjoxNjMzODE4OTE4LCJleHAiOjE2MzM4MjI1MTh9.3rgnwPrXTbNsUA3Wgo0L-DLabZFOvHKkpglbVEMql_c'
        }
      }).then(res => { document.getElementById('receive').innerHTML = JSON.stringify(res.data) })
    }
  }
})
</script>

<style scoped>
</style>
