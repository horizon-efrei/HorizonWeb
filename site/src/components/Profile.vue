<template>
  <div class="px-8 py-4">
    <h2 class="text-xl">Profil</h2>
    <p class="text-sm mb-6">Vos informations personnelles publiques</p>
    <div>
      <div>
        <div class="flex mb-4">
          <div class="mr-6 w-full">
            <div class="flex mb-4">
              <div class="mr-2 w-1/2">
                <label for="firstname" class="text-lg w-full">Prénom</label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  class="w-full input input-border bg-1"
                />
              </div>
              <div class="ml-2 w-1/2">
                <label for="lastname" class="text-lg">Nom</label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  class="w-full input input-border bg-1"
                />
              </div>
            </div>
            <div>
              <label for="description" class="text-lg">Description</label>
              <textarea
                name="description"
                id="description"
                class="w-full input input-border bg-1"
              ></textarea>
            </div>
          </div>
          <div class="flex-shrink-0">
            <div class="relative">
              <img
                src="http://localhost:5000/user.png"
                alt="img"
                class="rounded-full h-48 w-48"
              />
              <i class="ri-camera-line text-2xl border rounded-full py-1 px-2 bg-2 border-color-2 absolute bottom-0 right-2"></i>
            </div>
          </div>
        </div>
        <div class="flex mb-4 space-x-4">
          <div class="w-44">
            <label for="parcours" class="text-lg w-full">Parcours</label>
            <select
              name="parcours"
              class="w-full input input-border bg-1 pr-4"
              required
            >
              <option disabled selected>Parcours</option>
              <option>Parcours Ingénieur</option>
              <option>Parcours Expert (PEx)</option>
            </select>
          </div>
          <div class="w-32">
            <label for="promo" class="text-lg w-full">Promotion</label>
            <select
              name="promo"
              class="w-full input input-border bg-1 pr-4"
              required
            >
              <option disabled selected>Promotion</option>
              <option>L1</option>
              <option>L2</option>
              <option>L3</option>
              <option>M1</option>
              <option>M2</option>
            </select>
          </div>
          <div class="w-40">
            <label for="td" class="text-lg">Groupe de TD</label>
            <select
              name="td"
              class="w-full input input-border bg-1 pr-4"
              required
            >
              <option disabled selected>Promotion</option>
              <option>L1</option>
              <option>L2</option>
              <option>L3</option>
              <option>M1</option>
              <option>M2</option>
            </select>
          </div>
        </div>
        <div class="mb-4">
          <div class="text-lg">Associations</div>

          <div v-for="(asso, idx) in assos" :key="idx" class="flex mb-2 items-center">
            <div class="mr-2">
              <select
                name="association"
                id="asso"
                class="w-full input input-border bg-1 pr-4"
                required
              >
                <option disabled selected>Association</option>
                <option>Horizon</option>
                <option>Efrei Sport Climbing</option>
                <option>Horizon</option>
              </select>
            </div>
            <div class="ml-2">
              <select
                name="role"
                id="role"
                class="w-full input input-border bg-1 pr-4"
                required
              >
                <option disabled selected>Role</option>
                <option>Membre</option>
                <option>Président</option>
                <option>Secrétaire</option>
              </select>
            </div>
            <button
              class="text-1 text-xl red-500 h-8 w-8"
              v-if="idx > 0"
              @click="rmLine()"
            >
               <i class="ri-close-line"></i>
            </button>
          </div>
          <button
            v-on:click="addLine()"
            class="button my-2"
          >
            Ajouter une Association
          </button>
        </div>
        <button class="button mb-4">
          Enregistrer
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Profile',
  props: {
    comment: {
      type: Object
    }
  },
  data () {
    return {
      assos: ['']
    }
  },

  methods: {
    addLine: function addLine () {
      this.assos.push('')
    },
    rmLine: function rmLine () {
      this.assos.pop()
    }
  }
})
</script>

<style scoped>
  @import "~@/assets/css/utils/input.css";
</style>
