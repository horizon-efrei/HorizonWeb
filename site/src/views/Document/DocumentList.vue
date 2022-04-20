<template>
    <div class="flex overflow-y-scroll flex-col gap-4 my-4 mx-auto w-23/24 h-full card">
        <!-- <AppModal :show="filePreview != null" @close="filePreview = null">
                <div class="flex gap-2 card">
                    <div class="flex justify-center items-center">
                        <DocumentIcon
                            class="w-32 h-32"
                            :mime="filePreview.file.mimeType"
                            :file-name="filePreview.file.name"
                        />
                    </div>
                    <div class="">
                        <div class="text-xl font-bold">
                            {{ filePreview.file.name }}
                        </div>
                        <div class="text-sm">
                            {{ new Date(filePreview.createdAt).toLocaleDateString() }}
                        </div>
                        <div class="text-sm">
                            {{ formatBytes(filePreview.file.fileSize) }}
                        </div>
                    </div>
                </div>
            </AppModal> -->
        <div class="flex gap-4">
            <RadioInput
                v-model="viewList"
                class="shrink-0"
                :choices="[
                    { key: true, icon: 'fa-list' },
                    { key: false, icon: 'fa-th' },
                ]"
            ></RadioInput>

            <input class="grow py-2 px-4 rounded-full bg-2" type="text" placeholder="Rechercher un fichier" />
            <div class="flex gap-2 items-center">
                <i class="fas fa-cog" />
            </div>
        </div>
        <div class="flex">
            <div class="hidden shrink-0 w-5/24 md:block">
                <FolderTree v-if="files?.fileTree" :="files.fileTree" @path="path = $event" />
            </div>
            <div class="flex flex-col gap-4 grow">
                <div class="flex gap-2">
                    <div
                        v-for="(pathPart, i) in path"
                        :key="i"
                        class="cursor-pointer"
                        @click="path = path.slice(0, i + 1)"
                    >
                        {{ pathPart }}
                        <i v-if="i != path.length - 1" class="fas fa-chevron-right"></i>
                    </div>
                </div>
                <div v-if="filesList?.folder" class="grid grid-cols-2 gap-2 md:grid-cols-4">
                    <div
                        v-for="(folder, i) in filesList.folder"
                        :key="i"
                        class="flex gap-4 items-center p-2 px-4 truncate rounded border border-gray-400 cursor-pointer"
                        @click="path.push(folder.group)"
                    >
                        <i class="fas fa-folder"></i>
                        {{ folder.name ? folder.name : folder.group }}
                    </div>
                </div>
                <FileList v-if="filesList.files" :files="filesList.files" :view-list="viewList"></FileList>
                <!-- <div>{{ path }}</div>
                <div>{{ filesList.files }}</div> -->
            </div>
            <!-- <div class="w-5/24 shrink-0">dsqdsq</div> -->
        </div>

        <!-- <div class="flex flex-col grow gap-4 h-full card">
                <div class="flex justify-between">
                    <div>
                        <Popper placement="left">
                            <i class="fas fa-sliders-h" />
                            <template #content>
                                <div class="flex flex-col gap-2 card">
                                    <div>Ordre des dossiers</div>
                                    <div class="flex gap-1 items-center">
                                        <div
                                            v-for="(filter, i) in filterList"
                                            :key="i"
                                            class="flex gap-1 items-center"
                                        >
                                            <div>
                                                {{ filter }}
                                            </div>
                                            <i
                                                v-if="i != filterList.length - 1"
                                                class="text-xs fas fa-chevron-right"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </Popper>
                    </div>
                    <div @click="showFilePreview = !showFilePreview">
                        <i class="fas fa-info" />
                    </div>
                </div>
                <div class="flex gap-4 justify-center">
                    <div class="flex cursor-pointer">
                        <div
                            class="flex justify-center items-center pr-3 pl-4 rounded-l-full transition raised"
                            :class="[docStyleList ? 'bg-2' : '']"
                            @click="docStyleList = true"
                        >
                            <i class="fas fa-list" />
                        </div>

                        <div
                            class="flex justify-center items-center pr-4 pl-3 rounded-r-full transition raised"
                            :class="{ 'bg-2': !docStyleList }"
                            @click="docStyleList = false"
                        >
                            <i class="fas fa-th" />
                        </div>
                    </div>
                    <input
                        class="grow py-2 px-4 rounded-full bg-2"
                        type="text"
                        placeholder="Rechercher un fichier"
                    />
                    <div class="flex gap-2 items-center">
                        <i
                            class="fas fa-download"
                            :class="[filePreview ? 'text-blue-500 cursor-pointer' : '']"
                            @click="
                                $store.dispatch('files/downloadFile', {
                                    url: filePreview.file.url,
                                    label: filePreview.file.name,
                                })
                            "
                        />
                    </div>
                </div>
                <div>
                    <FileListPreview
                        v-model:folderList="folder"
                        v-model:filePreview="filePreview"
                        v-model:downloadFileGroup="fileGroup"
                        :file-list="fileList"
                        :preview-by-table="docStyleList"
                    ></FileListPreview>
                </div>
            </div>
            <div
                v-if="(filePreview && showFilePreview) || fileGroup.length != 0"
                class="hidden relative w-1/5 md:block"
            >
                <div class="sticky top-4">
                    <div class="flex flex-col gap-2">
                        <div v-if="filePreview && showFilePreview" class="hidden md:block card">
                            <div class="flex flex-col gap-2 divide-y">
                                <div class="flex justify-center items-center">
                                    <DocumentIcon
                                        class="w-24 h-24"
                                        :mime="filePreview.file.mimeType"
                                        :file-name="filePreview.file.name"
                                    />
                                </div>
                                <div class="text-center">
                                    <div class="text-lg font-bold truncate">
                                        {{ filePreview.file.name }}
                                    </div>
                                    <div class="text-sm">
                                        {{ new Date(filePreview.createdAt).toLocaleDateString() }}
                                    </div>
                                    <div class="text-sm">
                                        {{ formatBytes(filePreview.file.fileSize) }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="fileGroup.length > 0" class="card">
                            <div class="flex flex-col gap-2">
                                <div class="font-bold">
                                    {{ fileGroup.length }} fichier{{ fileGroup.length > 1 ? 's' : '' }}
                                </div>
                                <div v-for="(file, i) in fileGroup" :key="i" class="flex justify-between">
                                    <div class="truncate">
                                        {{ file.file.name }}
                                    </div>
                                    <div class="cursor-pointer" @click.prevent="updateFileGroup(file)">
                                        <i class="text-red-500 fas fa-times" />
                                    </div>
                                </div>
                                <div class="flex gap-2 justify-center items-center mt-2 w-full">
                                    <div class="text-center button" @click="downloadFileGroup">
                                        <div class="flex gap-2 justify-center items-center">
                                            <i class="fas fa-arrow-down" />
                                            <div>Télécharger</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
    </div>
</template>

<script setup>
    import FolderTree from '@/components/Document/FolderTree.vue'
    import RadioInput from '@/components/Input/RadioInput.vue'
    import FileList from '@/components/Document/FileList.vue'
    import { useFilesStore } from '@/store/files.store'
    import { ref, watchEffect } from 'vue'

    const files = useFilesStore()

    const path = ref(['doc'])
    const viewList = ref(true)
    const filesList = ref([])

    watchEffect(async () => {
        const newPath = [...path.value]
        newPath.shift()
        filesList.value = await files.getFiles(newPath)
    })

    // export default {
    //     components: {
    //         FileFolder,
    //         FileListPreview,
    //         AppModal,
    //         DocumentIcon,
    //         Popper,
    //     },
    //     data() {
    //         return {
    //             fileIcon,
    //             docStyleList: true,
    //             filePreview: null,
    //             showFilePreview: false,
    //             fileGroup: [],
    //             folder: {
    //                 filters: {},
    //                 children: [],
    //             },
    //             filterList: ['Promotion', 'Matière', 'Cursus', 'Année'],
    //             fileList: [],
    //             formatBytes,
    //             Date,
    //         }
    //     },
    //     computed: {
    //         infoDocFileTree() {
    //             return this.$store.state.files.infoDocFileTree
    //         },
    //         studyDocFileTree() {
    //             return this.$store.state.files.studyDocFileTree
    //         },
    //     },
    //     watch: {
    //         folder: {
    //             handler({ filters }) {
    //                 if (
    //                     filters?.query == 'StudyDocs' &&
    //                     _.difference(['query', 'type', 'year', 'schoolYear', 'subject'], Object.keys(filters))
    //                         .length == 0
    //                 ) {
    //                     this.$store
    //                         .dispatch('files/newSearchStudyDocs', _.omit(filters, ['query']))
    //                         .then((val) => {
    //                             this.fileList = val
    //                         })
    //                 } else if (
    //                     filters?.query == 'InfoDocs' &&
    //                     _.difference(['query', 'year', 'schoolYear'], Object.keys(filters)).length == 0
    //                 ) {
    //                     this.$store
    //                         .dispatch('files/newSearchInfoDocs', _.omit(filters, ['query']))
    //                         .then((val) => {
    //                             this.fileList = val
    //                         })
    //                 } else {
    //                     this.fileList = []
    //                 }
    //             },
    //             deep: true,
    //         },
    //     },
    //     mounted() {
    //         this.$store.dispatch('files/getStudyDocTree').then(() => {
    //             if (this.studyDocFileTree.length > 0) {
    //                 this.folder.children.push({
    //                     context: 'query',
    //                     title: 'StudyDocs',
    //                     children: this.studyDocFileTree,
    //                     parent: null,
    //                 })
    //             }
    //         })
    //         this.$store.dispatch('files/getInfoDocTree').then(() => {
    //             if (this.infoDocFileTree.length > 0) {
    //                 this.folder.children.push({
    //                     context: 'query',
    //                     title: 'InfoDocs',
    //                     children: this.infoDocFileTree,
    //                     parent: null,
    //                 })
    //             }
    //         })
    //     },
    //     methods: {
    //         seeDropdown() {
    //             this.showDropDownFileCard = true
    //         },
    //         updateFileGroup(file) {
    //             if (this.fileGroup.includes(file)) {
    //                 this.fileGroup = this.fileGroup.filter((f) => f != file)
    //             } else {
    //                 this.fileGroup.push(file)
    //             }
    //         },
    //         downloadFileGroup() {
    //             for (const el of this.fileGroup) {
    //                 this.$store.dispatch('files/downloadFile', {
    //                     url: el.file.url,
    //                     label: el.file.name,
    //                 })
    //             }
    //             this.fileGroup = []
    //         },
    //     },
    // }
</script>
