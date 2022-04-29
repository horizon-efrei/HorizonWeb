<template>
    <AppView>
        <div>
            <h3 class="pl-10 mb-8 text-4xl font-bold text-0">Liste des associations</h3>
            <!-- grid 3 columns for each clubs centered-->
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                <!-- <ClubCard v-for="club in clubs" :key="club.id" :club="club" /> -->
                <div v-for="club in clubList.items" :key="club">
                    <div
                        class="flex flex-col justify-between items-center pb-4 bg-white rounded-lg shadow-xl w-96text-black"
                    >
                        <div class="flex flex-col items-center w-full">
                            <div class="w-full h-20 bg-blue-200 rounded-t-lg"></div>
                            <div class="flex gap-4 px-4 mb-2 w-full">
                                <div class="-mt-8">
                                    <UserAvatar :img-src="club.avatar" size="4.5" :username="club.name" />
                                </div>
                                <div>
                                    <h3 class="text-lg font-bold text-black truncate">
                                        {{ club.name }}
                                    </h3>
                                    <p class="-mt-2 text-sm text-gray-400">57 membres</p>
                                </div>
                            </div>
                            <p class="px-4 h-24 text-sm text-justify line-clamp-4">{{ club.description }}</p>
                        </div>
                        <div class="flex gap-4 justify-center w-full">
                            <a
                                :href="`#/clubs/${club.clubId}`"
                                class="w-32 text-base text-center text-white bg-blue-500 rounded-md"
                            >
                                Plus d'infos
                            </a>
                            <button class="w-32 text-base text-center text-white bg-green-500 rounded-md">
                                Rejoindre
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppView>
</template>

<script setup>
    import AppView from '@/views/App/AppView.vue'
    import { useClubsStore } from '@/store/clubs.store'
    import { ref } from 'vue'
    import { emitter } from '@/shared/modules/emitter'
    import { getStatus } from '@/utils/errors'
    import UserAvatar from '@/components/User/UserAvatar.vue'
    console.log('hehe')
    const clubs = useClubsStore()
    const clubList = ref([])

    //load clubs
    const loadClubList = async () => {
        await clubs
            .getClubs()
            .then((res) => {
                console.log({ res })
                clubList.value = res
                console.log({ clubList })
            })
            .catch((err) => {
                emitter.emit('error-route', { code: getStatus(err.response) })
            })
    }

    await loadClubList()
</script>

<!-- <style lang="scss"></style> -->
