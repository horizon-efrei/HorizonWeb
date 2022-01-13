<template>
    {{ }}
    <div
        v-if="user===undefined || user===null || clubs === undefined || clubs === null || socials === undefined || socials === null "
        :class="$store.state.users "
    >
        Undefined
    </div>
    <div
        v-else
        class="px-8 py-4 text-2"
    >
        <h2 class="text-xl">
            Profil
        </h2>
        <p class="text-sm mb-6">
            Vos informations personnelles publiques
        </p>
        <div>
            <div>
                <div class="flex mb-4">
                    <div class="mr-6 w-full">
                        <div class="flex mb-4">
                            <div class="mr-2 w-1/2">
                                <label
                                    for="firstname"
                                    class="text-lg"
                                >Prénom</label>
                                <input
                                    id="firstname"
                                    v-model="user.username"
                                    type="text"
                                    name="firstname"
                                    class="w-full input bg-1"
                                >
                            </div>
                            <div class="ml-2 w-1/2">
                                <label
                                    for="lastname"
                                    class="text-lg"
                                >Nom</label>
                                <input
                                    id="lastname"
                                    v-model="user.username"
                                    type="text"
                                    name="lastname"
                                    class="w-full input bg-1 uppercase"
                                >
                            </div>
                        </div>
                        <div class="flex flex-col">
                            <label
                                for="description"
                                class="text-lg"
                            >Description</label>
                            <textarea
                                id="description"
                                name="description"
                                class="input"
                                :value="user.description"
                            />
                        </div>
                    </div>
                    <div class="flex-shrink-0">
                        <div class="relative">
                            <img
                                src="@/assets/img/default_avatars/user.png"
                                alt="img"
                                class="rounded-full h-48 w-48"
                            >
                            <i class="ri-camera-line text-2xl border rounded-full py-1 px-2 bg-2 border-color-2 absolute bottom-0 right-2" />
                        </div>
                    </div>
                </div>
                <div class="flex mb-4 space-x-4">
                    <div class="flex flex-col">
                        <label
                            for="parcours"
                            class="text-lg w-full"
                        >Parcours</label>
                        <SelectInput
                            v-model="parcours"
                            :choices="['Parcours Ingénieur','Parcours Expert (PEx)']"
                        />
                    </div>
                    <div class="flex flex-col">
                        <label
                            for="promo"
                            class="text-lg w-full"
                        >Promotion</label>
                        <SelectInput
                            v-model="promotion"
                            :choices="['L1','L2','L3','M1','M2']"
                        />
                    </div>
                    <div class="w-40">
                        <label
                            for="td"
                            class="text-lg"
                        >Groupe de TD</label>
                        <SelectInput
                            v-model="promotion"
                            :choices="['Int1','Int2','Int3','Int4','A','B','C','D','E','F','G','BN','BDX']"
                        />
                    </div>
                </div>
                <div class="mb-4">
                    <div class="text-lg">
                        Associations
                    </div>
                    <div
                        v-for="(club, idx) in userClubs"
                        :key="idx"
                        class="flex mb-2 items-center"
                    >
                        <div class="mr-2">
                            <SelectInput
                                v-model="userClubs[idx].club"
                                button-name="Association"
                                :choices="clubs.items.map(a=>a.name)"
                                :model-value="clubs.items.indexOf(clubs.items.find((a)=> a.clubId === club.club.clubId))"
                            />
                        </div>
                        <div class="ml-2">
                            <SelectInput
                                v-model="userClubs[idx].role"
                                button-name="Role"
                                :choices="roles"
                                :model-value="roles.indexOf(club.role)"
                            />
                        </div>
                        <button
                            v-if="idx ===userClubs.length-1"
                            class="text-1 text-xl red-500 h-8 w-8 my-auto"
                            @click="rmLineClub()"
                        >
                            <i class="ri-close-line" />
                        </button>
                    </div>
                    <button
                        class="button my-2"
                        @click="addLineClub()"
                    >
                        <p>Ajouter une Association</p>
                    </button>
                </div>
                <div class="mb-4 w-96">
                    <div class="text-lg">
                        Comptes Externes
                    </div>
                    <div
                        v-for="(social, idx) in socialsAccounts.items"
                        :key="idx"
                        class="flex mb-2 items-center"
                    >
                        <div class="flex">
                            <i
                                v-if="social.social.socialId!=null"
                                class="mr-2 my-auto"
                                :class="socials.items.find((a)=> a.socialId === social.social.socialId).icon"
                            />
                            <SelectInput
                                v-model="socialsAccounts.items[idx].social"
                                :choices="socials.items.map(sos=> sos.name)"
                                :model-value="socials.items.indexOf(socials.items.find((a)=> a.socialId === social.social.socialId))"
                            />
                        </div>
                        <div class="">
                            <input
                                v-model="social.pseudo"
                                class="input ml-2"
                                placeholder="Compte"
                            >
                            <button
                                v-if="idx === socialsAccounts.items.length-1"
                                class="text-1 text-xl red-500 h-8 w-8"
                                @click="rmLineAccount()"
                            >
                                <i class="ri-close-line" />
                            </button>
                        </div>
                    </div>
                    <button
                        class="
                            button
                            my-2"
                        @click="addLineAccount()"
                    >
                        <p>Ajouter un compte externe</p>
                    </button>
                </div>
                <button class="button mb-4">
                    <p>Enregistrer</p>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import SelectInput from '@/components/Input/SelectInput.vue'
