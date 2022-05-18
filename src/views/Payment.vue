<template>
  <div>支付了</div>
</template>

<script>
import http from '@/common/api/request'
import qs from 'qs'
export default {
  created() {
    this.getData()
  },
  methods: {
    getData() {
      let data = {
        //订单号
        out_trade_no: this.$route.query.out_trade_no,
        trade_no : this.$route.query.trade_no
      }

      http.$axios({
        url: '/api/paySuccess',
        method: 'post',
        headers: {
          token: true,
        },
        data: qs.stringify(data),
      }).then(res=>{
        console.log(res);
      })
    },
  },
}
</script>

<style>
</style>