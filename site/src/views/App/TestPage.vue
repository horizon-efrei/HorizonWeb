<template>
    <div class="m-10 text-4xl text-center text-red-500">
        Utilisez ce component pour preview facilement des components, faire des tests...
        <br />
        (MERCI DE NE PAS COMMIT DE MODIFICATIONS)
        <br />
        <br />
        @/views/TestPage.vue
        {{fileTree}}
    </div>
</template>


<script setup>
    import { useFilesStore } from '@/store/files.store'
    import { storeToRefs } from 'pinia'
    import { watch } from 'vue'

    const files = useFilesStore()
    console.warn(files.getFiles('study'))
    let { filesList,fileTree } = storeToRefs(files)

    watch(fileTree, (newVal) => {
        console.log(newVal)
    })
    //setTimeout(() => {files.getFiles('study/1/FH30')}, 2000)

</script>
