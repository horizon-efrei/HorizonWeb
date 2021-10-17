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
import { PencilIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'Profile',
  components: {
    PencilIcon
  },
  props: {
    comment: {
      type: Object
    }
  },

  methods: {
  }
})
</script>

<style scoped>
</style>
