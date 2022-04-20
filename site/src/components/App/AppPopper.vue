<template>
    <Teleport v-if="activePopper" :to="clickEvent?.currentTarget">
        <transition name="fade">
            <div
                ref="popper"
                class="absolute z-50"
                :style="{
                    top: clickEvent?.clientY - clickEvent?.currentTarget.getBoundingClientRect().y + 'px',
                    left: arrowPosition + 'px',
                }"
                @click.prevent.stop="activePopper = false"
            >
                <slot></slot>
            </div>
        </transition>
    </Teleport>
</template>

<script setup>
    import { ref, computed, watch } from 'vue'
    import { onClickOutside } from '@vueuse/core'

    const props = defineProps({
        clickEvent: {
            required: true,
            type: Object,
        },
        position: {
            default: 'auto',
            type: String,
        },
        arrow: {
            default: 'center',
            type: String,
        },
    })

    const popper = ref(0)
    const activePopper = ref(false)
    const arrowPosition = computed(() => {
        const currentTarget = props.clickEvent?.currentTarget.getBoundingClientRect()
        return {
            left: props.clickEvent.clientX - currentTarget.x,
            center: props.clickEvent.clientX - currentTarget.x - popper.value?.clientWidth / 2,
            right: props.clickEvent.clientX - currentTarget.x - popper.value?.clientWidth,
        }[props.arrow]
    })

    onClickOutside(popper, () => {
        activePopper.value = false
    })

    watch(
        () => props.clickEvent,
        () => {
            activePopper.value = true
        },
    )

    // watch(
    //     () => y,
    //     () => {
    //         activePopper.value = true
    //     },
    // )
</script>