import { watch } from 'vue';
export default {
    components: { SelectInput },
    data() {
        return {
            user:null,
            roles: ['Membre','President','Secretaire','Chef de Pôle'],
            parcours: null,
            promotion: null,
            group: null,
            userClubs:null,
            socialsAccounts:null
        };
    },
    computed: {
    },

    mounted(){
        this.user = this.$store.state.auth.user
        watch(
            () => this.$store.state.users.socialsAccounts,
            (newSocials) => {
                this.socialsAccounts = newSocials
            }
        )

        watch(
            () => this.$store.state.users.socials,
            (newSocials) => {
                this.socials = newSocials
            }
        )
        watch(
            () => this.$store.state.users.userClubs,
            (newClubs) => {
                this.userClubs = newClubs
            }
        )
        watch(
            () => this.$store.state.users.clubs,
            (newClubs) =>{
                this.clubs = newClubs
            }
        )
        watch(
            () => this.userClubs,
            (updClubs) => {
                for(let i= 0; i<updClubs.length;i++){
                    if(Number.isInteger(updClubs[i].role)){
                        updClubs[i].role = this.roles[updClubs[i].role]
                    }
                    if(Number.isInteger(updClubs[i].club)){
                        updClubs[i].club = {clubId:this.clubs.items[updClubs[i].club].clubId}
                    }
                }
                this.userClubs = updClubs
            },
            {deep: true}
        )
        watch(
            () => this.socialsAccounts,
            (updSocial) => {
                for(let i=0;i<updSocial.items.length; i++){
                    if(typeof(updSocial.items[i].social)==="number"){
                        updSocial.items[i].social = {socialId:this.socials.items[updSocial.items[i].social].socialId}
                    }

                    this.socialsAccounts = updSocial}
            },
            {deep: true}
        )

        this.$store.dispatch('users/getUserById',this.user.userId )
        this.$store.dispatch('users/getUserClubs', this.user.userId)
        this.$store.dispatch('users/getUserSocials',this.user.userId)
        this.$store.dispatch('users/getSocials')
        this.$store.dispatch('users/getClubs')
    },
    methods: {
        addLineClub: function addLineClub() {
            this.userClubs.push({role:null,club:{clubId:null}});
        },
        rmLineClub: function rmLineClub() {
            this.userClubs.pop();
        },
        addLineAccount: function addLineAccount() {
            this.socialsAccounts.items.push({social:{socialId:null},pseudo:null,link:null});
        },
        rmLineAccount: function rmLineAccount() {
            this.socialsAccounts.items.pop();
        },
        loadContent: async function loadContent() {

            console.log(this.clubs,this.user,this.userClubs)
        }
    }
}
</script>
