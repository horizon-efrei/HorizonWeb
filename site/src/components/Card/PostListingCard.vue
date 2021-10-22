<template>
  <div class="bg-0 rounded-lg shadow hover:shadow-lg rounded-l-xl duration-500">
    <div class="flex gap-3">
      <!-- Meta Column -->
      <div class="text-1 text-center flex flex-col flex-shrink-0 w-14 pt-1 pb-2 bg-5 rounded-l-lg">
        <i class="ri-add-line text-xl md:text-2xl mouse-icon" />
        <div class="font-medium">
          {{ format(post?.likes - post?.dislikes) }}
        </div>
        <i class="ri-subtract-line text-xl md:text-2xl -mt-1 mouse-icon" />
        <i class="mt-1 ri-bookmark-line mouse-icon text-lg md:text-xl" />
        <i class="mt-2 ri-star-line text-lg md:text-xl mouse-icon" />
        <div class="text-sm font-medium">
          {{ format(post?.favs) }}
        </div>
      </div>

      <!-- Summary Column -->
      <div class="pl-1 pr-4 my-3 mr-2">
        <span class="font-light text-3 flex flex-wrap space-x-1 items-center h-6 whitespace-nowrap overflow-hidden">
          <div class="flex space-x-1 pl-1"><i
            :class="headerTypes[post?.type]['icon']"
            class="text-1"
          /> <div class="text-1 font-bold">{{ headerTypes[post?.type].type }}</div></div>  <div class="flex space-x-1 pl-1"><p class="pr-1">•</p> <div :class="solvedState[post?.state].class">{{ solvedState[post?.state].state }}</div></div>  <div class="flex space-x-1 pl-1"><p class="pr-1">•</p> <i class="ri-file-edit-fill" />  <div>{{ timeAgo(post?.createdAt) }}</div></div> <div class="flex space-x-1 pl-1"><p class="pr-1">•</p> <i class="ri-history-line" /> <div> {{ timeAgo(post?.updatedAt) }}</div></div> <div class="flex space-x-1 pl-1"><p class="pr-1">•</p><i class="ri-eye-line" /> <div>{{ format(post?.views) }}</div></div>
        </span>

        <div class="mt-1">
          <router-link
            :to="`/post/${post.id}`"
            class="text-xl text-0 font-semibold hover:underline line-clamp-1"
          >
            {{ post?.title }}
          </router-link>

          <p class="mt-1 text-2 text-justify line-clamp-2">
            {{ postPreview(JSON.parse(post?.body)) }}
          </p>
        </div>

        <!-- Question Labels -->
        <div class="relative">
          <!-- Categories  -->
          <div class="flex flex-wrap items-start space-x-2 h-12 mt-4 space-y-2 overflow-hidden mr-4">
            <a
              href="#"
              class="flex items-center"
            >
              <img
                :src="post?.author?.avatar"
                alt="avatar"
                class="mr-2 w-10 h-10 rounded-full"
              >

              <div class="flex flex-col">
                <div class="text-1 font-bold text hover:underline">
                  {{ post?.author?.username }}
                </div>
                <div class="text-sm text-2">{{ format(post?.author?.rep) }}</div>
              </div>
            </a>
            <div class="font-medium text-1 pl-2">
              Tags :
            </div>
            <div
              v-if="post?.tags?.length === 0 || post?.tags === undefined"
              class="text-1"
            >
              N/A
            </div>
            <Tag
              v-for="tag in post.tags"
              v-else
              :key="tag"
              :name="tag"
              :color="'red-500'"
            />
          </div>
          <div
            class="absolute left-40 text-blue-500"
            style="bottom: -10px;"
          >
            + 5 tags
          </div>
          <!-- User
                <div class="block">

                </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import { generateHTML } from '@tiptap/html'
import Tag from '@/components/Tag.vue'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import CharacterCount from '@tiptap/extension-character-count'

const abbrev = 'kmb'
export default defineComponent({
  name: 'PostListingCard',
  components: {
    Tag
  },
  props: {
    post: {
      type: Object,
      default: () => {}
    }
  },
  setup () {
    var detectWrap = function (className) {
      var wrappedItems = []
      var prevItem = {}
      var currItem = {}
      var items = document.getElementsByClassName(className)

      for (var i = 0; i < items.length; i++) {
        currItem = items[i].getBoundingClientRect()
        if (prevItem && prevItem.top < currItem.top) {
          wrappedItems.push(items[i])
        } else {
          items[i].classList.remove('wrapped')
        }
        prevItem = currItem
      }

      return wrappedItems
    }

    window.onresize = function () {
      var wrappedItems = detectWrap('tag')
      for (var k = 0; k < wrappedItems.length; k++) {
        wrappedItems[k].classList.add('wrapped')
      }
    }
  },
  data () {
    return {
      headerTypes: {
        1: { type: 'Question', icon: 'ri-questionnaire-line' },
        2: { type: 'Suggestion', icon: 'ri-lightbulb-line' },
        3: { type: 'Problème', icon: 'ri-error-warning-line' },
        4: { type: 'Discussion', icon: 'ri-discuss-line' }
      },
      solvedState: {
        0: { state: 'Non-Résolu', class: 'text-red-500' },
        1: { state: '✓ Résolu', class: 'text-green-500' }
      }
    }
  },
  methods: {
    extractContent (s, space) {
      var span = document.createElement('span')
      span.innerHTML = s
      if (space) {
        var children = span.querySelectorAll('*')
        for (var i = 0; i < children.length; i++) {
          if (children[i].textContent) { children[i].textContent += ' ' } else { children[i].innerText += ' ' }
        }
      }
      return [span.textContent || span.innerText].toString().replace(/ +/g, ' ')
    },

    postPreview (postJson) {
      return this.extractContent(generateHTML(postJson,
        [
          StarterKit.configure({
            heading: {
              levels: [1, 2, 3]
            }
          }),
          Highlight,
          Typography,
          Placeholder,
          Underline,
          CharacterCount
        ]
      ), true)
    },

    round (n, precision) {
      var prec = Math.pow(10, precision)
      return Math.round(n * prec) / prec
    },

    format (n) {
      var base = Math.floor(Math.log(Math.abs(n)) / Math.log(1000))
      var suffix = abbrev[Math.min(2, base - 1)]
      base = abbrev.indexOf(suffix) + 1
      return suffix ? this.round(n / Math.pow(1000, base), 2) + suffix : '' + n
    },

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
