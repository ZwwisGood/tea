<template>
  <div class="detail">
    <header>
      <div @click="goBack" class="header-return" :style="styleOption2">
        <i class="iconfont icon-fanhui"></i>
        <i class="iconfont icon-zhuye"></i>
      </div>
      <div class="header-bar" v-show="isShow" :style="styleOption">
        <div @click="goBack">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div>
          <span>商品详情</span>
          <span>商品评价</span>
        </div>
        <div>
          
          <i><router-link to="/home" class="iconfont icon-zhuye"></router-link></i>
        </div>
      </div>
    </header>
    <div class="main" @scroll="showTop">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) in swiperList" :key="index">
          <img :src="item.imgUrl" alt="" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="goods-name">
        <h1>{{ goods.name }}</h1>
        <div>性价首选，茶感十足、鲜醇耐泡的大众口粮茶</div>
      </div>
      <div>
        <div class="goods-price">
          <div class="oprice">
            <b>{{ goods.price }}</b>
          </div>
          <div class="pprice">
            <span>价格:</span>
            <del>{{ goods.price }}</del>
          </div>
        </div>
      </div>
      <div>
        <p>商品详情</p>
        <img style="width: 100%" src="/images/goods-list1.jpeg" alt="" />
        <img style="width: 100%" src="/images/goods-list1.jpeg" alt="" />
        <img style="width: 100%" src="/images/goods-list1.jpeg" alt="" />
        <img style="width: 100%" src="/images/goods-list1.jpeg" alt="" />
      </div>
    </div>

    <footer>
      <div @click="addCart" class="add-cart">加入购物车</div>
      <div>立即购买</div>
    </footer>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import http from '@/common/api/request'
import {Toast} from 'mint-ui'
export default {
  data() {
    return {
      goods: {},
      styleOption: { opacity: 0 },
      styleOption2: { opacity: 1 },
      isShow: false,
      //轮播图数据
      swiperList: [],
      //轮播图配置项
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        speed: 500,
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
        },
        // 左右箭头
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        // },
      },
    }
  },
  components: {
    swiper,
    swiperSlide,
  },
  created() {
    this.getData()
  },
  //activated 路由组件被激活时触发
  //如果当前商品id不是已缓存的组件的商品id，重新发送请求
  activated() {
    let id = this.goods.id
    if(this.$route.query.id != id){
      this.getData()
    }
  },
  methods: {
    //滑动到下方切换顶部样式
    showTop(e) {
      let opacity = e.target.scrollTop / 500
      opacity = opacity > 1 ? 1 : opacity
      let opacity2 = e.target.scrollTop / 260
      opacity2 = opacity2 > 1 ? 1 : opacity2
      this.styleOption = { opacity: opacity }
      this.styleOption2 = { opacity: 1 - opacity2 }
      if (e.target.scrollTop > 200) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    async getData() {
      //清空轮播图数据
      this.swiperList = []
      //发请求获取根据id查询到的商品信息
      let id = this.$route.query.id
      let res = await http.$axios({
        url: '/api/goods/id',
        params: {
          id,
        },
      })
      this.goods = res
      //轮播图数据(三张)
      for (let i = 0; i < 3; i++) {
        this.swiperList.push({ imgUrl: res.imgUrl })
      }
    },
    //返回上一页
    goBack() {
      this.$router.back()
    },
    //加入购物车
    addCart(){
      let id = this.$route.query.id
      http.$axios({
        method: 'post',
        url:'/api/addCart',
        data:{
          //商品ID
          goodsId: id,
        },
        headers:{
          //request.js中，判断是否有token
          token: true,
        }
      }).then(res=>{
        if(res.success){
          Toast({
            message: '添加购物车成功',
            duration: 1500
          })
        }
      })
    }
  },
}
</script>

<style scoped lang="scss">
.main {
  height: 17.786667rem;
  overflow: scroll;
}
header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 1.173333rem;
  z-index: 99;
  .header-return {
    width: 100%;
    height: 1.173333rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    i {
      width: 0.906667rem;
      height: 0.906667rem;
      font-size: 0.64rem;
      margin: 0 0.08rem;
      line-height: 0.906667rem;
      text-align: center;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 200%;
    }
    i:first-child::before {
      position: relative;
      left: 0.08rem;
    }
  }
  .header-bar {
    position: absolute;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1.173333rem;
    font-size: 0.426667rem;
    background-color: #fff;
    span {
      padding: 0 0.266667rem;
    }
    i {
      font-size: 0.64rem;
      padding: 0 0.266667rem;
    }
    a{
      margin:0;
      padding: 0;
      text-decoration: none;
      font-size: 0.64rem;
    }
  }
}
.goods-price {
  padding: 0 0.266667rem;
  .oprice {
    color: #d22531;
    &:before {
      content: '￥';
      font-size: 0.426667rem;
    }
    b {
      font-weight: 500;
    }
  }
  .pprice {
    color: #999;
    font-size: 0.32rem;
    margin-bottom: 0.533333rem;
  }
}
.goods-name {
  margin: 0.3rem;
  border-bottom: 1px solid #ddd;
  h1 {
    font-size: 0.533333rem;
    font-weight: 500;
    margin-bottom: 0.133333rem;
  }
  div {
    font-size: 0.373333rem;
    color: #999;
    padding-bottom: 0.266667rem;
  }
}
.detail {
  padding-bottom: 1.333333rem;
}
::v-deep .swiper-pagination-bullet {
  background-color: #b0352f;
}
.swiper-container {
  width: 100%;
  height: 10rem;
}
.swiper-container img {
  width: 100%;
  height: 10rem;
}
.swiper-pagination {
  color: #fff;
  font-size: 0.373333rem;
  text-align: right;
  left: -0.32rem;
}
footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.306667rem;
  border-top: 1px solid #ccc;
  background-color: #fff;
  div {
    width: 50%;
    line-height: 1.306667rem;
    font-size: 0.426667rem;
    text-align: center;
    color: #fff;
    background-color: red;
    &.add-cart {
      background-color: #ff9500;
    }
  }
}
</style>