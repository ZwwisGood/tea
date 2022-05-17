<template>
  <div class="search-index">
    <Header></Header>
    <section>
      <div class="search-history">
        <h2>
          <i class="iconfont icon-shijian"></i>
          <span>历史搜索</span>
          <span @click="deleteStorage">清空历史记录</span>
        </h2>
        <ul v-if="searchArr.length">
          <li v-for="(item, index) in searchArr" :key="index"
          @click="goSearchList(item)"
          >
            {{ item }}
          </li>
        </ul>
        <div class="nohistory" v-else>暂无搜索记录</div>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue'
import Header from '@/components/search/Header.vue'
import { MessageBox } from 'mint-ui'

export default {
  data() {
    return {
      searchArr: [],
    }
  },
  components: {
    Tabbar,
    Header,
  },
  methods: {
    //清空历史搜索记录
    deleteStorage() {
      MessageBox({
        title: '提示',
        message: '确定清空历史记录?',
        showCancelButton: true,
      }).then((res) => {
        if (res == 'confirm') {
          //点击确定按钮删除本地存储数据
          localStorage.removeItem('searchList')
          //清空数据
          this.searchArr = []
        } else {
        }
      })
    },
    //点击历史搜索进入结果页面
    goSearchList(item){
      this.$router.push({
        name:'list',
        query:{
          key:item
        }
      })
    }
  },
  created() {
    this.searchArr = JSON.parse(localStorage.getItem('searchList')) || []
  },
}
</script>

<style scoped>
.search-index {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
section {
  flex: 1;
  background-color: #f5f5f5;
  overflow: hidden;
}
.search-history {
  padding: 0.533333rem;
}
.search-history h2 {
  font-weight: 400;
  font-size: 0.48rem;
  font-weight: 800;
}
.search-history h2 span:last-child {
  padding: 0.08rem 0.16rem;
  font-size: 0.32rem;
  font-weight: normal;
  background-color: rgb(208, 207, 207);
  float: right;
  border-radius: 0.373333rem;
}
.search-history h2 i {
  padding-right: 0.08rem;
  color: #b0352f;
  font-weight: 600;
}
.search-history ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0.4rem 0.266667rem;
  font-size: 0.373333rem;
}
.search-history ul li {
  color: rgb(144, 137, 137);
  border: 1px solid rgb(199, 197, 197);
  padding: 0.08rem 0.266667rem;
  margin: 0.133333rem 0.266667rem;
}
.nohistory {
  font-size: 0.346667rem;
  margin-top: 0.266667rem;
}
</style>