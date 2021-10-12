<template>
  <div class="text-1 overflow-y-auto overflow-x-hidden app-scrollbar">
    <div class="divide-y divide-color-1">
      <ul
        v-for="section of sections"
        :key="section"
        class="py-2"
      >
        <span class="capitalize" />
        <template
          v-for="link of links"
          :key="link"
        >
          <li v-if="link.section == section">
            <a
              :href="link.href"
              class="h-12 py-2 px-4 flex w-full items-center transition-colors bg-mouse-brand duration-300"
            >
              <component
                :is="link.icon"
                class="w-6 h-6 mr-4 flex-shrink-0"
              />
              <span>{{ link.text }}</span>
            </a>
          </li>
        </template>
      </ul>

      <div class="flex justify-center pt-5">
        <button class="button text-md" @click="$emit('toggleLogin')">
           <div class="flex space-x-2 items-center">
            <i class="ri-login-circle-line text-xl"></i>
            <p>SE CONNECTER</p>
           </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import {
  SearchIcon,
  SpeakerphoneIcon,
  DocumentDownloadIcon,
  CalendarIcon,
  TicketIcon,
  InformationCircleIcon,
  UserIcon,
  BriefcaseIcon,
  PresentationChartLineIcon,
  DatabaseIcon
} from '@heroicons/vue/solid'

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SidebarBase',
  emits: ['toggleLogin'],
  components: {
    SearchIcon,
    SpeakerphoneIcon,
    DocumentDownloadIcon,
    CalendarIcon,
    TicketIcon,
    InformationCircleIcon,
    UserIcon,
    BriefcaseIcon,
    PresentationChartLineIcon,
    DatabaseIcon
  },
  props: {
    sections: {
      type: Array,
      default: () => [
        'Général',
        "Ef'réussite",
        'Scolarité',
        'Horizon',
        'Mon Espace'
      ]
    },

    links: {
      type: Array,
      default: () => [
        { href: '#', section: 'Général', text: 'Annonces', icon: 'SpeakerphoneIcon' },
        { href: '#', section: 'Général', text: 'Dashboard site', icon: 'PresentationChartLineIcon' },
        { href: '#', section: "Ef'réussite", text: 'Docs sharing', icon: 'DocumentDownloadIcon' },
        { href: '#', section: "Ef'réussite", text: 'Scheduler', icon: 'CalendarIcon' },
        { href: '#', section: 'Scolarité', text: 'Infos scolarité', icon: 'InformationCircleIcon' },
        { href: '#', section: 'Scolarité', text: 'Remontées', icon: 'TicketIcon' },
        { href: '#', section: 'Horizon', text: 'Notre association', icon: 'SearchIcon' },
        { href: '#', section: 'Horizon', text: 'Project dating', icon: 'BriefcaseIcon' },
        { href: '#', section: 'Mon Espace', text: 'Mon compte', icon: 'UserIcon' },
        { href: '#', section: 'Mon Espace', text: 'RGPD', icon: 'DatabaseIcon' }
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
