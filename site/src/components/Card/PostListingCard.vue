<template>
<div class="bg-0 rounded-lg shadow hover:shadow-lg rounded-l-xl duration-500">
        <div class="flex gap-3">
            <!-- Meta Column -->
            <div class="text-1 text-center flex flex-col px-2 pt-1 pb-2 bg-5 rounded-l-lg">
                <i class="ri-add-line text-xl md:text-2xl mouse-icon"></i>
                <div class="font-medium">{{ post?.likes - post?.dislikes }}</div>
                <i class="ri-subtract-line text-xl md:text-2xl -mt-1 mouse-icon"></i>
                <i class="mt-1 ri-bookmark-line mouse-icon text-lg md:text-xl"></i>
                <i class="mt-2 ri-star-line text-lg md:text-xl mouse-icon"></i>
                <div class="text-sm font-medium">1.1K</div>
             </div>

            <!-- Summary Column -->
            <div class="pl-1 pr-4 my-3 mr-2">
                <div>
                    <span class="font-light text-3 flex space-x-1 items-center">
                         <i class="ri-time-line"></i> <div>{{ timeAgo(post?.createdAt) }}</div> <div class="px-1">•</div> <i class="ri-refresh-line"></i> <div> {{ timeAgo(post?.updatedAt) }}</div> <div class="px-1">•</div>  <i class="ri-eye-line"></i> <div>1.1K</div>
                    </span>
                </div>

                <div class="mt-3">
                    <a href="#" class="text-xl text-0 font-bold hover:underline">
                        {{ post?.title }}
                    </a>

                    <p class="mt-1 text-2 text-md text-justify line-clamp-1">
                        {{ post?.body }}
                    </p>
                </div>

                <!-- Question Labels -->
                <div>
                    <!-- Categories  -->
                    <div class="flex my-3 items-center space-x-2">
                        <div class="font-medium text-lg text-1">Tags :</div>
                        <div class="text-lg text-1" v-if="post.tags.length === 0">N/A</div>
                        <Tag v-else v-for="tag in (post?.tags ? post.tags : [])" :key="tag" :name="tag" :color="'red-500'"/>
                    </div>

                    <!-- User -->
                    <div class="block">
                        <a href="#" class="flex items-center">
                            <img :src="post.author.avatar" alt="avatar"
                                class="mr-2 w-10 h-10 rounded-full">

                            <div class="flex flex-col">
                              <div class="text-1 font-bold text hover:underline">
                                  {{ post.author.username }}
                              </div>
                              <div class="text-sm text-2">1.1K</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import Tag from '@/components/Tag.vue'
// import { ThumbUpIcon, BellIcon, FlagIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'PostListingCard',
  components: {
    Tag
    /* ThumbUpIcon,
    BellIcon,
    FlagIcon */
  },
  props: {
    post: {
      type: Object
    }
  },
  methods: {
    timeAgo (input) {
      const date = (input instanceof Date) ? input : new Date(input)
      const formatter = new Intl.RelativeTimeFormat('fr', { style: 'short' })
      const ranges = {
        years: 3600 * 24 * 365,
        months: 3600 * 24 * 30,
        weeks: 3600 * 24 * 7,
        days: 3600 * 24,
        hours: 3600,
        minutes: 60,
        seconds: 1
      }
      const secondsElapsed = (date.getTime() - Date.now()) / 1000
      for (const key in ranges) {
        if (ranges[key] < Math.abs(secondsElapsed)) {
          const delta = secondsElapsed / ranges[key]
          return formatter.format(Math.round(delta), key)
        }
      }
    }
  }
})
</script>

<style scoped>
</style>
