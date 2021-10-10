<template>
  <div ref="tagsContainer" class="flex input w-full cursor-text h-min" tabindex="0" @focus="tagsInput.$refs['autoSizeInput'].focus()" :focused="focused">
    <span v-for="tag in tags" :key="tag" class="flex items-center space-x-2 bg-rose-300 p-2 mr-4 rounded-md text-white">
      <div>{{ tag }}</div>
      <button class="text-white bg-opacity-0 outline-none border-none cursor-pointer" @click="removeTag(index)">x</button>
    </span>
    <AutoSizeInputInner ref="tagsInput" v-model="newTag" type="text"
      class="min-w-1 outline-none flex-1"
      @blur="focused = false"
      @focus="focused = true"
      @keydown.enter="addTag(newTag)"
      @keydown.space="addTag(newTag)"
      @keydown.prevent.tab="addTag(newTag)"
      @keydown.delete="newTag.length || removeTag(tags.length - 1)"
    />
  </div>
</template>

<style>
  @import "~@/assets/css/utils/inputs.css";
</style>

<script>
import AutoSizeInputInner from '@/components/Input/AutoSizeInputInner.vue'
import { ref } from 'vue'
export default {
  components: {
    AutoSizeInputInner
  },
  data: () => {
    return {
      focused: false
    }
  },
  setup: () => {
    const tagsContainer = ref(null)
    const tagsInput = ref(null)
    const addTag = (tag) => {
      tags.value.push(tag)
      newTag.value = '' // reset newTag
    }
    const removeTag = (index) => {
      tags.value.splice(index, 1)
    }
    const tags = ref([])
    const newTag = ref('') // keep up with new tag
    return { tags, newTag, addTag, removeTag, tagsContainer, tagsInput }
  }
}
</script>
