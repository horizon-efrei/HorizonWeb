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
            const finder = await this.findInTree(path)
            if (finder !== null) {
                const { children, filter } = finder
                console.log(filter, children)
                if (children.length !== 0) {
                    console.log()
                }
            }
            return null
        },

        async requestFiles(filter) {
            const endpointList = { study: 'files/study-docs',info: 'files/info-docs' }
            return await $axios.get(endpointList[filter.baseFolder], { params: _.omit(filter, 'baseFolder') }).then(onItems(this.applyFiles))
        },
        applyFiles() {

        },

        async findInTree(path) {
            if (this.fileTree === null) {
                await this.getFileTree()
            }

            console.log(this.fileTree.children, [...this.fileTree.children])
            let children = this.fileTree.children
            console.log(children)
            let filter = {}
            let result = null
            for (const pathPart of path.split('/')) {
                result = children.find(el => el.title === pathPart)
                if (result === undefined) {
                    console.error('No such directory:', path.split('/'))
                    return null
                }
                filter[result.context]=result.title
                children = result.children
            }
            return { children, filter }
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
