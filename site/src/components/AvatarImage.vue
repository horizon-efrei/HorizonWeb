<template>
    <div class="shadow rounded-full bg-1">
        <img
            :src="(src==='' || src=== null ||src === undefined) ? default_avatar :src"
            :alt="alt"
            class="rounded-full "
            :class="`w-${size} h-${size}`"
        >
    </div>
</template>
<script>
import default_avatar from '@/assets/img/default_avatars/user.png'

export default {
    props: {
        src: {
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
    .shadow{
        box-shadow:inset 0 2px 4px 0 hsla(0,0%,0%,.2);

    }
</style>
