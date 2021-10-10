<template>
  <!-- <AutoSizeInput>
  </AutoSizeInput> -->
  <tags-input>
  </tags-input>
  <!-- <quill-editor
    v-model:value="state.content"
    :options="state.editorOption"
    :disabled="state.disabled"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)"
    @change="onEditorChange($event)"
  /> -->
  <!-- <div
    v-for="i in 50"
    :key="i"
    class="py-8 shadow text-center rounded-lg mb-10 bg-white"
  >
    CONTENT
  </div> -->
</template>

<script lang="js">
import { reactive, defineComponent } from 'vue'
import katex from 'katex'
import 'katex/dist/katex.min.css'

import TagsInput from './Input/TagsInput.vue'
// import AutoSizeInput from './Input/AutoSizeInput.vue'

export default defineComponent({
  name: 'Content',
  components: { TagsInput },
  mounted () {
    window.katex = katex
  },
  setup () {
    const state = reactive({
      content: '<p>2333</p>',
      _content: '',
      editorOption: {
        placeholder: 'core',
        modules: {
          // toolbars: [
          // custom toolbars options
          // will override the default configuration
          // ],
          // other moudle options here
          // otherMoudle: {}
        }
        // more options
      },
      disabled: false
    })

    const onEditorBlur = (quill) => {
      console.log('editor blur!', quill)
    }
    const onEditorFocus = (quill) => {
      console.log('editor focus!', quill)
    }
    const onEditorReady = (quill) => {
      console.log('editor ready!', quill)
    }
    const onEditorChange = ({ quill, html, text }) => {
      console.log('editor change!', quill, html, text)
      state._content = html
    }

    return { state, onEditorBlur, onEditorFocus, onEditorReady, onEditorChange }
  }
})
</script>
