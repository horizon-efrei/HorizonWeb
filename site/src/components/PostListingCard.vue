<template>
<div class="bg-white rounded-lg shadow-sm hover:shadow-lg duration-500 px-2 sm:px-6 md:px-2 py-4 my-6">
        <div class="grid grid-cols-12 gap-3">
            <!-- Meta Column -->
            <div class="col-span-0 sm:col-span-2 text-center hidden sm:block">
                <!-- Vote Counts -->
                <div class="grid grid-rows-2">
                    <div class="inline-block font-medium text-xl">
                        21
                    </div>

                    <div class="inline-block font-medium text-sm">
                        Votes
                    </div>
                </div>

                <!-- Answer Counts -->
                <a href="#" class="grid grid-rows-2 mx-auto mb-3 py-1 w-4/5 2lg:w-3/5 rounded-md bg-green-400">
                    <div class="inline-block font-medium text-2xl text-white">
                        12
                    </div>

                    <div class="inline-block font-medium text-white mx-1 text-sm lg:text-md">
                        Answers
                    </div>
                </a>

                <!-- View Counts -->
                <div class="grid my-3">
                    <span class="inline-block font-bold text-xs">
                        1213 Vews
                    </span>
                </div>
            </div>

            <!-- Summary Column -->
            <div class="col-span-12 sm:col-start-3 sm:col-end-13 px-3 sm:px-0">
                <div class="grid block sm:hidden">
                    <div class="flex flex-wrap">
                        <div class="mr-2">
                            <div class="inline-block font-light capitalize">
                                <i class="uil uil-arrow-circle-up mr-1"></i>
                                <span class="text-sm">
                                    21 Votes
                                </span>
                            </div>
                        </div>
                        <div class="mr-2">
                            <div class="inline-block font-light capitalize">
                                <i class="uil uil-check-circle mr-1"></i>
                                <span class="text-sm">
                                    21 Answers
                                </span>
                            </div>
                        </div>
                        <div class="mr-2">
                            <div class="inline-block">
                                <i class="uil uil-eye mr-1"></i>
                                <span class="text-sm capitalize font-light">
                                    21 Views
                                </span>
                            </div>
                        </div>

                        <div class="mr-2">
                            <div class="inline-block">
                                <i class="uil uil-clock mr-1"></i>
                                <span class="text-sm font-light">
                                    a few mins ago ago
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-between items-center hidden sm:block">
                    <span class="font-light text-gray-600">
                        a few min ago
                    </span>
                </div>

                <div class="mt-2">
                    <a href="#" class="sm:text-sm md:text-md lg:text-lg text-gray-700 font-bold hover:underline">
                        Praesent at arcu augue. Etiam lectus massa, consequat
                    </a>

                    <p class="mt-2 text-gray-600 text-sm md:text-md">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Tempora expedita dicta totam totam gul koparam doloremque. Excepturi iste iusto eos enim
                        reprehenderit nisi, accusamus...
                    </p>
                </div>

                <!-- Question Labels -->
                <div class="grid grid-cols-2 mt-4 my-auto">
                    <!-- Categories  -->
                    <div class="col-span-12 lg:col-span-8 flex">
                        <Tag name="Caching" color="red-400">

                        </Tag>

                        <Tag name="RabbitMQ" color="yellow-400">

                        </Tag>
                        <Tag name="Memcached" color="green-400">

                        </Tag>
                        <Tag name="Redis" color="purple-400">

                        </Tag>
                    </div>

                    <!-- User -->
                    <div class="col-none mr-2 lg:block lg:col-start-9 lg:col-end-12">
                        <a href="#" class="flex items-center">
                            <img src="https://cdn.discordapp.com/attachments/706287752085242027/895752666079182878/bird_1.png" alt="avatar"
                                class="mr-2 w-8 h-8 rounded-full">

                            <div class="text-gray-600 font-bold text-sm hover:underline">
                                Horizon
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
    title: {
      type: String
    }
  }
})
</script>

<style scoped>
</style>
