<template>
  <div class="my container">
    <header>
      <div class="user-info" v-if="loginStatus">
        <img :src="userInfo.imgUrl" alt="" />
        <span>{{ userInfo.nickName }}</span>
      </div>
      <div v-else class="login" @click="goLogin">登录/注册</div>
    </header>
    <section>
      <ul>
        <li @click="goAddress">
          <i class="iconfont icon-shouye"></i>
          地址管理
        </li>
        <li @click="logOut(), logOutMsg()" v-if="loginStatus">
          <i class="iconfont icon-tuichu"></i>
          退出登录
        </li>
      </ul>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue'
import { mapState, mapMutations } from 'vuex'
import { Toast } from 'mint-ui'

export default {
  name: 'My',
  components: {
    Tabbar,
  },
  methods: {
    //去登录页面
    goLogin() {
      this.$router.push('/login')
    },
    //退出登录
    ...mapMutations(['logOut']),
    logOutMsg() {
      Toast({
        message: '退出登录成功',
        duration: 1500,
      })
    },
    //进入地址管理
    goAddress(){
      this.$router.push('/address')
    }
  },
  computed: {
    ...mapState({
      loginStatus: (state) => state.user.loginStatus,
      userInfo: (state) => state.user.userInfo,
    }),
  },
}
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b64f4a;
  width: 100%;
  height: 4.266667rem;
  .login {
    padding: 0.16rem 0.4rem;
    font-size: 0.426667rem;
    color: #fff;
    background-color: #f6ab32;
    border-radius: 6px;
    cursor: pointer;
  }
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 1.76rem;
      border-radius: 50%;
    }
    span {
      margin-top: 0.266667rem;
      font-size: 0.48rem;
      color: #fff;
    }
  }
}
section {
  flex: 1;
  overflow: hidden;
  ul {
    li {
      i {
        color: #db1818;
        font-size: 0.533333rem;
      }
      padding: 0.4rem;
      font-size: 0.426667rem;
    }
  }
}
</style>