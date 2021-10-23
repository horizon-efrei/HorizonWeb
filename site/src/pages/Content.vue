<template>
  <div class="m-0">
    <div
      class="py-12 px-10 hero"
    >
      <div class="px-6">
        <h2 class="text-2xl mb-2 text-2">
          Forums Horizon
        </h2>
        <h3 class="text-4xl font-bold mb-8 text-0">
          Résolution de problèmes &amp; collaboration étudiante.
        </h3>
        <router-link to="/new_post">
          <button
            class="bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider"
          >
            Créer un post
          </button>
        </router-link>
      </div>
    </div>

    <!-- Features -->
    <section class="mx-auto px-8 py-10">
      <h2 class="text-4xl font-bold text-center text-1 mb-12 uppercase">
        Fonctionnalités
      </h2>
      <div class="flex items-center flex-wrap mb-20">
        <div class="w-full md:w-1/2 pr-6">
          <h4 class="text-3xl text-1 font-medium mb-3">
            Posts Publics
          </h4>
          <p class="text-2 mb-8">
            Un post est une <u>question</u>, une <u>remontée de problème</u>, une <u>suggestion d'amélioration</u> ou une <u>opinion</u>.
            Quiconque peut participer aux fils de discussion des posts, les <u>upvoter/downvoter</u> ou <u>rechercher d'anciens posts archivés</u>.
          </p>
        </div>
        <div class="w-full md:w-1/2">
          <swiper
            :space-between="30"
            :centered-slides="true"
            :autoplay="{
              'delay': 6000,
              'disableOnInteraction': false
            }"
            :pagination="{
              'clickable': true
            }"
            :navigation="true"
          >
            <swiper-slide>
              <post-listing-card :post="posts[0]" />
            </swiper-slide>
            <swiper-slide>
              <post-listing-card :post="posts[1]" />
            </swiper-slide>
            <swiper-slide>
              <post-listing-card :post="posts[2]" />
            </swiper-slide>
            <swiper-slide>
              <post-listing-card :post="posts[3]" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <div class="flex items-center flex-wrap mb-20">
        <div class="w-full md:w-1/2 pr-6">
          <img
            src="http://localhost:5000/github.png"
            class="w-3/4 mx-auto"
          >
        </div>
        <div class="w-full md:w-1/2">
          <h4 class="text-3xl text-1 font-medium  mb-3">
            Fils de discussion détaillés
          </h4>
          <p class="text-2 mb-8">
            Chaque Post public a un <u>fil de discussion</u> associé dans lequel <u>quiconque peut contribuer</u>; chaque action sur le Post est enregistrée dans <u>l'historique du Post</u>, et visible dans sa <u>vue "Historique"</u>
          </p>
        </div>
      </div>

      <div class="flex items-center flex-wrap">
        <div class="w-full md:w-1/2 pr-6">
          <h4 class="text-3xl text-1 font-medium  mb-3">
            Recherche avancée &amp; Filtrage des Posts
          </h4>
          <p class="text-2 mb-8">
            <u>Une barre de recherche</u> disponible sur toutes les pages permet de chercher du contenu parmi <u>toutes les ressources</u> de la plateforme
            <br><br>
            Pour chaque <u>type de ressource</u>, des <u>filtres sur les tags, les dates de publication et l'état des ressources</u> permettent de simplifier et préciser les recherches
          </p>
        </div>
        <div>
          <div class="flex flex-row mb-2 space-x-2">
            <div class="relative">
              <select
                class="
                    rounded-l
                    input
                    input-border-no-shadow
                    bg-2
                    py-2
                    px-4
                    pr-8
                  "
              >
                <option>5</option>
                <option>10</option>
                <option>20</option>
              </select>
            </div>
            <div class="relative">
              <select
                class="
                    rounded-l
                    input
                    input-border-no-shadow
                    bg-2
                    py-2
                    px-4
                    pr-8
                  "
              >
                <option>Non-Résolu</option>
                <option>Résolu</option>
              </select>
            </div>
            <div class="relative">
              <select
                class="
                    rounded-l
                    input
                    input-border-no-shadow
                    bg-2
                    py-2
                    px-4
                    pr-8
                  "
              >
                <option>Depuis toujours</option>
                <option>Aujourd'hui</option>
                <option>Cette semaine</option>
                <option>Ce mois</option>
              </select>
            </div>
            <div class="relative">
              <select
                class="
                    rounded-l
                    input
                    input-border-no-shadow
                    bg-2
                    py-2
                    px-4
                    pr-8
                  "
              >
                <option>Actif</option>
                <option>Très actif</option>
              </select>
            </div>
            <div class="relative">
              <select
                class="
                    rounded-l
                    input
                    input-border
                    bg-2
                    py-2
                    px-4
                    pr-8
                  "
              >
                <option>> 500 vues</option>
                <option>> 200 vues</option>
                <option>> 1000 vues</option>
              </select>
            </div>
          </div>
          <div class="block relative mb-2">
            <span
              class="
                  h-full
                  absolute
                  inset-y-0
                  left-0
                  flex
                  items-center
                  pl-3
                  text-1
                "
            >
              <i class="ri-search-line" />
            </span>
            <input
              placeholder="Rechercher..."
              class="
                  w-full
                  input
                  input-border
                  bg-2
                  rounded
                  border
                  border-color-3
                  pl-8
                  pr-6
                  py-2
                "
            >
          </div>
          <div class="w-full">
            <tags-input input-placeholder="Contient les tags..." />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="js">
