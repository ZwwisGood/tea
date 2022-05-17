<template>
  <div class="list container">
    <header>
      <div class="return">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div class="search">
        <i class="iconfont icon-Magnifier"></i>
        <span>搜您喜欢...</span>
      </div>
      <div class="go-home">
        <i class="iconfont icon-zhuye"></i>
      </div>
    </header>
    <section>
      <div class="list-l">
        <ul class="l-item">
          <li
            @click="goScroll(index)"
            v-for="(item, index) in leftData"
            :key="index"
            :class="currentIndex == index ? 'active' : ''"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div ref="y" class="list-r" @scroll="scroll">
        <ul v-for="(item, index) in rightData" :key="index">
          <li v-for="(i, index1) in item" :key="index1" class="shop-list">
            <h2>{{ i.name }}</h2>
            <ul class="r-content">
              <li v-for="(j, index2) in i.list" :key="index2">
                <img :src="j.imgUrl" alt="" />
                <span>{{ j.name }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue'
import http from '@/common/api/request'
export default {
  name: 'List',
  data() {
    return {
      leftData: [],
      rightData: [],
      allHeight: [],
      currentIndex: 0,
    }
  },
  components: {
    Tabbar,
  },
  methods: {
    
    goScroll(index) {
      //获取下标，赋值给currentIndex，让对应选项高亮
      this.currentIndex = index

      let rightBox = this.$el.querySelector('.list-r')
      rightBox.scrollTop = this.allHeight[index]
    },
    //滚动右侧，使左侧对应部分高亮
    scroll() {
      let rightBox = this.$el.querySelector('.list-r')
      let index = this.allHeight.findIndex((_, index) => {
        return rightBox.scrollTop <= this.allHeight[index]
      })
      this.currentIndex = index
    },
  },
  async created() {
    //获取页面数据
    let res = await http.$axios({
      url: '/api/goods/list',
    })

    res.forEach((item) => {
      this.leftData.push({
        id: item.id,
        name: item.name,
      })
      this.rightData.push(item.data)
    })
    this.$nextTick(() => {
      //获取右边每个板块的高度，用于点击跳转
      let uls = this.$refs.y.getElementsByClassName('shop-list')
      //得到的HTMLCollection不是一个数组，需要转换成一个数组。
      let height = 0
      this.allHeight.push(height)
      Array.from(uls).forEach((item) => {
        //遍历该数组，把每一个li的高度累加放入allHeight数组
        height += item.offsetHeight
        this.allHeight.push(height)
      })
    })
  },
}
</script>

<style scoped lang="scss">
.list {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.173333rem;
  background-color: #b0352f;
  .return {
    line-height: 1.173333rem;
    padding: 0 0.4rem;
    i {
      color: #fff;
      font-size: 0.693333rem;
    }
  }
  .search {
    display: flex;
    flex: 1;
    padding: 0 0.266667rem;
    background-color: #fff;
    border-radius: 0.4rem;
    i {
      padding-right: 0.16rem;
      color: #aaa;
      line-height: 0.853333rem;
      font-size: 0.48rem;
    }
    span {
      line-height: 0.853333rem;
      color: #aaa;
      font-size: 0.373333rem;
    }
  }
  .go-home {
    padding-right: 0.08rem;
    width: 1.173333rem;
    height: 1.173333rem;
    i{
      line-height: 1.173333rem;
      padding-left: 0.266667rem;
      font-size: 0.8rem;
      color: #fff;
    }
  }
}
section {
  display: flex;
  flex: 1;
  overflow: hidden;
  .list-l {
    width: 2.48rem;
    height: 16.613333rem;
    background-color: #fff;
    border-right: 1px solid #ccc;
    overflow: scroll;
    padding-bottom: 1.6rem;
    .l-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      li {
        width: 100%;
        text-align: center;
        line-height: 1.333333rem;
        font-size: 0.426667rem;
      }
      .active {
        color: #b54f4a;
        border-left: 6px solid #b54f4a;
      }
    }
  }
  .list-r {
    flex: 1;
    overflow: scroll;
    padding-bottom: 1.6rem;
    .shop-list {
      padding: 0.133333rem 0 0.666667rem 0;
      text-align: center;
      h2 {
        position: relative;
        margin: 0 0 0.533333rem 0;
        font-size: 0.64rem;
        color: #333;
        font-weight: 400;
        &:before {
          content: '';
          position: absolute;
          left: 2.266667rem;
          top: 50%;
          width: 0.533333rem;
          height: 1px;
          background-color: #b0352f;
        }
        &:after {
          content: '';
          position: absolute;
          right: 2.266667rem;
          top: 50%;
          width: 0.533333rem;
          height: 1px;
          background-color: #b0352f;
        }
      }
      .r-content {
        display: flex;
        flex-wrap: wrap;
        li {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          width: 33.3%;
          margin-bottom: 0.266667rem;
          img {
            width: 1.413333rem;
            height: 1.413333rem;
          }
          span {
            font-size: 0.373333rem;
          }
        }
      }
    }
  }
}
</style>