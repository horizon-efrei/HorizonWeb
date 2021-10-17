<template>
  <div class="flex text-1">
    <div class="w-2/12 bg-1 border-2 border-red-500">
      <ToolbarAdmin />
    </div>
    <div class="w-10/12 bg-1 border-2 border-red-500">
      <body class="antialiased font-sans bg-gray-200">
        <div class="container mx-auto px-4 sm:px-8">
          <div class="py-8">
            <div>
              <h2 class="text-2xl font-semibold leading-tight">Users</h2>
            </div>
            <div class="my-2 flex sm:flex-row flex-col">
              <div class="flex flex-row mb-1 sm:mb-0">
                <div class="relative">
                  <select
                    class="
                      appearance-none
                      h-full
                      rounded-l
                      border
                      block
                      appearance-none
                      w-full
                      bg-white
                      border-gray-400
                      text-gray-700
                      py-2
                      px-4
                      pr-8
                      leading-tight
                      focus:outline-none
                      focus:bg-white
                      focus:border-gray-500
                    "
                  >
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                  </select>
                  <div
                    class="
                      pointer-events-none
                      absolute
                      inset-y-0
                      right-0
                      flex
                      items-center
                      px-2
                      text-gray-700
                    "
                  >
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                      />
                    </svg>
                  </div>
                </div>
                <div class="relative">
                  <select
                    class="
                      appearance-none
                      h-full
                      rounded-r
                      border-t
                      sm:rounded-r-none
                      sm:border-r-0
                      border-r border-b
                      block
                      appearance-none
                      w-full
                      bg-white
                      border-gray-400
                      text-gray-700
                      py-2
                      px-4
                      pr-8
                      leading-tight
                      focus:outline-none
                      focus:border-l focus:border-r
                      focus:bg-white
                      focus:border-gray-500
                    "
                  >
                    <option>All</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                  <div
                    class="
                      pointer-events-none
                      absolute
                      inset-y-0
                      right-0
                      flex
                      items-center
                      px-2
                      text-gray-700
                    "
                  >
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="block relative">
                <span
                  class="
                    h-full
                    absolute
                    inset-y-0
                    left-0
                    flex
                    items-center
                    pl-2
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    class="h-4 w-4 fill-current text-gray-500"
                  >
                    <path
                      d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
                    ></path>
                  </svg>
                </span>
                <input
                  placeholder="Search"
                  class="
                    appearance-none
                    rounded-r rounded-l
                    sm:rounded-l-none
                    border border-gray-400 border-b
                    block
                    pl-8
                    pr-6
                    py-2
                    w-full
                    bg-white
                    text-sm
                    placeholder-gray-400
                    text-gray-700
                    focus:bg-white
                    focus:placeholder-gray-600
                    focus:text-gray-700
                    focus:outline-none
                  "
                />
              </div>
            </div>
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div
                class="
                  inline-block
                  min-w-full
                  shadow
                  rounded-lg
                  overflow-hidden
                "
              >
                <table class="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th class="tab-title">Etat</th>
                      <th class="tab-title">Auth</th>
                      <th class="tab-title">Titre</th>
                      <th class="tab-title">Created at</th>
                      <th class="tab-title">Last Message</th>
                      <th class="tab-title">Notes</th>
                    </tr>
                  </thead>
                  <tbody
                    v-for="i of [1, 2, 3, 4, 5, 6]"
                    :key="i"
                    class="max-h-16"
                  >
                    <tr>
                      <td class="tab-item">
                        <div
                          class="h-8 w-8 mx-auto rounded-full bg-green-500"
                        />
                      </td>
                      <td class="tab-item">
                        <div @hover="showHover($event)">
                          <div class="text-center mx-auto">
                            <img
                              class="w-8 h-8 mx-auto rounded-full m-1"
                              src="https://ichef.bbci.co.uk/news/976/cpsprodpb/7727/production/_103330503_musk3.jpg"
                              alt="img_user"
                              title="Pierre-Marie HERRBURGER--PIETRI"
                            />
                          </div>
                          <div class="text-center">L2</div>
                        </div>
                      </td>
                      <td class="tab-item">
                        <div class="truncate font-bold h-6 max-w-xs">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Facilis, tempora asperiores. Ratione dicta
                          obcaecati optio, quia vero, voluptas amet quam est
                          perspiciatis consectetur rerum dolorem illum laborum.
                          Mollitia perspiciatis dolorem accusantium molestias
                          sapiente eveniet quis. Illo, doloremque dolores rem
                          animi modi ea facilis aspernatur sed sint nisi, ad
                          explicabo in?
                        </div>
                        <div class="mt-1 texte-xs whitespace-nowrap">
                          XXX 👀 •XXX ⏫ •XXX 💌 •L1
                        </div>
                      </td>

                      <td class="tab-item">
                        <ExclamationIcon
                          class="h-6 w-6 mx-auto text-red-500 text-center"
                        />
                        <div class="text-gray-900 text-center">21/01/2021</div>
                      </td>
                      <td class="tab-item">
                        <div
                          class="
                            max-h-16 max-w-md
                            overflow-hidden overflow-ellipsis
                            text-gray-900
                          "
                        >
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Tempore unde, animi reiciendis sapiente quis
                          atque quos veniam nam, iure, similique sint.
                          Dolorum,Lorem ipsum dolor sit amet consectetur
                          adipisicing elit. Similique nisi, enim mollitia
                          expedita repudiandae maiores eum amet natus excepturi
                          distinctio, debitis aliquid quidem perferendis
                          necessitatibus!
                        </div>
                      </td>
                      <td class="tab-item">
                        <div
                          class="
                            max-h-16 max-w-sm
                            overflow-hidden overflow-ellipsis
                            text-gray-900
                          "
                        >
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Tempore unde,
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                  class="
                    px-5
                    py-5
                    bg-white
                    border-t
                    flex flex-col
                    xs:flex-row
                    items-center
                    xs:justify-between
                  "
                >
                  <span class="text-xs xs:text-sm text-gray-900">
                    Showing 1 to 4 of 50 Entries
                  </span>
                  <div class="inline-flex mt-2 xs:mt-0">
                    <button
                      class="
                        text-sm
                        bg-gray-300
                        hover:bg-gray-400
                        text-gray-800
                        font-semibold
                        py-2
                        px-4
                        rounded-l
                      "
                    >
                      Prev
                    </button>
                    <button
                      class="
                        text-sm
                        bg-gray-300
                        hover:bg-gray-400
                        text-gray-800
                        font-semibold
                        py-2
                        px-4
                        rounded-r
                      "
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import ToolbarAdmin from '@/components/ToolbarAdmin.vue'
// import Tag from '@/components/Tag.vue'
import { ExclamationIcon } from '@heroicons/vue/outline'
export default defineComponent({
  name: 'AdminSide',
  components: {
    ToolbarAdmin,
    // Tag,
    ExclamationIcon
  },
  props: {
    threads: [
      {}
    ]
  },
  methods: {
    // showHover (evt) {
    //   // const objetRect = evt.target.getBoundingClientRect()
    //   // const newCard = document.createElement('div')
    //   // newCard.className = 'border-2 border-red-500 text-1 absolute'
    // }
  }
})
</script>

<style scoped>
.tab-title {
  @apply px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider;
}
.tab-item {
  @apply border-b border-gray-200 bg-white text-sm max-h-16 overflow-hidden;
}
</style>
