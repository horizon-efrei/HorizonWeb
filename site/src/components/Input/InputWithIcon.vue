<template>
    <div class="flex flex-row text-gray-600 focus-within:text-gray-900 dark:text-gray-400 dark:focus-within:text-white">
        <span v-html="icon" class="flex items-center py-1 px-2 bg-3 rounded-l-md border-gray-300 dark:border-white border">
        </span>
        <input ref="input" :type="type" class="bg-2 input input-border text-md h-10 w-full rounded-l-none" :placeholder="placeholder">
    </div>
</template>

<script lang="js">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'InputWithIcon',
  props: {
    icon: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    }
  },

  setup () {
    const input = ref(null)
    return { input }
  }
})
</script>

<style>
@import "~@/assets/css/utils/input.css";
</style>
