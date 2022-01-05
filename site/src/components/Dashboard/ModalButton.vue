<template>
    <div>
        <button
            class="button p-2 rounded-lg"
            @click.stop="openModal"
        >
            Show
        </button>

        <Dialog
            as="div"
            :open="isOpen"
            @close="closeModal"
        >
            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="min-h-screen px-4 text-center">
                    <ThreadPreview />
                    <DialogOverlay class="fixed inset-0" />
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script>
import { ref } from 'vue'
import {
    Dialog,
    DialogOverlay } from '@headlessui/vue'
import ThreadPreview from '@/components/Dashboard/ThreadPreview.vue'

export default {
    components: {
        Dialog,
        DialogOverlay,
        ThreadPreview
    },
    setup() {
        const isOpen = ref(false)
        return {
            isOpen,
            closeModal() {
                isOpen.value = false
            },
            openModal() {
                console.log('Hellooooo')
                isOpen.value = true
            },
        }}
}
</script>
