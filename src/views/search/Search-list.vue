<template>
  <div class="search-list">
    <div class="headers">
      <Header></Header>
      <ul>
        <li
          v-for="(item, index) in searchList.data"
          :key="index"
          @click="changeTab(index)"
        >
          <div :class="index == searchList.currentIndex ? 'active' : ''">
            {{ item.name }}
          </div>
          <div class="search-filter" v-if="index != 0">
            <i
              class="iconfont icon-arrow_up_fat"
              :class="item.status == 1 ? 'active' : ''"
            >
            </i>
            <i
              class="iconfont icon-arrow_down_fat"
              :class="item.status == 2 ? 'active' : ''"
            >
            </i>
          </div>
        </li>
      </ul>
    </div>
    <section>
      <ul v-if="goodsList.length">
        <li v-for="(item, index) in goodsList" :key="index">
          <img v-lazy="item.imgUrl" alt="" />
          <p>{{ item.name }}</p>
          <div class="price">
            <div>
              <span>￥</span>
              <b>{{ item.price }}</b>
            </div>
            <div>立即购买</div>
          </div>
        </li>
      </ul>
      <p v-else style="margin: 6rem 0 0 3.8rem">暂无数据</p>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from '@/components/search/Header'
import Tabbar from '@/components/common/Tabbar'
import http from '@/common/api/request'
export default {
  data() {
    return {
      goodsList: [],
      searchList: {
        currentIndex: 0,
        data: [
          //status:0  上下箭头都不亮
          //status:1  上箭头亮
          //status:2  下箭头亮
          { name: '综合', key: 'zonghe' },
          { name: '价格', status: 0, key: 'price' },
          { name: '销量', status: 0, key: 'num' },
        ],
      },
    }
  },
  components: {
    Header,
    Tabbar,
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      // console.log(this.$route.query.key)
      http
        .$axios({
          url: '/api/goods/shopList',
          params: {
            searchName: this.$route.query.key,
            ...this.orderBy,
          },
        })
        .then((res) => {
          {
            this.goodsList = res
            console.log(res)
          }
        })
    },
    changeTab(index) {
      this.searchList.currentIndex = index
      let item = this.searchList.data[index]
      //排他，其他的状态值变为0
      this.searchList.data.forEach((v, i) => {
        if (i != index) {
          v.status = 0
        }
        //当前点击的改变状态
        if (index == this.searchList.currentIndex) {
          item.status = item.status == 1 ? 2 : 1
        }
      })
      //发送请求，请求排序后的数据
      this.getData()
    },
  },
  computed: {
    orderBy() {
      //获取当前点击的对象（价格、销量？）
      let obj = this.searchList.data[this.searchList.currentIndex]
      //根据当前对象的status判断应该是升序还是降序
      let val = obj.status == 1 ? 'asc' : 'desc'
      return {
        //返回结果如：{ price: asc }
        [obj.key]: val,
      }
    },
  },
  watch: {
    //路由发生变化，重新获取数据
    $route() {
      this.getData()
    },
  },
}
</script>

<style scoped>
.active {
  color: red;
}
.search-list {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.search-filter i {
  margin: -0.08rem 0;
}
.headers ul {
  display: flex;
  margin: 0.266667rem 0;
  justify-content: space-around;
  font-size: 0.426667rem;
}
.headers ul li {
  display: flex;
  align-items: center;
}
.headers ul li .search-filter {
  display: flex;
  flex-direction: column;
}
section {
  overflow: scroll;
  padding-bottom: 1.6rem;
}
section ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
section ul li {
  width: 50%;
}
section ul li p {
  font-size: 0.373333rem;
  padding: 0 0.266667rem;
  color: #222;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
section ul li > div {
  display: flex;
  margin: 0.266667rem 0;
  padding-left: 0.266667rem;
}
section ul li img {
  width: 4.533333rem;
  height: 4.533333rem;
}
section ul li .price {
  display: flex;
  font-size: 0.373333rem;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.266667rem;
}
section ul li .price div:first-child span {
  font-size: 0.32rem;
  color: #b0352f;
}
section ul li .price div:first-child b {
  font-size: 0.48rem;
  color: #b0352f;
}
section ul li .price div:last-child {
  padding: 0.08rem 0.16rem;
  color: #fff;
  background-color: #b0352f;
  border-radius: 0.16rem;
}
</style>