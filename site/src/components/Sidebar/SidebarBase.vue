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
            <router-link :to="link.to"
              v-if="link.condition == undefined || condition(link.condition)"
              class="h-12 py-2 px-4 flex w-full items-center transition-colors bg-mouse-brand duration-300 cursor-pointer"
              :class="{ active: link.to === $route.path }"
            >
              <component
                :is="link.icon"
                class="w-6 h-6 mr-4 flex-shrink-0"
              />
              <span>{{ link.text }}</span>
            </router-link>
          </li>
        </template>
      </ul>

      <div class="flex py-4 items-center justify-center">
        <div class="topbar-icon">
          <BellIcon />
        </div>
        <div class="topbar-icon">
          <FolderIcon />
        </div>
        <div class="topbar-icon">
          <MailIcon />
        </div>

        <label
          class="switch mr-3 orange"
          @click="$store.dispatch('userConfig/switchTheme')"
        >
          <input type="checkbox" v-model="theme">
          <span class="slider round" />
        </label>
      </div>

      <!-- <div class="p-2" >
        <user-card avatar="http://cdn.onlinewebfonts.com/svg/img_83486.png" :user="user" status="green-500"></user-card>
      </div> -->
    </div>
  </div>
</template>

<script lang="js">
import {
  HomeIcon,
  SpeakerphoneIcon,
  ClipboardCheckIcon,
  ClipboardListIcon,
  TicketIcon,
  InformationCircleIcon,
  UserIcon,
  BriefcaseIcon,
  PresentationChartLineIcon,
  DatabaseIcon,
  BellIcon,
  FolderIcon,
  MailIcon
} from '@heroicons/vue/solid'

import { defineComponent, watch } from 'vue'

export default defineComponent({
  name: 'SidebarBase',
  components: {
    HomeIcon,
    SpeakerphoneIcon,
    ClipboardCheckIcon,
    ClipboardListIcon,
    TicketIcon,
    InformationCircleIcon,
    UserIcon,
    BriefcaseIcon,
    PresentationChartLineIcon,
    DatabaseIcon,
    BellIcon,
    FolderIcon,
    MailIcon
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
  },
  data () {
    return {
      theme: this.$store.state.userConfig.theme === 'dark'
    }
  },
  props: {
    links: {
      type: Array,
      default: () => [
        [
          { to: '/', text: 'Accueil', icon: 'HomeIcon' },
          { to: '/todo_announce', text: 'Annonces', icon: 'SpeakerphoneIcon' },
          { to: '/dashboard', text: 'Dashboard admin', icon: 'PresentationChartLineIcon' }
        ],
        [
          { to: '/new_post', text: 'Créer un post', icon: 'TicketIcon' },
          { to: '/posts', text: 'Tous les posts', icon: 'ClipboardCheckIcon' }
        ],
        [
          { to: '/my_account', text: 'Mon compte', icon: 'UserIcon', condition: 'loggedIn' },
          { to: '/todo_rgpd', text: 'RGPD', icon: 'DatabaseIcon' },
          { to: '/todo_horizon', text: 'Horizon', icon: 'InformationCircleIcon' }
        ]
      ]
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
