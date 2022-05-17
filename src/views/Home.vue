<template>
  <div class="home">
    <Header></Header>
    <ly-tab
      v-model="selectedId"
      :items="items"
      :options="options"
      @change="changeTab"
    >
    </ly-tab>
    <section class="section">
      <div v-for="(item, index) in newData" :key="index">
        <Swiper
          v-if="item.type == 'swiperList'"
          :swiperList="item.data"
        ></Swiper>
        <Icons v-if="item.type == 'iconsList'" :iconsList="item.data"></Icons>
        <Recommend
          v-if="item.type == 'recommendList'"
          :recommendList="item.data"
        ></Recommend>
        <Ad v-if="item.type == 'adList'" :adList="item.data"></Ad>
        <Like v-if="item.type == 'likeList'" :likeList="item.data"></Like>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue'
import Header from '@/components/home/Header.vue'
import Swiper from '@/components/home/Swiper.vue'
import Icons from '@/components/home/Icons.vue'
import Recommend from '@/components/home/Recommend.vue'
import Like from '@/components/home/Like.vue'
import Ad from '@/components/home/Ad.vue'
import http from '@/common/api/request'
export default {
  name: 'Home',
  data() {
    return {
      selectedId: 0,
      items: [],
      newData: [],
      options: {
        activeColor: '#b0352f',
      },
    }
  },
  components: {
    Tabbar,
    Header,
    Swiper,
    Icons,
    Recommend,
    Like,
    Ad,
  },
  created() {
    this.getData()
  },
  methods: {
    //获取首页推荐数据
    async getData() {
      let res = await http.$axios({
        url: '/api/index_list/0/data/1',
      })

      //冻结对象--性能优化
      this.items = Object.freeze(res.topBar)
      this.newData = Object.freeze(res.data)
    },
    async addData(index) {
      let res = await http.$axios({
        url: `/api/index_list/${index}/data/1`,
      })
      if (res.constructor != Array) {
        this.newData = res.data
      } else {
        this.newData = res
      }
    },
    changeTab(item, index) {
      if(index >=3) return
      this.addData(index)
    },
  },
}
</script>

<style scoped>
.ly-tab {
  position: fixed;
  top: 1.12rem;
  left: 0;
  z-index: 998;
}
::v-deep .ly-tabbar {
  border-bottom: none;
  box-shadow: none;
}
section {
  padding-bottom: 1.6rem;
}
</style>