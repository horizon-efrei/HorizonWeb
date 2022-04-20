<template>
    <div class="h-screen">
        <div class="grid gap-2 text-sm" :class="[viewList ? '' : 'grid-cols-2  md:grid-cols-4']">
            <div
                v-for="(file, i) in files"
                :key="i"
                class="flex relative gap-2 items-center p-2 hover:bg-2-light dark:hover:bg-2-dark rounded cursor-pointer"
                :class="[viewList ? '' : 'flex-col']"
                @click="seePopper"
            >
                <DocumentIcon
                    :class="[viewList ? 'h-10' : 'h-12']"
                    :file-name="file.file.name"
                    :mime="file.file.mimeType"
                ></DocumentIcon>

                <div class="flex gap-2 items-center w-full" :class="[viewList ? '' : 'justify-center']">
                    <i v-if="file.file.user.roles.includes('moderator')" class="fas fa-school fa-xl"></i>
                    <div class="line-clamp-2" :class="[viewList ? '' : 'text-center']">
                        {{ file.file.name }}
                    </div>
                </div>
            </div>
        </div>

        <AppPopper :click-event="event" arrow="left">
            <div class="flex flex-col p-2 card">
                <div
                    class="flex gap-2 justify-center items-center py-1 px-2 hover:text-white hover:bg-green-500 rounded"
                >
                    <i class="fas fa-file-arrow-down"></i>Téléchager
                </div>
                <div
                    class="flex gap-2 justify-center items-center py-1 px-2 hover:text-white hover:bg-blue-500 rounded"
                >
                    <i class="fas fa-link"></i>Partager
                </div>
                <div
                    class="flex gap-2 justify-center items-center py-1 px-2 hover:text-white hover:bg-red-500 rounded"
                >
                    <i class="fas fa-xmark"></i>Supprimer
                </div>
            </div>
        </AppPopper>
    </div>
</template>

<script setup>
    import DocumentIcon from '@/components/Document/DocumentIcon.vue'
    import AppPopper from '@/components/App/AppPopper.vue'
    import { ref } from 'vue'

    defineProps({
        files: { type: Array, required: true },
        viewList: { type: Boolean, required: true },
    })

    defineEmits(['path', 'selectedFile'])

    const event = ref({})

    const seePopper = (e) => {
        event.value = e
    }
</script>
