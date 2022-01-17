<template>
    <img
        :src="(avatar==='' || avatar=== null ||avatar === undefined) ? default_avatar :avatar"
        :alt="alt"
        class="rounded-full bg-1 shadow-inner"
        :class="`w-${size} h-${size}`"
    >
</template>
<script>
import default_avatar from '@/assets/img/default_avatars/user.png'

export default {
    props: {
        avatar: {
            type: String,
            default: () => ""
        },
        alt: {
            type: String,
            default: () => ""
        },
        size: {
            type: Number,
            require:true,
            default: () => 16
        },
    },
    data() {
        return {
            default_avatar : default_avatar
        }
    }
}
</script>
<style>

</style>
