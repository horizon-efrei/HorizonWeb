<template>
    <div class="">Jambonneau</div>
    <div class="mb-4">
        <div class="flex">
            <div class="text-lg">Comptes Externes</div>
            <button class="flex my-auto ml-4 text-sm text-blue-500" @click="addLineAccount()">
                <font-awesome-icon icon="plus" />
                <div>Ajouter un compte</div>
            </button>
        </div>
        <div v-if="contacts === undefined || contacts.length === 0">
            Vous n'avez pas encore lié de compte externe
        </div>

        <div class="flex">
            <div class="flex flex-col">
                <div v-for="(contact, idx) in contacts" :key="idx" class="flex items-center mb-8 lg:mb-2">
                    <div class="flex">
                        <i
                            v-if="contact.contactId != null"
                            class="my-auto mr-2"
                            :class="contact.contact.icon"
                        />
                        <SelectInput
                            v-model="contact.contact"
                            :max-content-width="true"
                            :choices="contactsTypes.map((sos) => sos.name)"
                        />
                        <button
                            class="block my-auto w-8 h-8 text-xl md:hidden text-1 red-500"
                            @click="rmLineAccount(idx)"
                        >
                            <i class="text-red-500 fa fa-times" />
                        </button>
                    </div>
                    <div class="flex flex-col md:hidden">
                        <input v-model="contact.pseudo" class="mt-2 input" placeholder="Pseudo" />
                        <input v-model="contact.link" class="mt-2 input" placeholder="Lien" />
                    </div>
                </div>
            </div>
            <div class="hidden flex-col md:flex">
                <div v-for="(contact, idx) in contacts" :key="idx" class="flex items-center mb-2">
                    <input v-model="contact.pseudo" class="ml-2 input" placeholder="Pseudo" />
                </div>
            </div>
            <div class="hidden flex-col md:flex">
                <div v-for="(contact, idx) in contacts" :key="idx" class="flex items-center mb-2">
                    <div class="">
                        <input v-model="contact.link" class="ml-2 input" placeholder="Lien" />
                        <button class="w-8 h-8 text-xl text-1 red-500" @click="rmLineAccount(idx)">
                            <i class="text-red-500 fa fa-times" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { emitter } from '@/shared/modules/emitter'
    import { useAuthStore } from '@/store/auth.store'
    import { useProfilesStore } from '@/store/profile.store'
    import { getStatus } from '@/utils/errors'
    import { ref } from 'vue'
    import SelectInput from '@/components/Input/SelectInput.vue'

    const auth = useAuthStore()
    const profile = useProfilesStore()
    const contacts = ref([])
    const contactsTypes = ref([])
    const me = ref(null)

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

    const loadContacts = async () => {
        await profile
            .getContacts(me.value.userId)
            .then((res) => (contacts.value = res))
            .catch((err) => {
                emitter.emit('error-route', { code: getStatus(err.response) })
            })
    }

    const loadContactsTypes = async () => {
        await profile
            .getContactsTypes()
            .then((res) => {
                contactsTypes.value = res
            })
            .catch((err) => {
                emitter.emit('error-route', { code: getStatus(err.response) })
            })
    }

    const addLineAccount = () => {
        contacts.value.push({
            social: { socialId: null },
            pseudo: null,
            link: null,
        })
    }

    const rmLineAccount = (idx) => {
        contacts.value.splice(idx, 1)
    }

    await loadMe()
    await loadContacts()
    await loadContactsTypes()
    console.log(contactsTypes.value)
</script>
