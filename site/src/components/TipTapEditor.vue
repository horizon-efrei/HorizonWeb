<template>
    <div>
        <div v-if="editor">
            <div v-for="btn in buttons" :key="btn" class="h-6 w-6">
                <div v-html="btn.icon" @click="actionMap[btn.action].action()" :class="{ 'is-active': actionMap[btn.action].isActive }" class="h-6 w-6 text-1" v-tippy="{ content: btn.content }"></div>
            </div>
        </div>
        <editor-content :editor="editor" />
    </div>
</template>

<script lang="js">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PostNew',
  components: {
    EditorContent
  },
  props: {
    buttons: Array,
    placeholder: String
  },
  data () {
    return {
      actionMap: {
        paragraph: {
          action: () => this.editor.chain().focus().toggleBold().run(),
          isActive: () => this.editor.isActive('paragraph')
        }
      }
    }
  },
  setup (props, context) {
    console.log('PLACEHOLDER', props.placeholder)

    Placeholder.configure({
      placeholder: props.placeholder
    })

    const editor = useEditor({
      content: '',
      extensions: [
        StarterKit,
        Highlight,
        Typography,
        Placeholder
      ]
    })

    return { editor }
  }
})
</script>

<style>
  @import "~@/assets/css/utils/input.css";
  @import "~@/assets/css/utils/box.css";
  @import "~@/assets/css/utils/button.css";

  /* Placeholder (at the top) */
    .ProseMirror p.is-editor-empty:first-child::before {
        content: attr(data-placeholder);
        float: left;
        color: #ced4da;
        pointer-events: none;
        height: 0;
    }
</style>
