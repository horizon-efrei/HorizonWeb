<template>
      <div class="carousel relative rounded relative overflow-hidden shadow-xl">
        <div class="carousel-inner relative overflow-hidden w-full">
          <!--Slide 1-->
          <input class="carousel-open" type="radio" id="carousel-1" name="carousel" aria-hidden="true" hidden=""
            checked="checked">
          <div class="carousel-item absolute opacity-0 bg-center h-52" style="background-image: url(https://mdbootstrap.com/img/new/slides/052.jpg)">

          </div>
          <!-- <label for="carousel-3"
            class="control-1 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 left-0 my-auto flex justify-center content-center"><i
              class="fas fa-angle-left mt-3"></i></label>
          <label for="carousel-2"
            class="next control-1 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 right-0 my-auto"><i
              class="fas fa-angle-right mt-3"></i></label> -->

          <!--Slide 2-->
          <input class="carousel-open" type="radio" id="carousel-2" name="carousel" aria-hidden="true" hidden="">
          <div class="carousel-item absolute opacity-0 bg-center h-full" style="background-image: url(https://mdbootstrap.com/img/new/slides/043.jpg)">
          </div>
          <!-- <label for="carousel-1"
            class=" control-2 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 left-0 my-auto"><i
              class="fas fa-angle-left mt-3"></i></label>
          <label for="carousel-3"
            class="next control-2 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 right-0 my-auto"><i
              class="fas fa-angle-right mt-3"></i></label> -->

          <!--Slide 3-->
          <input class="carousel-open" type="radio" id="carousel-3" name="carousel" aria-hidden="true" hidden="">
          <div class="carousel-item absolute opacity-0 h-full" style="background-image: url(https://mdbootstrap.com/img/new/slides/054.jpg)">
          </div>
          <!-- <label for="carousel-2"
            class="control-3 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 left-0 my-auto"><i
              class="fas fa-angle-left mt-3"></i></label>
          <label for="carousel-1"
            class="next control-3 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 right-0 my-auto"><i
              class="fas fa-angle-right mt-3"></i></label> -->

          <!-- Add additional indicators for each slide-->
          <ol class="carousel-indicators">
            <li class="inline-block mr-3">
              <label for="carousel-1"
                class="carousel-bullet cursor-pointer block text-4xl text-white hover:text-blue-700">•</label>
            </li>
            <li class="inline-block mr-3">
              <label for="carousel-2"
                class="carousel-bullet cursor-pointer block text-4xl text-white hover:text-blue-700">•</label>
            </li>
            <li class="inline-block mr-3">
              <label for="carousel-3"
                class="carousel-bullet cursor-pointer block text-4xl text-white hover:text-blue-700">•</label>
            </li>
          </ol>

        </div>
      </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Carousel',
  components: {
  },
  props: {
  }
})
</script>

<style scoped>
    .carousel-open:checked+.carousel-item {
        position: static;
        opacity: 100;
    }

    .carousel-item {
        -webkit-transition: opacity 0.6s ease-out;
        transition: opacity 0.6s ease-out;
    }

    #carousel-1:checked~.control-1,
    #carousel-2:checked~.control-2,
    #carousel-3:checked~.control-3 {
        display: block;
    }

    .carousel-indicators {
        list-style: none;
        margin: 0;
        padding: 0;
        position: absolute;
        bottom: 2%;
        left: 0;
        right: 0;
        text-align: center;
        z-index: 10;
    }

    #carousel-1:checked~.control-1~.carousel-indicators li:nth-child(1) .carousel-bullet,
    #carousel-2:checked~.control-2~.carousel-indicators li:nth-child(2) .carousel-bullet,
    #carousel-3:checked~.control-3~.carousel-indicators li:nth-child(3) .carousel-bullet {
        color: #2b6cb0;
        /*Set to match the Tailwind colour you want the active one to be */
    }
</style>
