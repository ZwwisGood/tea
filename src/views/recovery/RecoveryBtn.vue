<template>
  <div class="login container">
    <Header>
      <span>找回密码</span>
    </Header>
    <section>
      <div class="main">
        <div class="input-container">
          <input v-model="userPwd" type="text" placeholder="请输入新密码" />
        </div>
        <div @click="submitBtn" class="login-btn">确认修改</div>
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
      userPwd: '',
      rules: {
        //验证手机号格式
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
    //提交新密码
    submitBtn(){
			if( !this.validate('userPwd') ) return;
			//确认修改
			http.$axios({
				url:'/api/recovery',
				method:'POST',
				data:{
					phone:this.$route.query.phone,
					pwd:this.userPwd
				}
			}).then(res=>{
				if( res.success ){
          Toast({
          message: '修改成功',
          duration: 1500
        })
          this.$router.push({
            path: '/login'
          })
				}
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