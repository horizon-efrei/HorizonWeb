<template>
  <div class="flex space-x-4 items-center">
    <div class="relative w-11 h-11">
      <div>
        <img
            class="rounded-2xl"
            :src="avatar"
            :alt="username"
        />
      </div>
      <span class="w-1/3 h-1/3 absolute bottom-0 right-0 rounded-full border-2 border-color-alt-2" :class="`bg-${status}`"></span>
    </div>
    <div class="flex flex-col min-w-0">
    <div class="font-semibold truncate">{{ username }}</div>
    <div class="truncate">{{ email }}</div>
    </div>
    <div class="flex flex-col items-center justify-center space-y-2">
      <cog-icon class="w-5 h-5 cursor-pointer"></cog-icon>
      <logout-icon class="w-4 h-4 cursor-pointer" @click="logout"></logout-icon>
    </div>
    <!-- rounded polygon generator => https://weareoutman.github.io/rounded-polygon/ -->
    <!-- polygon size 190 * 190 almost the same size as the image -->
    <!-- <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
        <defs>
        <clipPath id="roundedPolygon">
            <path stroke="none" d="M27.5 3.5980762113533a9 9 0 0 1 9 0l17.846787517318 10.303847577293a9 9 0 0 1 4.5 7.7942286340599l0 20.607695154587a9 9 0 0 1 -4.5 7.7942286340599l-17.846787517318 10.303847577293a9 9 0 0 1 -9 0l-17.846787517318 -10.303847577293a9 9 0 0 1 -4.5 -7.79422863406l0 -20.607695154587a9 9 0 0 1 4.5 -7.7942286340599"></path>
        </clipPath>
        </defs>
    </svg> -->
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import {
  CogIcon, LogoutIcon
} from '@heroicons/vue/outline'

export default defineComponent({
  name: 'UserCard',
  components: { CogIcon, LogoutIcon },
  props: {
    username: {
      type: String
    },
    email: {
      type: String
    },
    avatar: {
      type: String
    },
    status: {
      type: String
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
    }
  }
})
</script>

<style>
  @import "~@/assets/css/utils/box.css";
</style>
