<template>
  <div class="tabbar">
    <ul>
      <li
        v-for="(item, index) in routerList"
        :key="index"
        @click="switchTab(item.path)"
      >
        <img
          :src="$route.path.includes(item.path) ? item.selected : item.active"
          alt=""
        />
        <span :class="$route.path.includes(item.path) ? 'active':'' ">{{
          item.title
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routerList: [
        {
          title: '首页',
          path: '/home',
          active: '/images/home.png',
          selected: '/images/home-select.png',
        },
        {
          title: '分类',
          path: '/list',
          active: '/images/list.png',
          selected: '/images/list-select.png',
        },
        {
          title: '购物车',
          path: '/cart',
          active: '/images/cart.png',
          selected: '/images/cart-select.png',
        },
        {
          title: '我的',
          path: '/my',
          active: '/images/my.png',
          selected: '/images/my-select.png',
        },
      ],
    }
  },
  methods: {
    switchTab(path) {
      //判断是否点击同一（页面）路由
      if (this.$route.path == path) return
      //点击跳转页面
      this.$router.push(path)
    },
  },
}
</script>

<style scoped>
.active {
  color: red;
}
.tabbar {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 1.6rem;
  border-top: 1px solid #ccc;
  background-color: #fff;
}
.tabbar ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
}
.tabbar ul li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tabbar ul li img {
  width: 0.826667rem;
  height: 0.826667rem;
}
.tabbar ul li span {
  font-size: 0.426667rem;
  font-weight: 700;
}
</style>