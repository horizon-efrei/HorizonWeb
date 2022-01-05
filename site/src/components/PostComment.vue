<template>
    <div class="flex border-t-1">
        <div
            class="text-1 text-sm p-1"
        >
            <div class="flex">
                <div>
                    {{ comment.content }}
                    &nbsp;- {{ comment.author }}
                    <span class="pl-2">
                        <i class="ri-heart-line" />
                        <!-- // TODO: Actions -->
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="js">
export default {
    props: {
        comment: {
            type: Object,
            default: () => {}
        }
    }
}
</script>
