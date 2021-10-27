<template>
  <div class="text-1 overflow-y-auto overflow-x-hidden app-scrollbar">
    <div class="divide-y divide-color-1">
      <ul
        v-for="linkSection of links"
        :key="linkSection"
        class="py-2"
      >
        <template
          v-for="link of linkSection"
          :key="link"
        >
          <li>
            <router-link
              v-if="link.condition == undefined || condition(link.condition)"
              :to="link.to"
              class="h-12 py-2 px-4 flex w-full items-center transition-colors bg-mouse-brand duration-300 cursor-pointer"
              :class="{ active: link.to === $route.path }"
            >
              <i
                :class="link.icon"
                class="w-6 h-6 mr-4 flex-shrink-0"
              />
              <span>{{ link.text }}</span>
            </router-link>
          </li>
        </template>
      </ul>

      <div class="flex py-4 items-center justify-center">
        <div class="topbar-icon">
          <i class="ri-notification-2-line" />
        </div>
        <div class="topbar-icon">
          <i class="ri-folder-line" />
        </div>
        <div class="topbar-icon">
          <i class="ri-mail-unread-line" />
        </div>

        <label
          class="switch mr-3 orange"
          @click="$store.dispatch('userConfig/switchTheme')"
        >
          <input
            v-model="theme"
            type="checkbox"
          >
          <span class="slider round" />
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent, watch } from 'vue'

export default defineComponent({
  name: 'SidebarBase',
  props: {
    links: {
      type: Array,
      default: () => [
        [
          { to: '/', text: 'Accueil', icon: 'ri-home-3-line' },
          { to: '/todo_announce', text: 'Annonces', icon: 'ri-alarm-warning-line' },
          { to: '/dashboard', text: 'Dashboard admin', icon: 'ri-pie-chart-box-line' }
        ],
        [
          { to: '/file_upload', text: 'Ajouter un doc', icon: 'ri-folder-upload-line' }
        ],
        [
          { to: '/new_post', text: 'Créer un post', icon: 'ri-chat-new-line' },
          { to: '/posts', text: 'Tous les posts', icon: 'ri-chat-check-line' }
        ],
        [
          { to: '/my_account', text: 'Mon compte', icon: 'ri-account-box-line', condition: 'loggedIn' },
          { to: '/todo_rgpd', text: 'RGPD', icon: 'ri-database-2-line' },
          { to: '/todo_horizon', text: 'Horizon', icon: 'ri-information-line' }
        ]
      ]
    }
  },
  data () {
    return {
      theme: this.$store.state.userConfig.theme === 'dark'
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.auth.status.loggedIn
    }
  },
  mounted () {
    watch(() => this.$store.getters['userConfig/getTheme'], (newTheme) => {
      if ((newTheme === 'dark') !== this.theme) {
        this.theme = newTheme === 'dark'
      }
    })
  },
  methods: {
    condition (type) {
      if (type === 'loggedIn') {
        return this.loggedIn
      } else {
        return false
      }
    }
  }
})
</script>

<style>
@import "~@/assets/css/utils/button.css";

#sidebar[opened] {
  @apply lg-max:absolute lg-max:h-screen lg-max:top-0;
}

#sidebar-top:not([opened]) {
  @apply hidden;
}

#sidebar-top[opened] {
  @apply lg:hidden;
}
</style>
