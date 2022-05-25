<template>
  <header>
    <h1>
      <img src="@/assets/images/Logo.jpg" alt="" />
    </h1>
    <div class="search" @click="goSearch">
      <i class="iconfont icon-fangdajing"></i>
      <span>搜索一下</span>
    </div>
    <div class="kefu">
      <i class="iconfont icon-kefu"></i>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    goSearch(){
      this.$router.push('/search')
    }
  }
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 1.173333rem;
  background-color: #b0352f;
}
header h1 {
  width: 2.666667rem;
  height: 1.173333rem;
  font-size: 0;
}
header h1 img {
width: 110%;
}
.search {
  display: flex;
  align-items: center;
  width: 5.6rem;
  height: 0.8rem;
  background-color: #fff;
  border-radius: 0.32rem;
}
.search i {
  padding: 0.133333rem;
  font-size: 0.533333rem;
  color: rgb(192, 182, 182);
}
.search span {
  font-size: 0.373333rem;
  color: rgb(192, 182, 182);
}
.kefu i {
  font-size: 0.666667rem;
  color: #fff;
}
</style>