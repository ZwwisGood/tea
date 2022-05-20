<template>
  <div>
    <div class="main">
        <div v-if="payStatus">支付成功</div>
        <div v-else>支付失败</div>
        <a @click="goHome">回到首页</a>
    </div>
  </div>
</template>

<script>
import http from '@/common/api/request'
import qs from 'qs'
export default {
  data() {
    return {
      payStatus: false,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      let data = {
        //订单号
        out_trade_no: this.$route.query.out_trade_no,
        trade_no: this.$route.query.trade_no,
      }

      http
        .$axios({
          url: '/api/paySuccess',
          method: 'post',
          headers: {
            token: true,
          },
          data: qs.stringify(data),
        })
        .then((res) => {
          if (res.code == 2) {
            this.payStatus = true
          }
        })
    },
    goHome() {
      this.$router.push('/home')
    },
  },
}
</script>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50%;
  a {
    font-size: 0.373333rem;
    text-decoration: underline;
  }
}
</style>