<template>
    <div>
        <div class="pb-2 mx-auto text-1">
            <div class="p-0 pb-6 rounded-b-none card">
                <div class="relative w-full h-48">
                    <div class="w-full h-full bg-blue-200" />
                    <div class="absolute -bottom-8 left-8">
                        <UserAvatar :img-src="club.avatar" size="4.5" :username="club.name" />
                    </div>
                </div>
                <div class="px-4 mt-8 w-full">
                    <div class="flex flex-col pr-8 mb-4 space-y-4">
                        <div>
                            <div class="flex">
                                <div class="text-2xl">{{ club.name }}</div>
                                <div class="my-auto ml-2 text-gray-500">
                                    {{ 'M2-F' }}
                                </div>
                                <!-- <router-link
                                    v-if="me.userId === user.userId"
                                    to="/me/profile"
                                    class="my-auto ml-8"
                                >
                                    <div
                                        class="flex items-center py-1.5 px-2 hover:bg-3-light hover:dark:bg-3-dark rounded"
                                    >
                                        <i class="fas fa-pen-alt" />
                                    </div>
                                </router-link> -->
                            </div>
                            <div>{{ club.description }}</div>
                        </div>
                        <!-- <div v-if="clubs != 0">
                            <div class="text-lg">Associations</div>
                            <div class="flex flex-wrap mt-2">
                                <div v-for="club in clubs.items" :key="club" class="flex mr-4 mb-4 h-16">
                                    <p v-if="club.club.avatar != null" class="my-auto w-16 h-16">
                                        <img
                                            :src="club.club.avatar"
                                            :alt="`${club.club.name} Logo`"
                                            class="rounded-full shadow-inner"
                                        />
                                    </p>
                                    <div class="ml-2 w-32">
                                        <div class="-mb-1 text-lg font-bold truncate last:text-clip">
                                            {{ club.club.name }}
                                        </div>
                                        <div class="-mb-1">
                                            {{ Object.keys(roles).find((role) => roles[role] === club.role) }}
                                        </div>
                                        <div class="text-sm truncate text-5">
                                            {{ club.roleLabel }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="flex flex-col md:flex-row">
            <div class="order-2 mt-0 mb-4 space-y-4 md:order-1 md:mr-4 md:ml-2 md:w-1/2 lg:w-2/3">
                <div class="flex flex-col grow space-y-4 card">
                    <div class="text-xl">Activité</div>
                    <div v-if="activities">
                        <ThreadPreviewCard
                            v-for="activity in activities"
                            :key="activity.index"
                            :post="activity"
                        />
                    </div>
                    <div v-else class="">Pas d'activité pour cet utilisateur</div>
                </div>
            </div>
            <div class="flex flex-col order-1 mb-4 space-y-2 md:order-2 md:w-1/2 lg:w-1/3">
                <div class="card">
                    Comptes
                    <div class="flex flex-col mt-2 space-y-2">
                        <div v-if="user.email" class="flex space-x-2">
                            <i class="fas fa-enveloppe" />
                            <div>{{ user.email }}</div>
                        </div>
                        <div v-if="contacts === undefined || contacts === null">
                            Problème dans les comptes des réseaux sociaux
                        </div>
                        <div v-for="contact in contacts" v-else :key="contact">
                            <div class="flex space-x-2">
                                <i class="fas" :class="`fa-${contact.contact.icon}`" />
                                <a :href="contact.link">{{ contact.pseudo }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script setup>
    // import ThreadPreviewCard from '@/components/App/Card/ThreadPreviewCard.vue'
    import UserAvatar from '@/components/User/UserAvatar.vue'
    import { useRoute } from 'vue-router'
    import { watch, ref, nextTick } from 'vue'
    import { useClubsStore } from '@/store/clubs.store'
    import { emitter } from '@/shared/modules/emitter'
    import { getStatus } from '@/utils/errors'

    const route = useRoute()
    const clubStore = useClubsStore()
    const club = ref(null)

    const loadClub = async () => {
        const clubId = route.params.clubId
        await clubStore
            .getClub(clubId)
            .then((res) => {
                club.value = res
                nextTick(() => {
                    if (route.hash) {
                        emitter.emit('scroll-to-anchor', route.hash)
                    }
                })
            })
            .catch((err) => {
                emitter.emit('error-route', { code: getStatus(err.response) })
            })
    }

    // const loadMe = async () => {
    //     await auth
    //         .getMe()
    //         .then((res) => {
    //             me.value = res
    //         })
    //         .catch((err) => {
    //             emitter.emit('error-route', { code: getStatus(err.response) })
    //         })
    // }

    // const roles = {
    //     'Président': 'president',
    //     'Vice-Président': 'vice-president',
    //     'Secretaire': 'secretary',
    //     'Trésorier': 'treasurer',
    //     'Manager': 'manager',
    //     'Membre': 'member',
    // }

    await loadClub()
    // await loadContacts()
    watch(() => route.params.clubId, loadClub)
</script>
