<template>
<div>
    <div
      class="absolute py-12 hero h-52 w-full top-0 left-0"
    >
      <h3 class="text-4xl font-bold mb-8 text-0" style="padding-left: 5%; padding-right: 5%;">
        Créer un Post
      </h3>
    </div>
    <div class="relative mt-32 mb-10 flex mx-auto w-11/12">
      <Form class="bg-1 flex flex-col space-y-4 box-card box-card-border min-w-2/3">
        <div>
          <div class="label-title">
            Titre
          </div>

          <div class="label-desc">
            Donnez un titre simple et complet afin de décrire votre Post
          </div>
          <Field
            as="input"
            id="title"
            class="w-full input input-border bg-1"
            type="text"
            name="title"
            placeholder="Titre descriptif/complet"
            rules="required|email"
          />
        </div>

        <div>
          <div class="label-title">
            Type de Post
          </div>
          <div class="label-desc">
            Quel <u class="text-blue-400 hover:text-orange-400 cursor-help" v-tippy="{ content: typeHtml }">type</u> de Post voulez-vous créer ?
          </div>
          <select id="type" class="input input-border bg-1 pr-4" required>
              <option disabled value="" selected>Type de Post</option>
              <option value="1">Question</option>
              <option value="2">Suggestion</option>
              <option value="3">Problème</option>
              <option value="4">Opinion</option>
              <option value="5">Discussion</option>
          </select>
        </div>

        <div>
          <div class="label-title">
            Contenu
          </div>
          <div class="label-desc">
            Décrivez le plus précisément possible votre Post
          </div>
          <div>
            <tip-tap-editor v-model="editorValue" ref="editorRef" :charCount="true" :buttons="editorButtons" inputPlaceholder="Décrivez votre question/suggestion/problème !">
              <p :class="editorMeta.valid ? 'success-message' : 'error-message' " v-show="editorErrorMessage || editorMeta.valid">
                {{ editorErrorMessage || '✓ Ce Post est valide' }}
              </p>
            </tip-tap-editor>
          </div>
        </div>

        <div>
          <div class="label-title">
            Tags
          </div>
          <div class="label-desc">
            Ajoutez 5 Tags qui décrivent le sujet de votre Post
          </div>
          <tags-input ref="tagsInputRef" inputPlaceholder="Entrez le nom du tag et appuyez sur entrée..."></tags-input>
        </div>

        <div>
          <button class="button" @click="validate">Soumettre le Post pour validation</button>
        </div>
      </Form>

      <div class="ml-6 flex-grow-0 flex-shrink-0 w-1/5">
        <TextCard title="Qu'est-ce qu'un Post ?">
          <div>
            Les Posts sont là pour faciliter les échanges entre
          l'établissement et les élèves, utilisez les quand vous avez un
          problème à faire remonter, besoin d'une aide, une question à
          poser...
          </div>
        </TextCard>
        <br>
        <TextCard title="Étapes de création" desc="">
            <ul style="list-style-type: square; list-style-position: inside;">
              <li>
                Un sommaire structuré et complet de votre besoin
              </li>
              <li>
                En quoi de précédents tickets ne répondent pas à votre besoin
              </li>
              <li>
                Ce que vous avez déjà essayé de faire pour répondre à votre besoin
              </li>
            </ul>
        </TextCard>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { Form, Field, useField } from 'vee-validate'
import * as yup from 'yup'

import TagsInput from '@/components/Input/TagsInput.vue'
import TextCard from '@/components/Card/TextCard.vue'
import TipTapEditor from '@/components/TipTapEditor.vue'

import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'PostNew',
  components: {
    Form,
    Field,
    TagsInput,
    // eslint-disable-next-line vue/no-unused-components
    TextCard,
    TipTapEditor
  },
  inheritAttrs: false,
  data () {
    return {
      typeHtml: <ul>Types possibles: <li>Question: une question avec reponse </li> <li>Suggestion</li> <li>Problème</li> <li>Opinion</li> <li>Discussion</li></ul>,
      editorButtons: [
        { action: 'paragraph', icon: 'ri-paragraph ri-lg', content: 'Paragraphe (Ctrl+Alt+0)' },
        { action: 'bold', icon: 'ri-bold ri-lg', content: 'Gras (Ctrl+B)' },
        { action: 'italic', icon: 'ri-italic ri-lg', content: 'Italique (Ctrl+I)' },
        { action: 'strike', icon: 'ri-strikethrough ri-lg', content: 'Barré (Ctrl+Shift+X)' },
        { action: 'underline', icon: 'ri-underline ri-lg', content: 'Souligné (Ctrl+U)' },
        { action: 'highlight', icon: 'ri-mark-pen-line ri-lg', content: 'Surligné (Ctrl+Shift+H)' },
        { action: 'clearMarks', icon: 'ri-format-clear ri-lg', content: 'Enlever les styles' }
      ]
    }
  },
  methods: {
    validate () {
      const post = {
        title: document.querySelector('#title').value,
        body: JSON.stringify(this.$refs.editorRef.getJSON()),
        type: document.querySelector('#type').value,
        tags: [...this.$refs.tagsInputRef.tags]
      }
      this.$store.dispatch('posts/addPost', post)
    }
  },
  setup () {
    const tagsInputRef = ref(null)
    const editorRef = ref(null)

    const {
      value: editorValue,
      errorMessage: editorErrorMessage,
      handleBlur,
      handleChange,
      meta: editorMeta
    } = useField('name', yup.string().email().required(), { initialValue: '<p></p>' })

    return {
      tagsInputRef,
      editorRef,
      handleChange,
      handleBlur,
      editorErrorMessage,
      editorValue,
      editorMeta
    }
  }
})
</script>

<style>
  @import "~@/assets/css/utils/input.css";
  @import "~@/assets/css/utils/box.css";
  @import "~@/assets/css/utils/button.css";
  @import "~@/assets/css/utils/section.css";

  .success-message {
    @apply text-blue-400;
  }

  .error-message {
    @apply text-red-500;
  }
</style>
