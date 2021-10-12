<template>
  <div ref="tagsContainer" class="flex flex-grow-0 flex-wrap items-center input input-border w-full cursor-text h-max" tabindex="0" @focus="tagsInput.focus()" :focused="focused">
    <!-- <span v-for="tag in tags" :key="tag" class="flex items-center space-x-2 bg-rose-300 p-2 mr-4 rounded-md text-white">
      <div>{{ tag }}</div>
      <button class="text-white bg-opacity-0 outline-none border-none cursor-pointer" @click="removeTag(index)">x</button>
    </span> -->
    <template v-for="(tag, idx) in tags" :key="idx">
      <Tag :name="tag" color="red-500">
        <button class="text-white bg-opacity-0 outline-none border-none cursor-pointer font-bold text-lg" @click="removeTag(idx)"><i class="ri-close-line"></i></button>
      </Tag>
    </template>
    <input v-model="newTag" ref="tagsInput"
      @blur="focused = false"
      @focus="focused = true"
      @keydown.enter="addTag(newTag)"
      @keydown.space="addTag(newTag)"
      @keydown.prevent.tab="addTag(newTag)"
      @keydown.delete="newTag.length || removeTag(tags.length - 1)"
      class="min-w-1 w-full bg-opacity-0 flex-1 bg-white outline-none" />
  </div>
</template>

<style>
  @import "~@/assets/css/utils/input.css";

  .min-w-1 {
    min-width: 1em;
  }
</style>

<script>
import Tag from '@/components/Tag.vue'
// import AutoSizeInputInner from '@/components/Input/AutoSizeInputInner.vue'
import { ref } from 'vue'
export default {
  components: {
    // AutoSizeInputInner,
    Tag
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
