<template>
  <div class="login container">
    <Header></Header>
    <section>
      <div class="main">
        <div class="input-container">
          <input
            type="text"
            v-model="userTel"
            placeholder="请输入手机号"
            pattern="[0-9]*"
          />
        </div>
        <div class="input-container">
          <input
            type="password"
            v-model="userPwd"
            placeholder="请输入6-11位密码"
          />
        </div>
        <div @click="login" class="login-btn">登 录</div>
        <div class="tab">
          <span @click="goLogin"
            ><i class="iconfont icon-jiesuo"></i>短信登录</span
          >
          <span @click="goRecovery"
            ><i class="iconfont icon-zhuce"></i>找回密码</span
          >
          <span @click="goRegister"
            ><i class="iconfont icon-zhuce"></i>快速注册</span
          >
        </div>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue'
import Header from './Header.vue'
import { Toast } from 'mint-ui'
import http from '@/common/api/request'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      userTel: '',
      userPwd: '',
      rules: {
        //验证手机号格式
        userTel: {
          rule: /^1[2-9]\d{9}$/,
          msg: '手机号格式错误',
        },
        //验证密码格式
        userPwd: {
          rule: /^\w{6,12}$/,
          msg: '密码格式错误',
        },
      },
    }
  },
  components: {
    Tabbar,
    Header,
  },
  methods: {
    ...mapMutations(['USER_LOGIN']),
    //前往找回密码
    goRecovery() {
      this.$router.push('/recovery')
    },
    //前往注册
    goRegister() {
      this.$router.push('/register')
    },
    //点击登录按钮
    login() {
      //前端验证
      if (!this.validate('userTel')) return
      if (!this.validate('userPwd')) return
      //发送请求，后端验证
      http
        .$axios({
          url: '/api/login',
          method: 'POST',
          data: {
            userTel: this.userTel,
            userPwd: this.userPwd,
          },
        })
        .then((res) => {
          console.log(res);
          //提示信息
            Toast({
              message: res.msg,
              duration: 1500
            })
          //登录失败
          if (!res.success) return
          //登录成功,跳转页面,存储用户信息
          this.USER_LOGIN(res.data)
          this.$router.push('/my')
        })
    },
    //跳转到短信登陆
    goLogin() {
      this.$router.push('/login')
    },
    validate(key) {
      let bool = true
      if (!this.rules[key].rule.test(this[key])) {
        //不符合规则,给出提示信息
        Toast({
          message: this.rules[key].msg,
          duration: 1500
        })
      }
      return bool
    },
  },
}
</script>

<style scoped lang="scss">
section {
  font-size: 0.373333rem;
  background-color: #f5f5f5;
  .main {
    padding: 0.533333rem;
    .input-container {
      position: relative;
      margin-top: 0.506667rem;
      input {
        width: 100%;
        padding: 0 0.266667rem;
        height: 1.173333rem;
        background-color: #fff;
        box-shadow: 0 0 0 1px #d7d7d7;
        box-sizing: border-box;
        border-radius: 0.08rem;
      }
    }
    .login-btn {
      margin-top: 0.506667rem;
      padding: 0.32rem 0;
      width: 100%;
      height: 0.533333rem;
      font-size: 0.426667rem;
      color: #fff;
      line-height: 0.533333rem;
      text-align: center;
      background-color: #b0352f;
      border-radius: 0.08rem;
    }
    .tab {
      display: flex;
      justify-content: space-between;
      margin-top: 0.533333rem;
      font-size: 0.373333rem;
      span {
        display: flex;
        color: #222;
        cursor: pointer;
        i {
          margin: 0 0.08rem;
          font-size: 0.533333rem;
        }
      }
    }
  }
}
</style>