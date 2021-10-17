<template>
  <div class="m-0">
    <div
      class="py-12 px-10 hero"
    >
      <div class="px-6">
        <h2 class="text-2xl mb-2 text-2">
          Horizon: Forums
        </h2>
        <h3 class="text-4xl font-bold mb-8 text-0">
          Résolution de problèmes &amp; collaboration étudiante.
        </h3>
        <button
          class="bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider"
        >
          Créer un post
        </button>
      </div>
    </div>

    <!-- Features -->
    <section class="mx-auto px-8 py-10">
      <h2 class="text-4xl font-bold text-center text-1 mb-12 uppercase">
        Fonctionnalités
      </h2>
      <div class="flex items-center flex-wrap mb-20">
        <div class="w-full md:w-1/2">
          <h4 class="text-3xl text-1 font-medium mb-3">
            Posts Publics
          </h4>
          <p class="text-2 mb-8">
            Un post est une <u>question</u>, une <u>remontée de problème</u>, une <u>suggestion d'amélioration</u> ou une <u>opinion</u>.
            Quiconque peut participer aux fils de discussion des posts, les <u>upvoter/downvoter</u> ou <u>rechercher d'anciens posts archivés</u>.
          </p>
        </div>
        <div class="w-full md:w-1/2 pl-6">
          <swiper :spaceBetween="30" :centeredSlides="true" :autoplay='{
  "delay": 100000,
  "disableOnInteraction": false
}' :pagination='{
  "clickable": true
}' :navigation="true">
            <swiper-slide>
              <post-listing-card :post="{ title: 'test', body: 'test', author: { username: 'Sophie H.', avatar: 'http://localhost:5000/landing/girl_1.jpg' } }"></post-listing-card>
            </swiper-slide>
            <swiper-slide>
              <post-listing-card :post="{ title: 'test', body: 'test', author: { username: 'Jean R.', avatar: 'http://localhost:5000/landing/guy_1.jpg' } }"></post-listing-card>
            </swiper-slide>
            <swiper-slide>
              <post-listing-card :post="{ title: 'test', body: 'test', author: { username: 'Emma L.', avatar: 'http://localhost:5000/landing/girl_2.jpg' } }"></post-listing-card>
            </swiper-slide>
            <swiper-slide>
              <post-listing-card :post="{ title: 'test', body: 'test', author: { username: 'Stéphane M.', avatar: 'http://localhost:5000/landing/guy_2.jpg' } }"></post-listing-card>
            </swiper-slide>
          </swiper>
          <!-- <vue-carousel :data="data"/> -->
        </div>
      </div>
      <div class="flex items-center flex-wrap mb-20">
        <div class="w-full md:w-1/2">
          <img src="assets/report.svg" alt="Reporting" />
        </div>
        <div class="w-full md:w-1/2 pl-10">
          <h4 class="text-3xl text-1 font-medium  mb-3">
            Fils de discussion détaillés
          </h4>
          <p class="text-2 mb-8">
            Our Smart Health Monitoring Wristwatch can generate a comprehensive
            report on your vitals depending on your settings either daily,
            weekly, monthly, quarterly or yearly.
          </p>
        </div>
      </div>
      <div class="flex items-center flex-wrap">
        <div class="w-full md:w-1/2">
          <h4 class="text-3xl text-1 font-medium  mb-3">
            Recherche avancée &amp; Filtrage des Posts
          </h4>
          <p class="text-2 mb-8">
            Our Smart Health Monitoring Wristwatch allows you to sync data
            across all your mobile devices whether iOS, Android or Windows OS
            and also to your laptop whether MacOS, GNU/Linux or Windows OS.
          </p>
        </div>
        <div>
          [Showcase ]
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="js">
import PostListingCard from '@/components/Card/PostListingCard'
import { defineComponent } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'

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
    PostListingCard
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
  }
})
</script>

<style>
  .hero {
    background: linear-gradient(90deg, #ffe100 20%, #ffb800 100%)
  }

  :root.dark .hero {
    background: linear-gradient(90deg, #000d4b 20%, #000926 100%)
  }

  .swiper-button-next {
    @apply top-unset bottom-1 h-7 rounded-full bg-black;
  }

  .swiper-button-next::after {
    @apply text-lg;
  }

  .swiper-button-prev {
    @apply top-unset bottom-1 h-7 rounded-full bg-black;
  }

  .swiper-button-prev::after {
    @apply text-lg;
  }

  .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
    @apply w-1/2 left-1/4;
  }
</style>
