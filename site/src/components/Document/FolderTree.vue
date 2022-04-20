<template>
    <div
        class="flex gap-2 items-center p-1 w-full hover:bg-2-light hover:dark:bg-2-dark rounded cursor-pointer"
        @click="$emit('path', [group]), (showChildren = !showChildren)"
    >
        <i
            class="w-1/24 fas text-1"
            :class="[
                children.length == 0 ? 'invisible' : '',
                showChildren ? 'fa-chevron-down' : 'fa-chevron-right',
            ]"
        />
        <i class="text-1 fas fa-folder" />

        <div>
            {{ contextList[context] }}
        </div>
    </div>
    <div v-if="children.length" class="flex flex-col px-1 ml-2" :class="{ 'hidden': !showChildren }">
        <FolderTree
            v-for="(child, i) in children"
            :key="i"
            :group="child.group"
            :context="child.context"
            :children="child.children"
            @path="sendPath($event)"
        />
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    const props = defineProps({
        group: { type: String, required: true },
        context: { type: String, required: true },
        children: { type: Array, required: true },
    })

    const emit = defineEmits(['path'])

    const contextList = {
        schoolYear: props.group,
        subject: props.group,
        type: {
            'examDE': 'DE',
            'examCE': 'CE',
            'examCC': 'CC',
            'examDM': 'DM',
            'course': 'Cours',
            'sheet': 'sheet',
            'projects': 'Projet',
            'efreiClass': 'Cours EFRE',
            'eprofClass': "Cours Ef'Reussite",
            'classNote': 'Note de cours',
            'other': 'Autre',
        }[props.group],
        year: props.group,
        origin: '/',
        baseFolder: props.group,
    }

    function sendPath(event) {
        event.unshift(props.group)
        emit('path', event)
    }

    let showChildren = ref(false)

    // export default {
    //     props: {
    //         title: {
    //             type: String,
    //             required: true,
    //         },
    //         context: {
    //             type: String,
    //             required: true,
    //         },
    //         children: {
    //             type: Array,
    //             default() {
    //                 return []
    //             },
    //         },
    //     },
    //     emits: ['path'],
    //     data() {
    //         return {
    //             showChildren: false,
    //             contextList: {
    //                 schoolYear: (val) => ['L1', 'L2', 'L3', 'M1', 'M2'][val],
    //                 subject: (val) => val,
    //                 type: (val) => val,
    //                 year: (val) => val,
    //                 query: (val) => val,
    //             },
    //         }
    //     },
    //     methods: {
    //         toggleChildren() {
    //             if (this.children.length > 0) {
    //                 this.showChildren = !this.showChildren
    //             }
    //         },
    //         sendObject(data) {
    //             data.filters[this.context] = this.title
    //             return data
    //         },
    //         emitPath() {
    //             this.$emit('path', {
    //                 filters: { [this.context]: this.title },
    //                 children: this.children,
    //             })
    //         },
    //     },
    // }
</script>
