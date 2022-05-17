<template>
  <div class="ad">
    <div v-for="(item, index) in adList" :key="index">
      <img :src="item.imgUrl" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['adList'],
}
</script>

<style>
.ad {
  width: 100%;
  margin-top: 2.426667rem;
}
.ad img {
  width: 100%;
  height: 2.986667rem;
}
</style>