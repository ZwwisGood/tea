<template>
  <div class="login container">
    <Header>
      <span>注册</span>
    </Header>
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
            v-model="codeInput"
            type="text"
            placeholder="请输入短信验证码"
            pattern="[0-9]*"
          />
          <button :disabled="disabled" @click="sendCode">{{ codeMsg }}</button>
        </div>
        <div class="input-container">
          <input
            type="password"
            v-model="userPwd"
            placeholder="请设置6-11位密码"
          />
        </div>
        <div @click="register" class="login-btn">注 册</div>
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
export default {
  data() {
    return {
      codeInput: '',
      code: '',
      codeMsg: '获取短信验证码',
      codeNum: 5,
      disabled: false,
      userTel: '',
      userPwd: '',
      rules: {
        //验证手机号格式
        userTel: {
          rule: /^1[2-9]\d{9}$/,
          msg: '手机号格式错误',
        },
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
    //前往注册
    goRegister() {
      this.$router.push('/register')
    },
    //前往密码登录
    goUserLogin() {
      this.$router.push('/userLogin')
    },
    //获取短信验证码
    sendCode() {
      //验证手机号格式
      if (!this.validate('userTel')) return

      //请求短信验证码接口
      http
        .$axios({
          url: '/api/code',
          method: 'POST',
          data: {
            phone: this.userTel,
          },
        })
        .then((res) => {
          if (res.success) {
            this.code = res.data
            console.log(res)
          } else {
            Toast({
              message: res.msg,
              duration: 1500
            })
          }
        })

      //禁用按钮
      this.disabled = true
      //点击后立马更改按钮文本
      this.codeMsg = `重新发送（${this.codeNum}）`
      //倒计时
      let timer = setInterval(() => {
        this.codeNum--
        //更改按钮文本
        this.codeMsg = `重新发送（${this.codeNum}）`
      }, 1000)
      //判断何时停止定时器
      setTimeout(() => {
        clearInterval(timer)
        this.disabled = false
        this.codeMsg = '获取短信验证码'
        this.codeNum = 5
      }, 5000)
    },
    //点击注册
    register() {
      //验证密码
      if (!this.validate('userPwd')) return

      //判断验证码是否正确
      if (this.code != this.codeInput) {
        Toast({
          message: '验证码错误',
          duration: 1500
        })
        return
      }
      //验证码正确
      if (this.code == this.codeInput) {
        //验证码正确,发生注册请求
        http
          .$axios({
            url: '/api/register',
            method: 'POST',
            data: {
              phone: this.userTel,
              userPwd: this.userPwd,
            },
          })
          .then((res) => {
           Toast({
            message: res.msg,
            duration: 1500
          })
            console.log(res);
           if (!res.success) return
           this.$router.push('/login')
          })
      }
    },
    //验证
    validate(key) {
      let bool = true
      if (!this.rules[key].rule.test(this[key])) {
        //不符合规则,给出提示信息
        Toast({
          message: this.rules[key].msg,
          duration: 1500
        })
        bool = false
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
      button {
        position: absolute;
        right: 0;
        width: 3.013333rem;
        height: 1.173333rem;
        color: #fff;
        border: none;
        border-radius: 0.08rem;
        background-color: #b0352f;
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