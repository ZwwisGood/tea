<template>
  <div class="search">
    <router-view></router-view>
  </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue'
import Header from '@/components/search/Header.vue'
export default {
  components: {
    Tabbar,
    Header,
  },
}
</script>

<style scoped>

</style>