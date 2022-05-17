<template>
  <div class="login container">
    <Header>
      <span>找回密码</span>
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
        <div @click="next" class="login-btn">下 一 步</div>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue'
import Header from '@/views/login/Header.vue'
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
      rules: {
        //验证手机号格式
        userTel: {
          rule: /^1[2-9]\d{9}$/,
          msg: '手机号格式错误',
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
      //验证
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
          }
          console.log(res)
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
    //点击下一步
    next() {
      //用户输入的验证码和发送的验证码对比
      if (this.code != this.codeInput) {
        Toast({
          message: '验证码错误',
          duration: 1500
        })
        return
      }
      //发送请求，查看是否存在输入的手机号
      http
        .$axios({
          url: '/api/selectUser',
          method: 'POST',
          data: {
            phone: this.userTel,
          },
        })
        .then((res) => {
          if (!res.success) {
            Toast({
              message: res.msg,
              duration: 1500
            })
            return
          }
          this.$router.push({
            name:'btn',
            query:{
              phone: this.userTel,
            }
          })
        })
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
  }
}
</style>