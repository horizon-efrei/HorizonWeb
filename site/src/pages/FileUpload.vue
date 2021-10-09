<template>
  <div>
    <input type="file" id="myFile" name="filename">
    <input type="submit" @click="upload">
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
        const res = fetch('http://localhost:5000/files/course-docs/upload', {
          method: 'POST',
          body: data,
          headers: {
            'X-Api-Version': 1,
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTU5YjE0MzY3NmIwOGViZWRlYzAyODQiLCJ1c2VybmFtZSI6InVzcm5fZWxsaW90IiwiaWF0IjoxNjMzNjE1ODczLCJleHAiOjE2MzM2MTk0NzN9.idt9dDlVDPBdyuNK00D1NcORDJDpLgeYOhge8PUZ7Ns'
          }
        })
        console.log(await res)
      }
    }
  }
})
</script>

<style scoped>
</style>
