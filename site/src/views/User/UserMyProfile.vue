<template>
    <div class="m-0 text-2">
        <div class="m-0 absolute py-12 hero h-52 w-full top-0 left-0">
            <h3
                class="text-4xl font-bold mb-8 text-0"
                style="padding-left: 5%; padding-right: 5%"
            >
                Paramètres
            </h3>
        </div>

        <div class="min-h-20 relative mt-32 mb-10 text-0 md:w-9/12 sm:rounded-lg p-0 bg-1 w-full mx-auto">
            <div class="mt-2 flex-shrink-0">
                <ul class="py-2 flex">
                    <template
                        v-for="link of links"
                        :key="link"
                    >
                        <li
                            class="h-12 py-2 pl-8 flex w-full gap-2 items-center bg-mouse-brand cursor-pointer hover:text-blue-500"
                            :class="currentComponent === link.component ? 'text-blue-500' : ''"
                            @click="currentComponent = link.component"
                        >
                            <i
                                class="ri-xl"
                                :class="link.icon"
                            />
                            <span class="hidden lg:block">{{ link.text }}</span>
                        </li>
                    </template>
                </ul>
            </div>

            <div class=" border-t-2 border-color-2-alt w-full">
                <component :is="currentComponent" />
            </div>
        </div>
    </div>
</template>

<script lang="js">
import Profile from '@/components/User/MyProfile/ProfileModal.vue'
import BadgeSettings from '@/components/User/MyProfile/ProfileBadges.vue'
import ExternalAccount from '@/components/User/MyProfile/ProfileSocials.vue'
import ProfileClub from '@/components/User/MyProfile/ProfileClubs.vue'
import AccessibilitySettings from '@/components/User/MyProfile/ProfileSettings.vue'
// import AppLoader from '@/components/App/AppLoader.vue'
export default {
    components: {
        Profile,
        BadgeSettings,
        ExternalAccount,
        ProfileClub,
        // AppLoader
    },
    inheritAttrs: false,
    data () {
        return {
            currentComponent: 'Profile',
            links: [
                { text: 'Profil', icon: 'ri-profile-line', component: 'Profile' },
                { text: 'Discord', icon: 'ri-discord-fill', component: 'Settings' },
                { text: 'Associations', icon: 'ri-team-fill', component: 'ProfileClub' },

                { text: 'Badges', icon: 'ri-medal-line', component: BadgeSettings },
                { text: 'Accessibilité', icon: 'ri-hand-heart-fill', component: AccessibilitySettings }
                // TODO: { text: "Rôles Ef'Réussite", icon: 'ri-book-mark-line', component: 'Roles' }
            ],
            accounts : [
                { name:'Mail', icon: 'ri-mail-line'},
                { name:'LinkedIn', icon: 'ri-linkedin-fill'},
                { name:'Discord', icon: 'ri-discord-fill'},
                { name:'Instagram', icon: 'ri-instagram-fill'},
                { name:'GitHub', icon: 'ri-github-fill'},
            ]
        }
    }
}
</script>

<style lang="scss">

.height {
  min-height: 24rem;
}

</style>
