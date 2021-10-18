<template>
  <div class="px-8 py-4">
    <h2 class="text-xl">Profile</h2>
    <p class="text-sm mb-6">Veuillez remplir les informations ci-dessous</p>
    <form action="">
      <div>
        <div class="flex mb-4">
          <div class="w-5/6">
            <div class="flex mb-4">
              <div class="mr-2 w-1/2">
                <label for="firstname" class="text-lg w-full">Prenom</label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  class="w-full p-1 rounded-md bg-1 border-1"
                />
              </div>
              <div class="ml-2 w-1/2">
                <label for="lastname" class="text-lg">Nom</label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  class="w-full p-1 rounded-md bg-1 border-1"
                />
              </div>
            </div>
            <div>
              <label for="description" class="text-lg">Description</label>
              <textarea
                name="description"
                id="description"
                class="w-full px-1 rounded-md bg-1 border-1"
              ></textarea>
            </div>
          </div>
          <div class="w-1/6">
            <div class="flex">
              <img
                src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"
                alt="img"
                class="rounded-full h-48 w-48"
              />
              <PencilIcon
                class="
                  w-8
                  h-8
                  hover:text-blue-500
                  bg-gray-600
                  relative
                  top-32
                  right-8
                "
              />
            </div>
          </div>
        </div>
        <div class="flex mb-4">
          <div class="mr-2 w-1/2">
            <label for="promo" class="text-lg w-full">Promotion</label>
            <input
              type="text"
              name="promo"
              id="promo"
              class="w-full p-1 rounded-md bg-1 border-1"
            />
          </div>
          <div class="ml-2 w-1/2">
            <label for="classe" class="text-lg">Groupe de TD</label>
            <input
              type="text"
              name="classe"
              id="classe"
              class="w-full p-1 rounded-md bg-1 border-1"
            />
          </div>
        </div>
        <div class="mb-4">
          <div class="text-lg">Associations</div>
          <div class="flex mb-2">
            <div class="mr-2">
              <select
                name="association"
                id="asso"
                class="w-full p-1 rounded-md bg-1 border-1"
              >
                <option>Association</option>
                <option>Horizon</option>
                <option>Efrei Sport Climbing</option>
                <option>Horizon</option>
              </select>
            </div>
            <div class="ml-2">
              <select
                name="role"
                id="role"
                class="w-full p-1 rounded-md bg-1 border-1"
              >
                <option>Role</option>
                <option>Membre</option>
                <option>Président</option>
                <option>Secrétaire</option>
              </select>
            </div>
          </div>
          <div class="flex mb-2" v-for="i in assos" :key="i">
            <div class="mr-2">
              <select
                :name="'asso' + i"
                :id="'asso' + i"
                class="w-full p-1 rounded-md bg-1 border-1"
              >
                <option>Association</option>
                <option>Horizon</option>
                <option>Efrei Sport Climbing</option>
                <option>Horizon</option>
              </select>
            </div>
            <div class="ml-2">
              <select
                :name="'role' + i"
                :id="'role' + i"
                class="w-full p-1 rounded-md bg-1 border-1"
              >
                <option>Role</option>
                <option>Membre</option>
                <option>Président</option>
                <option>Secrétaire</option>
              </select>
            </div>
            <button
              class="text-red-300 hover:text red-500 h-8 w-8"
              v-on:click="rmLine()"
            >
              <XIcon />
            </button>
          </div>
          <button
            v-on:click="addLine()"
            class="p-1 bg-blue-500 text-black font-bold rounded-md ml-auto"
          >
            Ajouter une Association
          </button>
        </div>
        <div class="float-right flex">
          <button class="bg-gray-500 text-lg p-1 mb-4 rounded-md mr-4">
            Annuler
          </button>
          <input
            type="submit"
            value="Enregistrer"
            class="bg-blue-500 text-lg p-1 mb-4 rounded-md"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import { PencilIcon, XIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'Profile',
  components: {
    PencilIcon,
    XIcon
  },
  props: {
    comment: {
      type: Object
    }
  },
  data () {
    return {
      assos: []
    }
  },

  methods: {
    addLine: function addLine () {
      this.assos.push(this.assos.lenght)
    },
    rmLine: function rmLine () {
      this.assos.pop()
    }
  }
})
</script>

<style scoped>
</style>
