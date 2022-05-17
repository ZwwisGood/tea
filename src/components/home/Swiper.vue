<template>
  <div class="swiper-main">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in swiperList" :key="index">
        <img :src="item.imgUrl" alt="" />
      </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>

    </swiper>
    <!-- 分页器（小圆点） -->
    <!-- 左右箭头 -->
    <!-- <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div> -->
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Swiper',
  components: {
    swiper,
    swiperSlide,
  },
  props: ['swiperList'],
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        speed: 1000,
        pagination: {
          el: '.swiper-pagination',
        },
        // 左右箭头
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        // },
      },
    }
  },
}
</script>

<style scoped>
.swiper-main {
  position: relative;
  margin-top: 2.48rem;
  width: 100%;
  height: 4.4rem;
}
.swiper-main img {
  width: 100%;
}
::v-deep .swiper-pagination-bullet {
  background-color: #b0352f;
}

</style>