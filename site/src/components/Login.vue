<template>
    <div class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12
        px-10 pt-12 pb-10 sm:px-10 sm:pt-6 sm:pb-4 mx-auto box-card box-card-border
        centered-fixed z-50 bg-2">

        <!-- Card Title -->

        <form method="POST" class="flex flex-col">
            <h2 class="text-center font-semibold text-3xl text-1">
                Connexion
            </h2>

            <div class="space-y-3 mt-4">
                <div>
                    <label for="email" class="block tracking-wider text-sm font-semibold text-gray-600 uppercase">E-mail</label>
                    <input-with-icon :icon="userIcon" type="email"></input-with-icon>
                </div>
                <div>
                    <label for="password" class="block tracking-wider mt-2 text-sm font-semibold text-gray-600 uppercase">Password</label>
                    <input-with-icon :icon="passwordIcon" type="password"></input-with-icon>
                </div>
            </div>
            <div class="flex flex-col mt-10 space-y-2 items-center justify-center">
                <button type="submit"
                    class="w-full py-3 bg-gray-500 rounded-sm text-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-400 hover:shadow-none">
                    CONNEXION HORIZON
                </button>
                <p class="text-xs uppercase">
                    OU
                </p>
                <button type="submit"
                    class="m-0 flex items-center justify-center space-x-3 w-full py-3 bg-red-500 rounded-sm
                    font-medium text-white uppercase text-sm
                    focus:outline-none hover:bg-red-600 hover:shadow-none">
                    <i class="ri-google-fill ri-lg"></i><p class="pr-1">CONNEXION AVEC GOOGLE</p>
                </button>
            </div>
            <!-- Another Auth Routes -->
            <div class="mt-5">
                <div class="md:flex-none flex flex-col flex-wrap space-y-3 sm:mb-2 text-sm text-center">
                    <a href="forgot-password" class="flex-2 underline text-xs">
                        Mot de passe oublié ?
                    </a>

                    <a href="register" class="flex-2 underline text-xs">
                        Création d'un compte
                    </a>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import InputWithIcon from '@/components/Input/InputWithIcon.vue'
// import { UserIcon, KeyIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'Login',
  components: {
    InputWithIcon
    // UserIcon, KeyIcon
  },
  data () {
    return {
      userIcon: "<i class='ri-shield-user-fill ri-xl'></i>",
      passwordIcon: "<i class='ri-key-2-fill ri-xl'></i>"
    }
  }
})
</script>

<style>
@import "~@/assets/css/utils/box.css";

.centered-fixed {
  position: fixed;
  top: 0;
  left: 0;
  transform: translate(calc(50vw - 50%), calc(50vh - 50%));
}

</style>
