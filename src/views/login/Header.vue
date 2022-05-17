<template>
  <header>
    <div>
      <i @click="goBack" class="iconfont icon-fanhui"></i>
    </div>
    <div>
      <slot>
        <span>登录</span>
      </slot>
    </div>
    <div>
      <i class="iconfont icon-zhuye"></i>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    goBack(){
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1.173333rem;
  background-color: #b0352f;
  color: #fff;
  span {
    line-height: 1.173333rem;
    font-size: 0.426667rem;
  }
  i {
    padding: 0 0.266667rem;
    font-size: 0.586667rem;
  }
}
</style>