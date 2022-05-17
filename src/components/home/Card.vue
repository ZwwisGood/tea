<template>
  <div class="title">
    <slot>
      <span>爆款推荐</span>
    </slot>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.title {
  padding: 0.266667rem 0;
  width: 100%;
  text-align: center;
  font-size: 0.533333rem;
}
.title span {
  position: relative;
}
.title span::before {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  left: -0.5rem;
  margin-top: -4px;
  width: 0.213333rem;
  height: 0.213333rem;
  border-radius: 50%;
  background: #d4c0a7;
}
.title span::after {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  right: -0.5rem;
  margin-top: -4px;
  width: 0.213333rem;
  height: 0.213333rem;
  border-radius: 50%;
  background: #d4c0a7;
}
</style>