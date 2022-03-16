import { defineStore } from 'pinia'

import _ from 'lodash';
import $axios from '../shared/config/axios.config'
import { onData, onItems } from '@/utils/store'

export const useFilesStore = defineStore('files', {
    state: () => ({
        filesList: [],
        fileTree: null,
    }),
    actions: {
        async getFileTree() {
            this.fileTree = {
                title: 'doc',
                context: 'origin',
                children: [],
            }
            const folderList=[
                {
                    title: 'info',
                    context: 'baseFolder',
                    endpoint: 'files/info-docs/categories',
                },
                {
                    title: 'study',
                    context: 'baseFolder',
                    endpoint: 'files/study-docs/categories',
                },
            ]

            await Promise.all(folderList.map(this.getFilePromise))
        },
        getFilePromise({ title, context, endpoint }) {
            return $axios.get(endpoint).then(onData((data) => this.fileTree.children.push({ title, context, children: data })))
        },

        async getFiles(path) {
            try {
                let treeFinder = await this.findInTree(path)
                if (treeFinder.children.length === 0) {
                    const listFinder = this.findInList(treeFinder.filter)
                    return typeof listFinder == 'undefined' ? await this.requestFiles(treeFinder.filter) : listFinder
                }
                return treeFinder.children
            } catch (e) {
                console.error('No such directory:', e)
            }
        },

        async requestFiles(filter) {
            const endpointList = { study: 'files/study-docs',info: 'files/info-docs' }
            return await $axios.get(endpointList[filter.baseFolder], { params: { ..._.omit(filter, 'baseFolder') , itemsPerPage: 1000 } })
            .then(onItems(this.applyFiles, { filter }))
        },

        applyFiles({ filter, items }) {
            this.filesList.push({ filter, items })
            return items
        },

        async findInTree(path) {
            if (this.fileTree === null) {
                await this.getFileTree()
            }
            let children = this.fileTree.children
            let filter = {}
            let result = null
            for (const pathPart of path.split('/')) {
                result = children.find(el => el.title === pathPart)
                if (typeof result === 'undefined') {
                    throw 'No such directory:', path.split('/')
                }
                filter[result.context]=result.title
                children = result.children
            }
            return { children, filter }
        },

        findInList(filter) {
            return this.filesList.find(el => el.filter === filter)
        },

        async getStudyDocList(query) {
            return await $axios
                .get('files/study-docs', { params: query, headers: { Accept: 'application/json' } })
                .then((res) => this.fileTree.push(res))
        },

        async getInfoDocList(query) {
            return await $axios
                .get('/files/info-docs', { params: query, headers: { Accept: 'application/json' } })
                .then((res) => this.fileTree.push(res))
        },

        async addStudyDoc(data) {
            return $axios
                .post('files/study-docs', data, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((res) => res.data)
        },

        async addInfoDoc(data) {
            return $axios
                .post('/files/info-docs', data, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((res) => res.data)
        },

        async downloadFile({ url, label }) {
            return $axios.get(url, { responseType: 'blob' }).then((response) => {
                const blob = new Blob([response.data])
                const link = document.createElement('a')
                link.href = URL.createObjectURL(blob)
                link.download = label
                link.click()
                URL.revokeObjectURL(link.href)
            })
        },
    },
    getters: {

    },
})
