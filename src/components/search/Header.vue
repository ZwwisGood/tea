<template>
  <header>
    <div class="search-return" @click="goBack">
      <i class="iconfont icon-fanhui"></i>
    </div>
    <div class="search-main">
      <i class="iconfont icon-Magnifier"></i>
      <form action="" onsubmit="return false" @keyup.enter="goSearchList">
        <input type="search" placeholder="搜索你喜欢的产品..." v-model="searchVal" />
      </form>
    </div>
    <div class="search-btn" @click="goSearchList">搜索</div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      searchVal: this.$route.query.key || '',
      searchArr:[],
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    goSearchList(){
      //如果搜索关键字为空，直接return
      if(!this.searchVal) return
      //判断有无关键词的本地存储
      //无
      if(!localStorage.getItem('searchList')){
        localStorage.setItem('searchList',[])
      }else{
        //有
        this.searchArr = JSON.parse(localStorage.getItem('searchList'))
      }

      //增加关键词
      this.searchArr.unshift(this.searchVal)
      //ES6去重
      let newArr = new Set(this.searchArr)
      //给本地存储赋值
      localStorage.setItem('searchList',JSON.stringify(Array.from(newArr)))
      //如果重复搜索相同关键词，禁止跳转
      if(this.$route.query.key == this.searchVal) return
      //跳转页面
      this.$router.push({
        name:'list',
        query:{
          key:this.searchVal
        }
      })
    }
  },
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1.173333rem;
  background-color: #b0352f;
}
.search-return,
.search-btn {
  padding: 0 0.266667rem;
}
.search-return i {
  font-size: 100%;
}
.search-main {
  display: flex;
  align-items: center;
  width: 6.933333rem;
  height: 0.8rem;
  border-radius: 0.32rem;
  background-color: #fff;
}
.search-main i {
  padding: 0 0.16rem;
  color: #666;
}
.search-main form {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.search-main form input {
  width: 100%;
  font-size: 0.373333rem;
  padding-top: 0.053333rem;
  padding-left: 0.16rem;
}
.search-btn {
  font-size: 0.426667rem;
}
</style>