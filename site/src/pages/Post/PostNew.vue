<template>
  <div>
    <div class="text-3xl text-1 font-extrabold mt-6">
      Créer un nouveau Thread
    </div>
    <div class="flex mt-6">
      <div>
        <div class="flex flex-col space-y-4 box-card">
          <div>
            <div class="label-title">
              Titre
            </div>

            <div class="label-desc">
              Donnez un titre simple et complet afin de décrire votre ticket
            </div>
            <input
              id="title"
              class="w-full input bg-1"
              type="text"
              name="title"
              placeholder="Ex. ''"
            />
          </div>

          <div>
            <div class="label-title">
              Contenu
            </div>
            <div class="label-desc">
              Décrivez le plus précisément possible votre ticket afin d'avoir
              toutes les données nécessaires pour le faire avancer
            </div>
            <div>
              <quill-editor
                v-model:value="state.content"
                :options="state.editorOption"
                :disabled="state.disabled"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
                @change="onEditorChange($event)"
              />
            </div>
          </div>

          <div>
            <div class="label-title">
              Tags
            </div>
            <div class="label-desc">
              Ajoutez 5 Tags qui décrivent le sujet de votre Thread
            </div>
            <tags-input></tags-input>
          </div>
        </div>
      </div>

      <div class="w-2/6 ml-6">
        <TextCard title="Qu'est-ce qu'un Thread ?">
          <div>
            Les Threads sont là pour faciliter les échanges entre
          l'établissement et les élèves, utilisez les quand vous avez un
          problème à faire remonter, besoin d'une aide, une question à
          poser...
          </div>
        </TextCard>
        <br>
        <TextCard title="Étapes de création" desc="">
          <ol>
            <li>Entrez le titre</li>
            <li>Décrivez le problème</li>
            <li>Entrez des Tags</li>
          </ol>
        </TextCard>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import TagsInput from '@/components/Input/TagsInput.vue'
import TextCard from '@/components/Card/TextCard.vue'

import { reactive, defineComponent } from 'vue'

export default defineComponent({
  name: 'PostNew',
  components: { TagsInput, TextCard },
  data () {
    return {
      value: [
        { name: 'Javascript', code: 'js' }
      ],
      options: [
        { name: 'Vue.js', code: 'vu' },
        { name: 'Javascript', code: 'js' },
        { name: 'Open Source', code: 'os' }
      ]
    }
  },
  methods: {
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.value.push(tag)
    }
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
  },
  props: {
    title: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  }
})
</script>

<style>
  @import "~@/assets/css/utils/inputs.css";
  @import "~@/assets/css/utils/box.css";
  @import "~@/assets/css/utils/section.css";
</style>
