<template>
  <nav
    id="topbar"
    class="flex fixed top-0 left-0 w-full h-tbar border-bar text-1 items-center justify-between border-b"
    :class="bg"
  >
    <div class="flex flex-shrink-0 px-4 w-sbar items-center justify-center">
      <button
        class="mr-4"
        aria-label="Open Menu"
        @click="$emit('openSidebar')"
      >
        <MenuIcon class="h-8 w-8" />
      </button>
      <div class="brand w-32 h-6 mt-1.5" />
    </div>

    <div class="w-full h-full flex items-center">
      <div class="relative bg-transparent flex-grow px-6">
        <span class="absolute inset-y-0 right-0 flex items-center pr-6">
          <DocumentSearchIcon
            class="p-1 w-8 h-8 text-hover-brand transition-colors"
            @click="() => $emit('launchSearch')"
          />
        </span>
        <input
          id="search-input"
          type="text"
          class="w-full text-1 placeholder-3 p-1.5 pr-10 text-lg border-b-2 bc-alt-1 bc-mouse-brand outline-none"
          :class="bg"
          placeholder="Rechercher..."
          @input="(e) => $emit('updateSearch', e.target.value)"
        >
      </div>
    </div>

    <div v-if="!loggedIn" class="flex-shrink-0 flex justify-center items-center mr-4">
      <button class="button text-md" @click="$emit('toggleLogin')">
          <div class="flex space-x-2 items-center">
          <i class="ri-login-circle-line text-xl"></i>
          <p>SE CONNECTER</p>
          </div>
      </button>
    </div>

    <div v-else class="flex bg-transparent items-center justify-between h-full">
      <div class="mr-4" >
        <user-card avatar="https://www.hersolrentals.com/images/user.png" :username="user.username" :email="user.email" status="green-500"></user-card>
      </div>
    </div>
  </nav>
</template>

<script>

import UserCard from '@/components/Card/UserCard.vue'
import { DocumentSearchIcon, MenuIcon } from '@heroicons/vue/solid'

export default {
  data () {
    return {
      bg: 'bg-1'
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.auth.status.loggedIn
    },
    user () {
      return this.$store.state.auth.user
    }
  },
  components: {
    DocumentSearchIcon,
    MenuIcon,
    UserCard
  },
  emits: [
    'launchSearch',
    'updateSearch',
    'openSidebar',
    'closeSidebar',
    'toggleLogin'
  ]
}
</script>

<style>
  @import "~@/assets/css/utils/switch.css";

  .topbar-icon {
      @apply mr-6 w-6 h-6;
  }
</style>
