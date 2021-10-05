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
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTViMDZjNDFhMzU2OTdkNzgxZDdmM2EiLCJ1c2VybmFtZSI6InVzcm5fZWxsaW90IiwiaWF0IjoxNjMzNDc0NjYzLCJleHAiOjE2MzM0NzgyNjN9.d7qalDtQc1lQ07_OQP3UMWDiM920G86KfEiTXmHIUag'
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
