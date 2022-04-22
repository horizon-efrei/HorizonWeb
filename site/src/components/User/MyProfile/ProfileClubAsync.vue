<template>
    <!-- TODO: Refactor all my-auto -->
    <div class="text-2">
        <div class="flex h-12 border-b-2 border-color-2-alt">
            <button
                v-if="userClubsPresident().length"
                class="flex px-4 my-auto w-1/2"
                @click="changeSelectedComponent(1)"
            >
                <div class="flex mx-auto">
                    <font-awesome-icon
                        :icon="componentSelected === 1 ? 'user-friends' : ['far', 'user-friends']"
                        :class="{ 'text-blue-500': componentSelected == 1 }"
                        size="lg"
                    />
                    <p
                        class="hidden my-auto ml-4 text-lg sm:block"
                        :class="{ 'text-blue-500': componentSelected == 1 }"
                    >
                        Tes associations
                    </p>
                </div>
            </button>
            <button class="flex my-auto w-1/2" @click="changeSelectedComponent(2)">
                <div class="flex mx-auto">
                    <font-awesome-icon
                        icon="tools"
                        :class="{ 'text-blue-500': componentSelected == 2 }"
                        class="my-auto text-lg"
                    />
                    <p
                        class="hidden my-auto ml-4 text-lg sm:block"
                        :class="{ 'text-blue-500': componentSelected == 2 }"
                    >
                        Gestion de son association
                    </p>
                </div>
            </button>
        </div>
        <!-- Gestion de ses assos (Général pour tout le monde) -->
        <div v-if="componentSelected === 1" class="p-4 sm:px-8">
            <div class="flex flex-col">
                <div class="mb-2">
                    <div id="userClubs">
                        <div class="flex">
                            <h1 class="text-lg">Tes associations</h1>
                            <a class="flex gap-2 my-auto ml-4 text-sm text-blue-500" href="#join">
                                <font-awesome-icon class="my-auto" icon="plus" />
                                <div class="my-auto">Rejoindre une association</div>
                            </a>
                        </div>
                        <div v-if="clubs.items.length === 0" class="mb-8">
                            Vous n'avez pas encore rejoint d'Association
                        </div>
                        <div v-else class="flex">
                            <!-- {{ clubs }} -->
                            <div class="flex flex-col">
                                <div
                                    v-for="(club, idx) in clubs.items"
                                    :key="idx"
                                    class="flex items-center my-2 h-8"
                                >
                                    <div class="flex mr-2">
                                        <img
                                            v-if="club.club.clubId != null"
                                            class="my-auto w-8 h-8 rounded-full"
                                            :src="club.club.avatar"
                                        />
                                        <div class="my-auto ml-2">
                                            {{ club.club.name }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col">
                                <div
                                    v-for="(club, idx) in clubs.items"
                                    :key="idx"
                                    class="flex items-center my-2 h-8"
                                >
                                    <div class="ml-2">
                                        {{ Object.keys(roles).find((role) => roles[role] === club.role) }}
                                    </div>
                                    <button
                                        class="flex my-auto ml-4 text-red-500 text-1 text-md"
                                        @click="leaveClub(club.club.clubId)"
                                    >
                                        <font-awesome-icon icon="times" class="my-auto text-red-500" />
                                        <p class="my-auto text-sm text-red-500">Quitter</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="join">
                        <div>
                            <div class="flex">
                                <h1 class="text-lg">Associations proposées</h1>
                                <a class="flex gap-2 my-auto ml-4 text-sm text-blue-500" href="#userClubs">
                                    <font-awesome-icon class="my-auto" icon="plus" />
                                    <div class="my-auto">Voir tes associations</div>
                                </a>
                            </div>
                            <p class="text-sm">
                                Vous pouvez rejoindre une association en cliquant sur le bouton "Rejoindre une
                                association"
                            </p>
                        </div>
                        <ul v-for="club in clubList.items" :key="club" class="flex flex-col">
                            <!-- {{
                                club
                            }} -->
                            <li class="flex gap-2 pr-2 w-full h-10 even:bg-gray-100">
                                <img
                                    v-if="club.clubId != null"
                                    class="my-auto w-8 h-8 rounded-full"
                                    :src="club.avatar"
                                />
                                <div class="my-auto truncate w-50">
                                    {{ club.name }}
                                </div>
                                <div class="flex gap-1 my-auto w-6 text-sm">
                                    <p class="my-auto">{{ club.members ? club.members.length : 1 }}</p>
                                    <i class="my-auto fas fa-user"></i>
                                </div>
                                <button class="w-fit text-sm text-blue-500">
                                    <p>Demander à rejoindre</p>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Gestion des assos (pres/ vice pres) -->
        <div v-if="componentSelected === 2 && userClubsPresident().length >= 1">
            <div class="">
                <!-- <div
                    v-if="userClubsPresident().length >= 1"
                    class="flex flex-col p-2 w-1/6 border-r-2 border-color-4-alt"
                >
                    <div v-for="club in userClubsPresident()" :key="club" class="mb-8">
                        <button class="flex text-left" @click="changeSelectedClub(club)">
                            <img
                                :src="club.club.avatar"
                                :alt="`${club.club.name} icon`"
                                class="my-auto w-8 h-8 rounded-full"
                            />
                            <div
                                class="hidden my-auto ml-2 md:block"
                                :class="club.club.clubId === clubSelected.club.clubId ? 'text-blue-500' : ''"
                            >
                                {{ club.club.name }}
                            </div>
                        </button>
                    </div>
                </div> -->
                <div class="p-4 w-full sm:px-8">
                    <div class="flex gap-2 items-center mb-8">
                        <h2 class="text-xl">Gestion de votre Association :</h2>
                        <div v-if="userClubsPresident().length > 1">
                            <SelectInput
                                v-model="clubSelected"
                                :choices="userClubsPresident().map((a) => a.club.name)"
                                :model-value="
                                    userClubsPresident().findIndex(
                                        (a) => clubSelected.club.clubId === a.club.clubId,
                                    )
                                "
                            />
                        </div>
                        <div v-else>
                            {{ clubSelected.club.name }}
                        </div>
                    </div>
                    <h3 class="mb-8 text-lg">Informations de l'association</h3>
                    <div class="flex mb-4">
                        <div class="flex mr-6 w-full">
                            <div class="flex flex-col mr-8 mb-4 w-fit">
                                <div class="relative mx-auto mb-2">
                                    <UserAvatar
                                        :img-src="clubSelected.club.avatar"
                                        :alt="clubSelected.club.name + ' icon'"
                                        :size="5"
                                    />
                                    <button
                                        class="hidden absolute right-4 bottom-0 md:block"
                                        @click="showImage()"
                                    >
                                        <i
                                            class="absolute -bottom-2 px-1 text-lg rounded-full border fa fa-camera bg-2 border-color-2"
                                        />
                                    </button>
                                </div>
                                <div class="flex justify-between mx-auto">
                                    <div class="mr-2 w-full capitalize whitespace-nowrap bg-1">
                                        {{ clubSelected.club.name }}
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col w-full">
                                <label for="description" class="text-lg">Description</label>
                                <textarea
                                    v-model="clubSelected.club.description"
                                    name="description"
                                    class="resize-none input"
                                    rows="5"
                                />
                            </div>
                        </div>
                    </div>

                    <AvatarCropper
                        v-model="avatarShown"
                        field="file"
                        img-format="jpg"
                        :url="`${apiUrl}files/profile-images`"
                        lang-type="fr"
                        :with-credentials="true"
                    />

                    <div>
                        <h3 class="mb-4 text-lg">Liste des Membres</h3>
                        <!-- <div v-if="clubMembers != undefined && clubMembers != null">
                            <ul>
                                <li v-for="member in clubMembers" :key="member" class="flex gap-4">
                                    <UserAvatar
                                        :src="member.user.avatar"
                                        :alt="`${member.user.fullname}'s' avatar`"
                                        size="8"
                                        class="my-auto"
                                    />
                                    <router-link
                                        class="my-auto hover:underline"
                                        :to="`/users/${member.user.userId}`"
                                    >
                                        {{ member.user.fullname }} {{ member.user.fullname.toUpperCase() }}
                                    </router-link>

                                    <SelectInput
                                        v-model="member.role"
                                        max-content-width="true"
                                        :choices="Object.keys(roles)"
                                        :model-value="
                                            Object.keys(roles).indexOf(
                                                Object.keys(roles).find(
                                                    (role) => roles[role] === member.role,
                                                ),
                                            )
                                        "
                                    />

                                    <button
                                        class="flex my-auto text-red-500 text-1 text-md"
                                        @click="kickUser(member.user.userId)"
                                    >
                                        <font-awesome-icon icon="times" class="my-auto text-red-500" />
                                        <p class="my-auto text-sm text-red-500">Virer</p>
                                    </button>
                                </li>
                            </ul>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import SelectInput from '@/components/Input/SelectInput.vue'
    import AvatarCropper from '@/components/User/AvatarCropper/AvatarCropper.vue'
    import UserAvatar from '@/components/User/UserAvatar.vue'
    import { emitter } from '@/shared/modules/emitter'
    import { useAuthStore } from '@/store/auth.store'
    import { useProfilesStore } from '@/store/profile.store'
    import { getStatus } from '@/utils/errors'
    import { ref, watch } from 'vue'

    // import _ from 'lodash'
    // import { watch } from 'vue'
    const apiUrl = import.meta.env.VITE_API_URL
    const auth = useAuthStore()
    const profile = useProfilesStore()
    const clubs = ref([])
    const me = ref(null)
    const componentSelected = ref(1)
    // const addingClub = ref(null)
    const clubList = ref([])
    const clubSelected = ref(null)
    const avatarShown = ref(false)

    const userClubsPresident = () => clubs.value.items.filter((club) => club.role === 'president')
    const changeSelectedClub = (club) => {
        clubSelected.value = userClubsPresident()[club]
    }
    const showImage = () => {
        avatarShown.value = !avatarShown.value
    }

    const roles = {
        'Président': 'president',
        'Vice-Président': 'vice-president',
        'Secretaire': 'secretary',
        'Trésorier': 'treasurer',
        'Manager': 'manager',
        'Membre': 'member',
    }

    const changeSelectedComponent = (numb) => {
        componentSelected.value = numb
    }

    const loadMe = async () => {
        await auth
            .getMe()
            .then((res) => {
                me.value = res
            })
            .catch((err) => {
                emitter.emit('error-route', { code: getStatus(err.response) })
            })
    }

    const loadClubs = async () => {
        const userId = me.value.userId
        await profile
            .getClubs(userId)
            .then((res) => {
                clubs.value = res
                clubSelected.value = userClubsPresident()[0]
            })
            .catch((err) => {
                emitter.emit('error-route', { code: getStatus(err.response) })
            })
    }

    const loadClubList = async () => {
        await profile
            .getClubsList()
            .then((res) => {
                clubList.value = res
            })
            .catch((err) => {
                emitter.emit('error-route', { code: getStatus(err.response) })
            })
    }

    //TODO leaveClub

    await loadMe()
    await loadClubs()
    await loadClubList()
    watch(clubSelected, () => {
        if (Number.isInteger(clubSelected.value)) {
            changeSelectedClub(clubSelected.value)
        }
    })
    // export default {
    //     data() {
    //         return {
    //             user: this.$store.state.auth.user,
    //             userClubs: this.$store.state.user.clubs,
    //             clubSelected: null,
    //             componentSelected: 1,
    //             clubImageShown: false,
    //             clubMembers: null,
    //             showAddForm: false,
    //             addingClub: null,
    //             submitSuccessNewMember: 0,
    //         }
    //     },
    //     computed: {
    //         clubs() {
    //             return this.$store.state.user.enumClubs
    //         },
    //         userClubsPresident() {
    //             return this.userClubs.filter((club) => club.role === 'president')
    //         },
    //         clubsLoaded() {
    //             return this.$store.state.user.clubsLoaded
    //         },
    //     },
    //     mounted() {
    //         if (this.user != null && this.user != undefined) {
    //             this.$store.dispatch('user/getClubs')
    //         }
    //     },
    //     methods: {
    //         showImage: function showImage() {
    //             if (this.clubImageShown) {
    //                 this.clubImageShown = false
    //             } else {
    //                 this.clubImageShown = true
    //             }
    //         },
    //         changeSelectedClub: function changeSelect(club) {
    //             this.clubSelected = club
    //         },
    //         changeSelectedComponent: function changeSelectedComponent(component) {
    //             this.componentSelected = component
    //         },
    //         addLineClub: function addLineClub() {
    //             this.userClubs.push({
    //                 role: null,
    //                 club: { clubId: null },
    //             })
    //         },
    //         toggleShowAddForm: function toggleShowAddForm() {
    //             this.showAddForm = !this.showAddForm
    //         },
    //         signUp: function signUp() {
    //             this.submitSuccessNewMember = 0
    //             this.$store
    //                 .dispatch('user/addClubMember', {
    //                     clubId: this.clubs[this.addingClub].clubId,
    //                     userId: this.user.userId,
    //                 })
    //                 .then(() => {
    //                     this.submitSuccessNewMember = 1
    //                     this.addingClub = null
    //                 })
    //                 .catch(() => {
    //                     this.submitSuccessNewMember = -1
    //                 })
    //         },
    //         kickUser: function kickUser(memberId) {
    //             this.$store.dispatch('user/deleteClubMember', {
    //                 clubId: this.clubSelected.club.clubId,
    //                 userId: memberId,
    //             })
    //         },
    //         leaveClub: function leaveClub(clubId) {
    //             this.$store.dispatch('user/deleteClubMember', {
    //                 clubId,
    //                 userId: this.user.userId,
    //             })
    //         },
    //     },
    // }
</script>