import PostListingCard from '@/components/Card/PostListingCard'
import { defineComponent } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'

import TagsInput from '@/components/Input/TagsInput.vue'

import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/scrollbar/scrollbar.scss'

// import Swiper core and required modules
import SwiperCore, {
  Autoplay, Pagination, Navigation
} from 'swiper'

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation])

export default defineComponent({
  name: 'Content',
  components: {
    Swiper,
    SwiperSlide,
    PostListingCard,
    TagsInput
  },
  inheritAttrs: false,
  setup () {
    const onSwiper = (swiper) => {
      console.log(swiper)
    }
    const onSlideChange = () => {
      console.log('slide change')
    }
    return {
      onSwiper,
      onSlideChange
    }
  },
  data () {
    return {
      posts: [
        { type: 3, state: 0, tags: ['émargement', 'présence', 'promo:l2', 'cours', 'importance:moyenne', 'fréquence:régulier'], body: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Problème observé: les étudiants sont parfois notés absents à des cours auxquels ils sont présents (particulièrement en ligne)"}]},{"type":"paragraph","content":[{"type":"text","text":"Solution potentielle: mettre en place un système d’émargement électronique officiel"}]}]}', title: 'Problème avec le système d\'émargement en L2', author: { username: 'Sophie H.', avatar: 'http://localhost:5000/landing/girl_1.jpg', rep: 50200 }, favs: 33, likes: 243, views: 44653, dislikes: 3, createdAt: '2021-10-18T13:51:36.631Z', updatedAt: '2021-10-18T13:51:36.631Z' },
        { type: 2, state: 1, tags: ['terrasse', 'promo:toutes', 'matériel', 'importance:moyenne', 'difficulté:facile'], body: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Les poufs sur la terrasse au dessus du fab lab sont laissés en extérieur la nuit ce qui les salit quand il pleut."}]},{"type":"paragraph","content":[{"type":"text","text":"Peut-être que les étudiants pourraient être autorisés et encourager à les ranger dans le hall du Bât. C ou dans le Bât. A les soirs de pluie ?"}]}]}', title: 'Rangement des poufs sur la terrasse du Bât. I', author: { username: 'Jean R.', avatar: 'http://localhost:5000/landing/guy_1.jpg', rep: 2021 }, favs: 104, likes: 1255, views: 27553, dislikes: 3, createdAt: '2021-10-15T13:51:36.631Z', updatedAt: '2021-10-17T13:51:36.631Z' },
        { type: 1, state: 1, tags: ['pave', 'déclaration pave', 'promo:toutes', 'urgence:haute'], body: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"J\'ai entendu dire qu\'il y\'avait besoin de remplir une déclaration de PAVE pour avoir ses points pour un semestre donné, mais je ne la connais pas."}]},{"type":"paragraph","content":[{"type":"text","text":"Est-ce quelqu\'un pourrait me montrer comment faire, étape par étape ?"}]}]}', title: 'Comment déclarer sa PAVE ?', author: { username: 'Emma L.', avatar: 'http://localhost:5000/landing/girl_2.jpg', rep: 1234 }, favs: 95, likes: 1004, views: 16993, dislikes: 3, createdAt: '2021-10-01T13:51:36.631Z', updatedAt: '2021-10-08T13:51:36.631Z' },
        { type: 4, state: 0, tags: ['stage', 'sopra steria', 'promo:m1', 'expérience'], body: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Bonjour à tous ! J\'ai reçu une proposition de stage chez Sopra, mais j\'hésite encore à l\'accepter"}]},{"type":"paragraph","content":[{"type":"text","text":"Pour ceux qui ont déjà fait un stage chez eux, comment fut votre expérience là-bas ? Avez-vous des conseils ?"}]}]}', title: 'Retour d\'expérience Sopra Steria', author: { username: 'Stéphane M.', avatar: 'http://localhost:5000/landing/guy_2.jpg', rep: 234 }, favs: 12, likes: 430, views: 4683, dislikes: 3, createdAt: '2021-02-04T13:51:36.631Z', updatedAt: '2021-03-04T13:51:36.631Z' }
      ]
    }
  }
})
</script>

<style lang="scss">
  @import "~@/assets/scss/themes.scss";

  .hero {
    background: linear-gradient(90deg, #ffe100 20%, #ffb800 100%)
  }

  :root.dark .hero {
    background: linear-gradient(90deg, #000d4b 20%, #000926 100%)
  }

  .swiper-container {
    @apply pb-10;
  }

  .swiper-button-next {
    @apply top-unset h-7 rounded-full bg-black bottom-0;
  }

  .swiper-button-next::after {
    @apply text-lg;
  }

  .swiper-button-prev {
    @apply top-unset h-7 rounded-full bg-black bottom-0;
  }

  .swiper-button-prev::after {
    @apply text-lg;
  }

  .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
    @apply w-1/2 left-1/4;
  }

  .swiper-pagination-bullet {
    // @include bg-1;
  }
</style>
