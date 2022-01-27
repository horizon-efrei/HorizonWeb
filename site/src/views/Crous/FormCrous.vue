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
                        <div v-for="(starter,idx) in menu.starters" :key="starter" class="flex gap-2 mb-2">
                            <SelectInput v-model="menu.starters[idx]" :model-value="food.filter((a) => a.type === 1).indexOf(starter)" :max-content-width="true" :choices="food.filter((a) => a.type === 1).map(a => a.name)"></SelectInput>
                            <button class="text-red-500" @click="removeStarter(idx)"><font-awesome-icon icon="times"></font-awesome-icon></button>
                        </div>
                        <p v-if="starterInvalid" class="text-sm text-red-500">Veuillez remplir tous les champs</p>
                    </div>
                    <div class="w-1/3">
                        <div class="flex gap-2 items-center">
                            <p class="text-md">Plats</p>
                            <button class="" @click="addDish()">
                                <p class=" text-sm text-blue-500">Ajouter un plat</p>
                            </button>
                        </div>
                        <div v-for="(dish,idx) in menu.dishes" :key="dish" class="flex gap-2 mb-2">
                            <SelectInput v-model="menu.dishes[idx]" :model-value="food.filter((a) => a.type === 2).indexOf(dish)" :max-content-width="true" :choices="food.filter((a) => a.type === 2).map(a => a.name)"></SelectInput>
                            <button class="text-red-500" @click="removeDish(idx)"><font-awesome-icon icon="times"></font-awesome-icon></button>
                        </div>
                        <p v-if="dishInvalid" class="text-sm text-red-500">Veuillez remplir tous les champs</p>
                    </div>
                    <div class="w-1/3">
                        <div class="flex gap-2 items-center">
                            <p class="text-md">Desserts</p>
                            <button class="" @click="addDessert()">
                                <p class="text-sm text-blue-500">Ajouter un dessert</p>
                            </button>
                        </div>
                        <div v-for="(dessert,idx) in menu.desserts" :key="idx" class="flex gap-2 mb-2">
                            <SelectInput v-model="menu.desserts[idx]" :model-value="food.filter((a) => a.type === 3).indexOf(dessert)" :max-content-width="true" :choices="food.filter((a) => a.type === 3).map(a => a.name)"></SelectInput>
                            <button class="text-red-500" @click="removeDessert(idx)"><font-awesome-icon icon="times"></font-awesome-icon></button>
                        </div>
                        <p v-if="dessertInvalid" class="text-sm text-red-500">Veuillez remplir tous les champs</p>
                    </div>
                </div>
                <div class="flex gap-2 mt-2 mb-8">
                    <button class=" button" @click="submitMenu()">
                        <p class="whitespace-nowrap">Enregistrer le Menu</p>
                    </button>
                    <AppAlert v-if="showMenuValidation" :type="menuFormStatus ? 'success' : 'error' ">
                        <template #text>
                            <div class="title">
                                {{validateMenuMessage}}
                            </div>
                        </template>
                    </AppAlert>
                </div>
            </div>
            <div class="flex items-center">
                <div class="text-lg font-bold">Un plat manque à la liste ?</div>
                <button class="ml-2 text-sm text-blue-500" @click="toggleFoodForm()">Ajouter un plat</button>
            </div>
            <div v-if="showFoodForm">
                <div class="flex">
                    <div class="mb-2">
                        <div>Nom du plat</div>
                        <input v-model="foodForm.name" class="input">
                        <p v-if="foodNameInvalid" class="text-sm text-red-500">Veuillez choisir un nom valide</p>
                    </div>
                    <div class="mb-2 ml-4">
                        <div >Type de Plat</div>
                        <SelectInput v-model="foodForm.type" :choices="['Entrée','Plat','Dessert']"></SelectInput>
                        <p v-if="foodTypeInvalid" class="text-sm text-red-500">Veuillez choisir un type valide</p>
                    </div>
                </div>

                <div class="flex gap-2">
                    <button class="button" @click="submitFood()">
                        <p>Enregistrer</p>
                    </button>
                    <AppAlert v-if="showFoodValidation" :type="foodFormStatus ? 'success' : 'error' ">
                        <template #text>
                            <div class="title">
                                {{validateFoodMessage}}
                            </div>
                        </template>
                    </AppAlert>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AppAlert from '@/components/App/AppAlert.vue';
import SelectInput from '@/components/Input/SelectInput.vue';
import _ from 'lodash';
import { watch } from 'vue';

