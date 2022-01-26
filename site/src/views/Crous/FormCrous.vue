<template>
        <div class="absolute top-0 left-0 py-12 m-0 w-full h-52 hero">
        <h3
            class="mb-8 text-4xl font-bold text-0"
            style="padding-left: 5%; padding-right: 5%"
        >
            Gestion du Crous
        </h3>
    </div>
    <div
        class="
        relative
        p-0
        mb-10 md:px-4
        mt-32
        w-full
        height
        text-0
        flex gap-2 md:flex-row flex-col
        "
    >
        <div class="mx-auto mb-8 w-4/6 card">
            <div class="flex justify-between items-center mb-4 w-full">
                <div class="flex items-center">
                    <img
                        class=" w-16 h-16"
                        src="https://cdn.discordapp.com/attachments/849667496184381480/933296458487173190/logo_crous.png"
                    >
                    <h3 class=" ml-4 text-xl font-bold">
                        Création d'un menu
                    </h3>
                </div>
                <div>
                    <input v-model="date" class="input" type="date">
                </div>
            </div>
            <div >
                <div class="flex justify-between">
                    <div class="w-1/3">
                        <div class="flex gap-2 items-center">
                            <p class="text-md">Entrées</p>
                            <button class="" @click="addStarter()">
                                <p class=" text-sm text-blue-500">Ajouter une entree</p>
                            </button>
                        </div>
                        <div v-for="(starter,idx) in menu.starters" :key="starter" class="mb-4">
                            <SelectInput v-model="menu.starters[idx]" :model-value="food.filter((a) => a.type === 1).indexOf(starter)" :max-content-width="true" :choices="food.filter((a) => a.type === 1).map(a => a.name)"></SelectInput>
                        </div>
                    </div>
                    <div class="w-1/3">
                        <div class="flex gap-2 items-center">
                            <p class="text-md">Plats</p>
                            <button class="" @click="addDish()">
                                <p class=" text-sm text-blue-500">Ajouter un plat</p>
                            </button>
                        </div>
                        <div v-for="(dish,idx) in menu.dishes" :key="dish" class="mb-4">
                            <SelectInput v-model="menu.dishes[idx]" :model-value="food.filter((a) => a.type === 2).indexOf(dish)" :max-content-width="true" :choices="food.filter((a) => a.type === 2).map(a => a.name)"></SelectInput>
                        </div>
                    </div>
                    <div class="w-1/3">
                        <div class="flex gap-2 items-center">
                            <p class="text-md">Desserts</p>
                            <button class="" @click="addDessert()">
                                <p class=" text-sm text-blue-500">Ajouter un dessert</p>
                            </button>
                        </div>
                        <div v-for="(dessert,idx) in menu.desserts" :key="idx" class="mb-4">
                            <SelectInput v-model="menu.desserts[idx]" :model-value="food.filter((a) => a.type === 3).indexOf(dessert)" :max-content-width="true" :choices="food.filter((a) => a.type === 3).map(a => a.name)"></SelectInput>
                        </div>
                    </div>
                </div>
                <button class="mt-8 button" @click="submitMenu()">
                    <p>Enregistrer le Menu</p>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import SelectInput from '@/components/Input/SelectInput.vue';
import { watch } from 'vue';

export default {
    components: { SelectInput },
    data() {
        return {
            menu: {
                desserts: [],
                dishes: [],
                starters: [],
            },
            date: new Date().toISOString().split('T').shift(),
        }
    },
    computed: {
        food () {
            return this.$store.state.crous.food
        },
    },
    mounted() {
        this.$store.dispatch('crous/getFood')
        watch(
            () => this.menu,
            () => {
                for (let i=0; i<this.menu.starters.length;i++ ) {
                    if (Number.isInteger(this.menu.starters[i]) && this.menu.starters[i]!=null ) {
                        this.menu.starters[i] = this.food.filter((a) => a.type===1)[this.menu.starters[i]]
                    }
                }
                for (let i=0; i<this.menu.dishes.length;i++ ) {
                    if (Number.isInteger(this.menu.dishes[i]) && this.menu.dishes[i]!=null) {
                        this.menu.dishes[i] = this.food.filter((a) => a.type===2)[this.menu.dishes[i]]
                    }
                }
                for (let i=0; i<this.menu.desserts.length;i++ ) {
                    if (Number.isInteger(this.menu.desserts[i]) && this.menu.desserts[i]!=null) {
                        this.menu.desserts[i] = this.food.filter((a) => a.type===3)[this.menu.desserts[i]]
                    }
                }
            },
            { deep: true },
        )
    },
    methods: {
        addDessert: function addDessert() {
            this.menu.desserts.push(null)
        },
        addDish: function addDish() {
            this.menu.dishes.push(null)
        },
        addStarter: function addStarter() {
            this.menu.starters.push(null)
        },
        submitMenu: function submitMenu() {
            this.$store.dispatch('crous/postMenu', {
                starters: this.menu.starters.map(a => a.foodId),
                dishes: this.menu.dishes.map(a => a.foodId),
                desserts: this.menu.desserts.map(a => a.foodId),
                date: this.date,
            })
        },
    },
}
</script>
