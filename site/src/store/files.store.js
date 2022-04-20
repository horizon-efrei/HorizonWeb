import { defineStore } from 'pinia'

import _ from 'lodash'
import $axios from '../shared/config/axios.config'
import { onData, onItems } from '@/utils/store'

export const useFilesStore = defineStore('files', {
    state: () => ({
        filesList: [],
        fileTree: {
            group: 'doc',
            context: 'origin',
            children: [],
        },
    }),
    actions: {
        async getFileTree(
            studyOrder = ['schoolYear', 'subject', 'type', 'year'],
            infoOrder = ['year', 'schoolYear'],
        ) {
            const folderList = [
                {
                    group: 'info',
                    context: 'baseFolder',
                    endpoint: 'files/info-docs/categories',
                    order: infoOrder,
                },
                {
                    group: 'study',
                    context: 'baseFolder',
                    endpoint: 'files/study-docs/categories',
                    order: studyOrder,
                },
            ]

            await Promise.all(folderList.map(this.getFileTreePromise))
        },

        getFileTreePromise({ group, context, endpoint, order }) {
            return $axios.get(endpoint, { params: { categories: order.join(',') } }).then(
                onData((data) =>
                    this.fileTree.children.push({
                        group,
                        context,
                        children: data.children,
                        files: data.files,
                    }),
                ),
            )
        },

        async getFiles(path) {
            try {
                let treeFinder = await this.findInTree(path)
                if (treeFinder.children.length === 0) {
                    if (typeof treeFinder.fileId == 'undefined') {
                        return { files: await this.requestFiles(treeFinder.filter, path) }
                    }
                    return { files: this.filesList[treeFinder.fileId] }
                } else if (typeof treeFinder.files != 'undefined') {
                    return { files: await this.requestFilesById, folder: treeFinder.children }
                }
                return { folder: treeFinder.children }
            } catch (e) {
                console.warn(this.fileTree)
                console.error('No such directory', e)
            }
        },

        async requestFiles(filter, path) {
            const endpointList = { study: 'files/study-docs', info: 'files/info-docs' }
            return await $axios
                .get(endpointList[filter.baseFolder], {
                    params: { ..._.omit(filter, 'baseFolder'), itemsPerPage: 1000 },
                })
                .then(onItems(this.applyFiles, { path }))
        },

        async requestFilesById(fileId) {
            return 'oui'
        },

        applyFiles({ path, items }) {
            this.addIdInTree(path, this.filesList.length)
            this.filesList[this.filesList.length] = items
            return items
        },

        addIdInTree(path, id) {
            let result,
                children = this.fileTree.children
            for (const pathPart of path) {
                result = children.find((el) => el.group === pathPart)
                children = result.children
            }
            result.fileId = id
        },

        async findInTree(path) {
            if (this.fileTree.children.length === 0) {
                await this.getFileTree()
            }
            let children = this.fileTree.children
            let filter = {},
                result = null,
                fileId,
                files
            for (const pathPart of path) {
                result = children.find((el) => el.group === pathPart)
                if (typeof result === 'undefined') {
                    throw { path, pathPart }
                }
                filter[result.context] = result.group
                children = result.children
                fileId = result?.fileId
                files = result?.files
            }
            return { children, filter, fileId, files }
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
    getters: {},
})
