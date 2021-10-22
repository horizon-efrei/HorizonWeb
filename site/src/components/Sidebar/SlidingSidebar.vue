<template>
  <aside
    id="slide-sidebar"
    class="-l-sbar fixed overflow-hidden z-50 flex flex-col h-full w-sbar bg-1 text-2 whitespace-nowrap tr-spacing"
  >
    <div
      id="slide-sidebar-top"
      class="bg-2 h-tbar flex flex-shrink-0 items-center pl-3"
    >
      <button
        class="mr-4"
        aria-label="Open Menu"
        @click="$emit('closeSidebar')"
      >
        <i class="ri-close-line" />
      </button>
      <div class="brand w-32 h-6 flex-shrink-0" />
    </div>
    <SidebarBase />
    <img>
  </aside>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import SidebarBase from '@/components/Sidebar/SidebarBase.vue'

export default defineComponent({
  name: 'Sidebar',
  components: {
    SidebarBase
  },
  emits: [
    'closeSidebar'
  ]
})
</script>

<style>
.tr-spacing {
  transition: color 300ms, background-color 300ms linear, border-color 300ms, fill 300ms, stroke 300ms, margin-left 500ms;
}

/* #sidebar[opened] {
  @apply lg-max:absolute lg-max:h-screen lg-max:top-0;
}

#sidebar-top:not([opened]) {
  @apply hidden;
}

#sidebar-top[opened] {
  @apply lg:hidden;
} */
</style>
