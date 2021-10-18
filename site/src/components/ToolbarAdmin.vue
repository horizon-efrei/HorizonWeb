<template>
  <div class="text-1 flex flex-col items-center">
    <CubeIcon class="w-8 h-8 mt-4 bg-yellow-500" />
    <CubeIcon class="w-8 h-8 mt-4 bg-yellow-500" />
    <CubeIcon class="w-8 h-8 mt-4 bg-yellow-500" />
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import { CubeIcon } from '@heroicons/vue/outline'
export default defineComponent({
  name: 'ToolbarAdmin',
  component: {
    CubeIcon
  },
  props: {
    sections: {
      type: Array,
      default: () => [
        'Général',
        "Ef'réussite"
      ]
    }
  },
  methods: {
  }
})
</script>

<style scoped>
</style>
