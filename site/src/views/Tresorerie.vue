<template>
    <!-- TODO: add filtering, tab, info panel -->
    <AppView>
         <AppTabs v-model:tab="currentTab" :tabs="tabs" route-base="/admin">
         <DashboardCore :columns="tabs" />
         </AppTabs>

        <div class="flex">
            <h3 class="pl-10 mb-8 text-3xl font-bold text-0">Trésorerie</h3>
            <div class="grow h-14 ..."></div>
            <button class="shrink-0 button-green" @click="addTresorerie">
                <p><i class="fas fa-plus"></i> Ajouter</p>
            </button>
        </div>
        <ListPage base-route="/test" :store-callback="categories.getCategories">
            <template #default="{ items }">
                <CategorieList :categories="items" />
            </template>
        </ListPage>

        <AppModal :show="showForm" @close="showForm = false">
            <Transition name="fade">
                <p></p>
            </Transition>
        </AppModal>
    </AppView>
</template>

<script setup>
    import DashboardCore from '@/components/Dashboard/DashboardCore.vue'
    import AppModal from '@/components/App/AppModal.vue'
    import AppView from '@/views/App/AppView.vue'
    import ListPage from '@/views/App/ListPage.vue'
    import { ref } from 'vue'
    import CategorieList from '../Categorie/CategorieList.vue'

    import { useCategoriesStore } from '@/store/categories.store'

    const tabs = [
        {
            id: 'reports',
            name: 'Signalements',
            icon: 'flag',
        },
        {
            id: 'threads',
            name: 'Threads',
            icon: 'newspaper',
        },
    ]

    const categories = useCategoriesStore()
    const showForm = ref(false)
    const addCategorie = function () {
        showForm.value = true
    }
</script>
