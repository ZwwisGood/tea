<template>
  <header>
    <i @click="goBack" class="iconfont icon-fanhui"></i>
    <slot>
      <span>我的地址</span>
    </slot>
  </header>
</template>

<script>
export default {
  methods: {
    goBack() {
      if (this.$route.name == 'address-detail') {
        this.$router.back()
      } else {
        this.$router.push('/my')
      }
    },
  },
}
</script>

<style scoped lang="scss">
header {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 1.173333rem;
  background-color: #b0352f;
  color: #fff;
  i {
    padding: 0 0.4rem;
  }
  span {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.48rem;
  }
}
</style>