export default {
    components: {
        SelectInput,
        AppAlert,
    },
    data() {
        return {
            menu: {
                desserts: [],
                dishes: [],
                starters: [],
            },
            date: new Date().toISOString().split('T').shift(),
            showFoodForm: false,
            foodForm: {
                name: null,
                type: null,
            },
            foodTypeInvalid: false,
            foodNameInvalid: false,
            foodFormStatus: false,
            validateFoodMessage: '',
            showFoodValidation: false,
            showMenuValidation: false,
            menuFormStatus: false,
            validateMenuMessage: '',
            starterInvalid: false,
            dishInvalid: false,
            dessertInvalid: false,
        }
    },
    computed: {
        food () {
            return this.$store.state.crous.food
        },
    },
    mounted() {
        this.$store.dispatch('crous/getFood')
        this.$store.dispatch('crous/getToday')
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
        watch(
            () => this.date,
            () => {
                this.$store.dispatch('crous/getDate',this.date)
            },
        )
        watch(
            () => this.$store.state.crous.menu,
            () => {
                if (this.$store.state.crous.menu === null) {
                    this.$store.state.crous.menu = {
                        desserts: [],
                        dishes: [],
                        starters: [],
                    }
                }
                this.menu = _.cloneDeep(this.$store.state.crous.menu)
                this.menu = {
                    starters: this.menu.starters.map((b) => this.food.filter((a) => a.type === 1).indexOf(this.food.find((a) => b.foodId === a.foodId))),
                    dishes: this.menu.dishes.map((b) => this.food.filter((a) => a.type === 2).indexOf(this.food.find((a) => b.foodId === a.foodId))),
                    desserts: this.menu.desserts.map((b) => this.food.filter((a) => a.type === 3).indexOf(this.food.find((a) => b.foodId === a.foodId))),
                }
                console.log(this.menu)
            },
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
        removeDessert: function removeDessert(idx) {
            this.menu.desserts.splice(idx,1)
        },
        removeDish: function removeDish(idx) {
            this.menu.dishes.splice(idx,1)
        },
        removeStarter: function removeStarter(idx) {
            this.menu.starters.splice(idx,1)
        },
        toggleFoodForm: function toggleFoodForm() {
            this.showFoodForm = !this.showFoodForm
            this.showFoodValidation = false
        },
        submitMenu: function submitMenu() {
            this.showMenuValidation = false
            if (this.isValidFormMenu()) {
                this.$store.dispatch('crous/postMenu', {
                    starters: this.menu.starters.map(a => a.foodId),
                    dishes: this.menu.dishes.map(a => a.foodId),
                    desserts: this.menu.desserts.map(a => a.foodId),
                    date: this.date,
                }).then(
                    () => {
                        this.validateMenuMessage = 'Création réussie'
                        this.menuFormStatus = true
                    },
                    () => {
                        this.validateMenuMessage = 'Création failed'
                        this.menuFormStatus = false
                    },
                )
            } else {
                if (this.menu.starters.length === 0 && this.menu.dishes.length === 0 && this.menu.desserts.length === 0 ) {
                    this.validateMenuMessage = 'Veuillez ajouter au moins un element'
                } else {
                    this.validateMenuMessage = 'Veuillez ne laisser aucun déroulant vide'
                }
                this.menuFormStatus = false
            }
            this.showMenuValidation = true
        },
        submitFood: function submitFood() {
            this.showFoodValidation = false
            if ( this.isValidFormFood() ) {
                this.$store.dispatch('crous/postFood', {
                    name: this.foodForm.name,
                    type: this.foodForm.type +1,
                }).then(
                    () => {
                        this.validateFoodMessage = 'Création réussie'
                        this.foodFormStatus = true
                    },
                    () => {
                        this.validateFoodMessage = 'Création failed'
                        this.foodFormStatus = false
                    },
                )
            } else {
                this.validateFoodMessage = 'Veuillez remplir tous les champs'
                this.foodFormStatus = false
            }
            this.showFoodValidation = true
            this.foodForm.name = null
            this.foodForm.type = null
        },
        isValidFormFood: function isValidFormFood() {
            let a = true
            if (this.foodForm.name === null || this.foodForm.name === '' || this.foodForm.name === undefined) {
                this.foodNameInvalid = true
                a = false
            } else {
                this.foodNameInvalid = false
            }
            if (this.foodForm.type === null || this.foodForm.type === undefined) {
                this.foodTypeInvalid = true
                a = false
            } else {
                this.foodTypeInvalid = false
            }
            return a
        },
        isValidFormMenu: function isValidFormMenu() {
            let a = true
            let b = true
            for (const i of this.menu.starters) {
                if (i === null) {
                    b = false
                    a = false
                    this.starterInvalid = true
                }
            }
            if (b) {
                this.starterInvalid = false
            } else {
                b = true
            }
            for (const i of this.menu.dishes) {
                if (i === null) {
                    a = false
                    b = false
                    this.dishInvalid = true
                }
            }
            if (b) {
                this.dishInvalid = false
            } else {
                b = true
            }
            for (const i of this.menu.desserts) {
                if (i === null) {
                    a = false
                    b = false
                    this.dessertInvalid = true
                }
            }

            if (b) {
                this.dessertInvalid = false
            } else {
                b = true
            }
            if (this.menu.starters.length === 0 || this.menu.dishes.length === 0 || this.menu.desserts.length === 0 ) {
                a = false
            }
            return a
        },

    },
}
</script>
