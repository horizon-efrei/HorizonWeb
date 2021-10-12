<template>
  <span class="relative">
    <span ref="spanSize" class="invisible whitespace-pre">_</span>
    <input :value="modelValue" ref="autoSizeInput" @blur="$emit('blur')" @focus="$emit('focus')" @input="updateSize" class="absolute left-0 w-full bg-opacity-0 bg-white outline-none" />
  </span>
</template>

<script>
import { ref } from 'vue'
export default {
  props: ['modelValue'],
  emits: ['update:modelValue', 'focus', 'blur'],
  setup (props, context) {
    const spanSize = ref(null)
    const autoSizeInput = ref(null)
    const updateSize = (evt) => {
      context.emit('update:modelValue', evt.target.value)
      spanSize.value.innerText = '_' + autoSizeInput.value.value
    }

    return { updateSize, spanSize, autoSizeInput }
  }
}
</script>
