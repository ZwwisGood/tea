<template>
  <div class="container">
    <header>
      <i class="iconfont icon-fanhui" @click="$router.back()"></i>
      <span>提交订单</span>
      <i class="iconfont icon-zhuye" @click="$router.push('/home')"></i>
    </header>
    <section>
      <div class="address">
        <h3>收货信息：</h3>
        <div class="address-detail" @click="goAddress">
          <div style="marginbottom: 0.133333rem">
            <span>{{ address.name }}&nbsp;&nbsp;</span>
            <span>{{ address.tel }}</span>
          </div>
          <div>
            <span>{{ address.province }}&nbsp;&nbsp;</span>
            <span>{{ address.city }}&nbsp;&nbsp;</span>
            <span>{{ address.county }}&nbsp;&nbsp;</span>
            <span>{{ address.addressDetail }}</span>
          </div>
        </div>
      </div>
      <div class="payMehtod">
        <div class="method">
          支付方式：<span>选择在线支付，随机减0-100元</span>
        </div>
        <div>
          <van-radio-group v-model="radioPayment">
            <van-radio name="ali">支付宝支付</van-radio>
            <van-radio name="wx">微信支付</van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="goods">
        <ul>
          <li v-for="(item, index) in goodsList" :key="index">
            <div>
              <img :src="item.goods_imgUrl" alt="" />
            </div>
            <div class="goods-content">
              <span class="goods-name">{{ item.goods_name }}</span>
              <div class="goods-price">
                <span>¥{{ item.goods_price }}</span>
                <span>x {{ item.goods_num }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <footer>
      <div class="money">
        <span>共</span>
        <b>{{ Total.num }}</b>
        <span>件，</span>
        <span>总金额：</span>
        <em>￥{{ Total.price }}</em>
      </div>
      <div class="commit" @click="goPayment">提交订单</div>
    </footer>
  </div>
</template>

<script>
import http from '@/common/api/request'
import { Toast } from 'mint-ui'
import { mapState, mapGetters, mapMutations } from 'vuex'
import qs from 'qs'
export default {
  data() {
    return {
      goodsList: [], //选中商品的详细信息
      itemList: [], // 选中的商品id号
      address: {}, //选中的地址
      radioPayment: 'ali', //支付方式：默认支付宝
      order_Id: '', //订单Id
      Total: {
        price: 0, //总价
        num: 0, //总数量
      },
    }
  },
  methods: {
    //将地址数据存入vuex仓库的方法
    ...mapMutations(['initData', 'initOrder']),
    //提交订单
    goPayment() {
      if (!this.address)
        return Toast({ duration: 1500, message: '请填写收货地址' })

      //发送请求：1.修改订单状态（未支付->待支付）
      //          2.删除提交了的购物车数据
      http
        .$axios({
          url: '/api/submitOrder',
          method: 'post',
          headers: {
            token: true,
          },
          data: {
            order_Id: this.order_Id,
            shopArr: this.itemList,
          },
        })
        .then((res) => {
          let goodsName = []
          this.goodsList.forEach((item) => {
            goodsName.push(item.goods_name)
          })
          //支付传递的参数
          let dataOrder = {
            orderId: this.order_Id,
            name: goodsName.join(','),
            price: this.Total.price,
          }

          if (res.success) {
            //去支付
            http
              .$axios({
                url: '/api/payment',
                method: 'post',
                headers: {
                  token: true,
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                //qs是增加安全性的序列化插件
                data: qs.stringify(dataOrder),
              })
              .then((res) => {
                // window.open(res)
                console.log(res)
              })
          }
        })
    },
    //点击收货地址
    goAddress() {
      this.$router.push({
        path: '/address',
        query: {
          type: 'select',
        },
      })
    },
    selectOrder() {
      //根据订单号查询订单, 拿到金额和数量
      http
        .$axios({
          url: '/api/selectOrder',
          method: 'post',
          headers: {
            token: true,
          },
          data: {
            order_Id: this.order_Id,
          },
        })
        .then((res) => {
          //存储订单号到vuex
          this.initOrder(res.data)
          console.log(res)
          this.Total = {
            price: res.data[0].goods_price,
            num: res.data[0].goods_num,
          }
        })
    },
    selectAddress() {
      http
        .$axios({
          url: '/api/getAddress',
          method: 'get',
          headers: {
            token: true,
          },
        })
        .then((res) => {
          this.initData(res.data)
          //如果有默认收货地址
          if (this.defaultAddress.length) {
            this.address = this.defaultAddress[0]
          } else {
            this.address = res.data[0]
          }
        })
    },
  },
  computed: {
    ...mapState({
      list: (state) => state.cart.list,
    }),
    ...mapGetters(['defaultAddress']),
    // ...mapState({
    //   list: (state) => state.cart.list,
    // }),
    // goodsList() {
    //   return this.itemList.map((id) => {
    //     return this.list.find((item) => item.id == id)
    //   })
    // },
  },
  activated() {
    this.$bus.$on(
      'getAddress',
      function (data) {
        this.address = JSON.parse(data)
      }.bind(this)
    ) //bind要绑定当前Vue组件实例，否则指向Vue

    //查询订单，拿到金额和数量
    this.selectOrder()
    //选中商品的id数组
    this.itemList = JSON.parse(this.$route.query.detail)
    this.goodsList = JSON.parse(this.$route.query.goodsList)
    //获得已经存储到本地存储的订单号
    this.order_Id = localStorage.getItem('orderId')
  },
  created() {
    //查询地址，获得一个地址
    this.selectAddress()
  },
}
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1.173333rem;
  background-color: #b0352f;
  color: #fff;
  i {
    font-size: 0.586667rem;
    padding: 0 0.4rem;
  }
  span {
    font-size: 0.48rem;
  }
}

section {
  background-color: #f5f5f5;
  .address {
    h3 {
      padding: 0.213333rem 0.4rem;
      font-size: 0.373333rem;
      font-weight: 400;
    }
    .address-detail {
      margin-bottom: 0.266667rem;
      padding: 0.266667rem 0.4rem;
      background-color: #fff;
      div {
        line-height: 0.4rem;
      }
      span {
        font-size: 0.32rem;
      }
    }
  }
  .payMehtod {
    padding: 0.32rem 0.4rem;
    background-color: #fff;
    font-size: 0.373333rem;
    .method {
      margin-bottom: 0.266667rem;
      span {
        color: #b0352f;
      }
    }
    .van-radio-group {
      display: flex;
      .van-radio {
        margin-right: 0.533333rem;
      }
    }
  }
  .goods {
    margin-top: 0.266667rem;
    padding: 0.32rem 0.4rem;
    background-color: #fff;
    ul {
      li {
        display: flex;
        .goods-content {
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: space-between;
          padding-left: 0.266667rem;
          .goods-name {
            font-size: 0.373333rem;
          }
          .goods-price {
            display: flex;
            justify-content: space-between;
            font-size: 0.373333rem;
            span:first-child {
              color: #b0352f;
            }
          }
        }
        img {
          width: 1.973333rem;
          height: 1.973333rem;
          vertical-align: top;
        }
      }
    }
  }
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1.2rem;
  background-color: #fff;
  border-top: 1px solid #ccc;
  .commit {
    width: 3.2rem;
    line-height: 1.2rem;
    font-size: 18px;
    text-align: center;
    color: #fff;
    background-color: #b0352f;
  }
  b {
    margin: 0 0.133333rem;
    font-size: 0.373333rem;
    color: #b0352f;
  }
  em {
    font-size: 0.48rem;
    font-style: normal;
    color: #b0352f;
  }
  .money {
    margin-left: 0.4rem;
    padding-bottom: 0.133333rem;
  }
  span {
    font-size: 0.32rem;
  }
}
</style>