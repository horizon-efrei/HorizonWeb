<template>
    <!-- TODO: Local Storage pour voir les recherches recentes + Comonent pour afficher chaque hits -->
    <div>
        <CustomModal
            :show="showSearchBar"
            :modal-custom-class="'w-3/4 h-3/4'"
            @close="showSearchBar = false"
        >
            <div class="card w-full h-full">
                <ais-instant-search
                    :search-client="searchClient"
                    index-name="posts"
                    class="h-full"
                >
                    <div class="h-full flex flex-col">
                        <ais-search-box autofocus>
                            <template #default="{ currentRefinement, isSearchStalled, refine }">
                                <div
                                    class="w-full flex justify-between items-center cursor-pointer"
                                    @click.prevent="showSearchBar = true"
                                >
                                    <label class="flex-grow flex items-center">
                                        <input
                                            class="border-b-2 flex-grow text-4 md:text-lg lg:text-xl bg-1 p-2"
                                            placeholder="Rechercher une ressource sur Horizon Efrei..."
                                            type="search"
                                            :value="currentRefinement"
                                            @input="refine($event.currentTarget.value)"
                                        >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </label>
                                </div>
                                <span :hidden="!isSearchStalled">Chargement...</span>
                            </template>
                        </ais-search-box>

                        <div class="overflow-y-scroll h-full">
                            <ais-hits :transform-items="test">
                                <template #default="{ items }">
                                    <div v-if="items.length != 0">
                                        <div class="flex items-center text-lg my-2 gap-2">
                                            <i class="ri-chat-check-line" />
                                            Tous les posts
                                            <i class="ri-arrow-down-s-line" />
                                        </div>
                                        <div
                                            class="flex flex-col gap-2"
                                        >
                                            <transition-group
                                                name="search-fade"
                                            >
                                                <router-link
                                                    v-for="(post, i) in items"
                                                    :key="i"
                                                    :to="'/post/'+post.id"
                                                    @click="showSearchBar = false"
                                                >
                                                    <div class="flex flex-col bg-2 gap-1 rounded-lg p-2">
                                                        <div
                                                            class="flex items-center gap-2"
                                                        >
                                                            <i class="ri-hashtag ri-lg" />
                                                            <div class="flex flex-col">
                                                                <div class="">
                                                                    {{ post.title }}
                                                                </div>
                                                                <div class="text-2 text-sm">
                                                                    {{ post.body }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </router-link>
                                            </transition-group>
                                        </div>
                                    </div>
                                </template>
                            </ais-hits>
                            <ais-index index-name="study-docs">
                                <ais-hits :transform-items="test">
                                    <template #default="{ items }">
                                        <div v-if="items.length != 0">
                                            <div class="flex items-center text-lg my-2 gap-2">
                                                <i class="ri-file-line" />
                                                Tous les fichiers
                                                <i class="ri-arrow-down-s-line" />
                                            </div>
                                            <div
                                                class="flex flex-col gap-2"
                                            >
                                                <transition-group
                                                    name="search-fade"
                                                >
                                                    <router-link
                                                        v-for="(file, i) in items"
                                                        :key="i"
                                                        :to="'/file/'+file.id"
                                                        @click="showSearchBar = false"
                                                    >
                                                        <div
                                                            class="flex flex-col bg-2 gap-1 rounded-lg p-2"
                                                        >
                                                            <div
                                                                class="flex items-center gap-2"
                                                            >
                                                                <i class="ri-file-line ri-lg" />
                                                                <div class="flex flex-col">
                                                                    <div class="">
                                                                        {{ file.originalName }}
                                                                    </div>
                                                                    <div class="">
                                                                        {{ file.originalName }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </router-link>
                                                </transition-group>
                                            </div>
                                        </div>
                                    </template>
                                </ais-hits>
                            </ais-index>
                        </div>
                    </div>
                </ais-instant-search>
            </div>
        </CustomModal>
        <div
            class="w-full flex justify-between items-center cursor-pointer"
            @click.prevent="showSearchBar = true"
        >
            <div class="border-b-2 flex-grow text-4 md:text-lg lg:text-xl">
                Rechercher une ressource sur Horizon Efrei...
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
        </div>
    </div>
</template>

<script>
import CustomModal from './CustomModal.vue'

import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
    server: {
        //TODO: Private Key!!!!
        apiKey: "xyz",
        nodes: [
            {
                host: "localhost",
                port: "18108",
                protocol: "http",
            },
        ],
    },
    cacheSearchResultsForSeconds: 2 * 60,
    additionalSearchParameters:{
        limit_hits:5,
        per_page:5
    },
    collectionSpecificSearchParameters: {
        posts: {
            queryBy: "title,body,tags",
            queryByWeights:"10, 1, 5"
        },
        'study-docs': {
            queryBy: "originalName,subjectEnglishName,subjectName",
            queryByWeights:"10, 5, 5"
        },
        'club':{
            queryBy:"name, category, description",
            queryByWeights:"10, "
        },
        'info-docs':{
            queryBy: "name,subjectEnglishName,subjectName",
            queryByWeights:"10, 5, 5"
        }

    },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

export default {
    components:{
        CustomModal
    },
    data() {
        return {
            searchClient,
            showSearchBar : false
        }
    },
    methods: {
        test(a){
            console.log(a)
            return a
        }
    },
}
</script>
