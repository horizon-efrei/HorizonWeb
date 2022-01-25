<template>
    <div class="absolute top-0 left-0 py-12 m-0 w-full h-52 hero">
        <h3
            class="mb-8 text-4xl font-bold text-0"
            style="padding-left: 5%; padding-right: 5%"
        >
            Crous
        </h3>
    </div>
    <div
        class="
        relative
        p-0
        mt-32
        mb-10
        w-full
        height
        text-0
        flex gap-2 md:flex-row flex-col
        "
    >
        <div class="flex flex-col order-2 gap-2 md:order-1 md:pl-4 md:w-2/3">
            <div class="rounded-none md:rounded-md card">
                <div v-if="menu != null && menu != undefined">

                    <div class="flex">
                        <img
                            class="my-auto w-16 h-16"
                            src="https://cdn.discordapp.com/attachments/849667496184381480/933296458487173190/logo_crous.png"
                        >
                        <h3 class="my-auto ml-4 text-xl font-bold">
                            Menu du Crous aujourd'hui
                        </h3>
                    </div>
                    <div class="flex flex-col gap-4 justify-between mt-6 mb-4 sm:flex-row">
                        <div class="ml-4">
                            <p class="text-md">
                                Entrées :
                            </p>
                            <ul
                            v-if="menu.entree.length>0"
                            class="ml-4 list-disc">
                                <li
                                    v-for="entree in menu.entree"
                                    :key="entree"
                                >
                                    {{ entree.name }}
                                </li>
                            </ul>
                        </div>
                        <div class="ml-4">
                            <p class="text-md">
                                Plats :
                            </p>
                            <ul
v-if="menu.dish.length>0"
                            class="ml-4 list-disc">
                                <li
                                    v-for="dish in menu.dish"
                                    :key="dish"
                                >
                                    {{ dish.name }}
                                </li>
                            </ul>
                        </div>
                        <div class="ml-4">
                            <p class="text-md">
                                Desserts :
                            </p>
                            <ul
                            v-if="menu.desserts.length>0"
                            class="ml-4 list-disc">
                                <li
                                    v-for="dessert in menu.desserts"
                                    :key="dessert"
                                >
                                    {{ dessert.name }}
                                </li>
                            </ul>
                        </div>
                    </div>
            </div>
            </div>
            <div class="rounded-none md:rounded-md card">
                <div class="flex mb-4">
                    <img
                        class="my-auto w-16 h-16"
                        src="https://cdn.discordapp.com/attachments/849667496184381480/933296458487173190/logo_crous.png"
                    >
                    <h3 class="my-auto ml-4 text-xl font-bold">
                        Formules et Tarifs
                    </h3>
                </div>
                <p>
                    <img
                        src="https://www.crous-grenoble.fr/wp-content/uploads/sites/7/2015/07/IMG-menu-rond-web2019-1024x1024.jpg"
                        alt="plaquette tarifs CROUS"
                        class="w-80 h-80"
                    >
                </p>
            </div>
            <div class="flex flex-col gap-2 md:flex-row">
                <div class="rounded-none md:w-1/2 md:rounded-md card">
                    <h3 class="my-auto ml-4 text-xl font-bold">
                        Allergenes
                    </h3>
                </div>
                <div class="rounded-none md:w-1/2 md:rounded-md card">
                    <h3 class="my-auto ml-4 text-xl font-bold">
                        Informations nutritionnelles
                    </h3>
                </div>
            </div>
        </div>
        <div class="flex flex-col order-1 gap-2 md:order-2 md:pr-4 md:w-1/3">
            <div class="rounded-none md:rounded-md card">
                <h3 class="text-xl font-bold">
                    Horaires
                </h3>
                <div class="mt-2">
                    Du Lundi au Vendredi :
                </div>
                <div class="mt-1 ml-4">
                    <div>Cantine : 12h-14h30</div>
                    <div>Cafétéria : 8h-18h</div>
                </div>
            </div>
            <div class="rounded-none md:rounded-md card">
                <h3 class="text-xl font-bold">
                    Dernières informations
                </h3>
                <div class="mt-2 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati cum voluptatum molestias adipisci id nihil voluptas quia, amet ipsum eaque reprehenderit aliquam aspernatur odio eum.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    computed: {
        menu() {
            return this.$store.state.crous.menu
        },
    },
    mounted() {
        this.$store.dispatch('crous/getMenuById',2)
    },
    methods: {
        joinedPlats: function joinedPlats(plats) {
            return plats(', ');
        },
    },
}
</script>
