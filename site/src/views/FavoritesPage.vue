<template>
    <div class="m-0 absolute py-12 hero h-52 w-full top-0 left-0">
        <h3
            class="text-4xl font-bold mb-8 text-0"
            style="padding-left: 5%; padding-right: 5%"
        >
            Favoris
        </h3>
    </div>
    <div
        class="
        height
        relative
        mt-32
        mb-10
        text-0
        p-0
        w-full
        sm:w-11/12
        mx-auto
      "
    >
        <div
            v-for="favorite in favorites"
            :key="favorite"
        >
            <FavPost
                v-if="'post' in favorite"
                :post="favorite.post"
            />
            <FavReply
                v-else-if="'reply' in favorite"
                :reply="favorite.reply"
            />
            <FavComment
                v-else
                :comment="favorite.comment"
            />
        </div>
    </div>
</template>

<script>
import FavPost from '@/components/FavPost.vue'
import FavReply from '@/components/FavReply.vue';
import FavComment from '@/components/FavComment.vue';
export default {
    components: { FavPost, FavReply, FavComment },
    props:{
    },
    data() {
        return {
        };
    },
    computed: {
        favorites(){
            return this.$store.state.users.favorites
        }
    },
    mounted () {
        this.$store.dispatch('users/getFavorites')
    }
}
</script>
<style >

</style>
