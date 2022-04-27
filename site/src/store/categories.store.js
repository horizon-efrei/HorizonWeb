import $axios from '@/shared/config/axios.config'
import { defineStore } from 'pinia'
import { onItems } from '@/utils/store'

export const useCategoriesStore = defineStore('categories', {
    state: () => ({
        categories: [],
    }),
    actions: {
        replaceCategories(categories, pageInfo) {
            if (categories.length) {
                this.categories = categories.map((categorie) => {
                    categorie.post.author.fullname =
                        categorie.post.author.firstname + ' ' + categorie.post.author.lastname
                    return categorie
                })
            }
            return { items: categories, pageInfo }
        },
        async getCategories(query) {
            return { items: [1, 2, 3, 4], pageInfo: { totalItemCount: 4, totalPages: 1 } }
        },
    },
})
