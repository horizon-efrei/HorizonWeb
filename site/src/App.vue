<template>
  <sliding-sidebar @closeSidebar="sidebarHandler" @toggleLogin="toggleLogin" />
  <div v-if="showLogin" class="fixed top-0 left-0 w-screen h-screen z-50" @click="toggleLogin">
    <login @click.stop="() => {}"></login>
  </div>
  <div
    id="main-container"
    class="relative flex flex-row-reverse filter h-screen w-screen z-1"
  >
      <search-query ref="searchQuery" />

      <div
      id="content-wrapper"
      class="w-full bg-1 shadow-inner-deep dark:shadow-dark-inner-deep h-content flex relative top-tbar overflow-hidden"
    >
      <div
        id="content"
        class="py-7 px-9 flex-1 overflow-auto app-scrollbar"
      >
        <router-view />
      </div>
    </div>
    <topbar
      ref="topbar"
      @launchSearch="launchSearch"
      @updateSearch="updateSearch"
      @openSidebar="sidebarHandler"
    />
    <sidebar @closeSidebar="sidebarHandler" @toggleLogin="toggleLogin" />
  </div>
</template>

<script lang="js">
import Login from '@/components/Login.vue'
import { defineComponent } from 'vue'

import Topbar from '@/components/Topbar.vue'
import Sidebar from '@/components/Sidebar/Sidebar.vue'
import SlidingSidebar from '@/components/Sidebar/SlidingSidebar.vue'
import SearchQuery from '@/components/SearchQuery.vue'

export default defineComponent({
  components: {
    Login,
    Topbar,
    Sidebar,
    SlidingSidebar,
    SearchQuery
  },
  data () {
    return {
      showSidebar: false,
      reachedBreak: false,
      breakWidth: 1024,
      showLogin: false
    }
  },
  mounted () {
    window.addEventListener('resize', this.checkResize)
    window.addEventListener('keydown', this.checkKeydown)
    this.checkResize()
  },
  unmounted () {
    window.removeEventListener('resize', this.checkResize)
    window.removeEventListener('keydown', this.checkKeydown)
  },
  methods: {
    checkKeydown (e) {
      if (e.key === 'Escape') {
        if (this.$data.showSidebar) {
          this.sidebarHandler()
        } else if (this.$refs.searchQuery.$data.searchVisible) {
          this.$refs.searchQuery.collapseSearch()
        }
      }
    },
    checkResize () {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      this.$refs.searchQuery.checkResize()
      if (vw > this.$data.breakWidth && !this.$data.reachedBreak) {
        const slideSidebar = document.getElementById('slide-sidebar')
        if (!slideSidebar.classList.contains('-l-sbar')) {
          slideSidebar.classList.add('-l-sbar')
        }

        if (!this.showLogin) {
          const mainContainer = document.getElementById('main-container')
          mainContainer.classList.remove('brightness-50')
        }

        this.$data.reachedBreak = true
      } else if (vw <= this.$data.breakWidth && this.$data.reachedBreak) {
        this.$data.reachedBreak = false
      }
    },
    sidebarHandler () {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      const slideSidebar = document.getElementById('slide-sidebar')
      const mainContainer = document.getElementById('main-container')
      if (vw > this.$data.breakWidth && !this.$refs.searchQuery.$data.searchVisible) {
      //   this.$data.showSidebar = false
      } else if (!this.$data.showSidebar) {
        slideSidebar.classList.remove('-l-sbar')
        mainContainer.classList.add('brightness-50')
        this.$data.showSidebar = true
        mainContainer.addEventListener('mousedown', this.sidebarHandler, { once: true })
      } else if (this.$data.showSidebar) {
        slideSidebar.classList.add('-l-sbar')
        mainContainer.classList.remove('brightness-50')
        this.$data.showSidebar = false
        mainContainer.removeEventListener('mousedown', this.sidebarHandler, { once: true })
      }
    },
    toggleLogin () {
      const mainContainer = document.getElementById('main-container')
      this.showLogin = !this.showLogin
      if (this.showLogin) {
        if (this.$data.showSidebar) {
          this.sidebarHandler()
        }
        mainContainer.classList.add('brightness-50')
      } else {
        mainContainer.classList.remove('brightness-50')
      }
    },
    updateSearch (e) {
      this.$refs.searchQuery.updateQuery(e)
    },
    launchSearch (e) {
      const input = document.getElementById('search-input')
      this.$refs.searchQuery.launchSearch(input.value)
    }
  }
})
</script>

<style>
@import "~@/assets/css/themes.css";
@import "~@/assets/css/utils/spacing.css";

.icon {
  @apply h-6 float-right pl-6;
}

* {
  transition: color 300ms, box-shadow 300ms, background-color 300ms linear, border 300ms, outline 300ms, fill 300ms, stroke 300ms, filter 500ms;
}

html {
  font-size: 13px;
}

@media (min-width: 720px) {
  html {
    font-size: 15px;
  }
}
</style>
