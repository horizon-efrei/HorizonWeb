<template>
  <div>
    <div class="text-3xl text-1 font-extrabold mt-6">
      Créer un nouveau Thread
    </div>
    <div class="flex mt-6" style="flex-basis: 50%;">
      <div class="flex flex-col space-y-4 box-card box-card-border">
        <div>
          <div class="label-title">
            Titre
          </div>

          <div class="label-desc">
            Donnez un titre simple et complet afin de décrire votre ticket
          </div>
          <input
            id="title"
            class="w-full input input-border bg-1"
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
            <tip-tap-editor :buttons="editorButtons" placeholder="Décrivez votre question/suggestion/problème !">
            </tip-tap-editor>
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

        <div>
          <button class="button">Soumettre le Post pour validation</button>
        </div>
      </div>

      <div class="ml-6 flex-grow-0 flex-shrink-0 w-1/5">
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
import TipTapEditor from '@/components/TipTapEditor.vue'

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PostNew',
  components: {
    TagsInput,
    TextCard,
    TipTapEditor
  },
  data () {
    return {
      editorButtons: [
        { action: 'paragraph', icon: '<i class="ri-home-line"></i>', content: 'Text' }
      ]
    }
  }
})
</script>

<style>
  @import "~@/assets/css/utils/input.css";
  @import "~@/assets/css/utils/box.css";
  @import "~@/assets/css/utils/button.css";
  @import "~@/assets/css/utils/section.css";
</style>
