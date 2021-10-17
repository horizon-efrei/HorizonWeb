<template>
  <div class="text-1 overflow-y-auto overflow-x-hidden app-scrollbar">
    <div class="divide-y bc-1">
      <ul v-for="section of sections" :key="section" class="py-2">
        <span class="capitalize" />
        <template v-for="link of links" :key="link">
          <li v-if="link.section == section">
            <a
              :href="link.href"
              class="
                h-12
                py-2
                px-4
                flex
                w-full
                items-center
                transition-colors
                bg-mouse-brand
                duration-300
              "
            >
              <component :is="link.icon" class="w-6 h-6 mr-4 flex-shrink-0" />
              <span>{{ link.text }}</span>
            </a>
          </li>
        </template>
      </ul>

      <div class="px-4">
        <ul class="w-full flex items-center justify-between">
          <li class="cursor-pointer pt-5 pb-3">
            <CogIcon class="h-8" />
          </li>
        </ul>
      </div>
    </div>
    <div class="" />
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import {} from '@heroicons/vue/outline'
export default defineComponent({
  name: 'ToolbarAdmin',
  component: {
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
  },
  methods: {
  }
})
</script>

<style scoped>
</style>
