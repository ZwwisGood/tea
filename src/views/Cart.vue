<template>
  <div class="cart">
    <header>
      <div class="return">
        <i class="iconfont icon-fanhui" @click="$router.back()"></i>
      </div>
      <span>购物车</span>
      <div
        @click="isNavBar"
        v-text="isNavStatus ? '完成' : '编辑'"
        class="edit"
      ></div>
    </header>
    <section v-if="list.length">
      <div class="cart-title">
        <van-checkbox
          @click="checkAllFn"
          :value="isCheckedAll"
          checked-color="#b0352f"
        ></van-checkbox>
        <span>商品</span>
      </div>
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <div class="checkbox">
            <van-checkbox
              @click="checkItem(index)"
              v-model="item.checked"
              checked-color="#b0352f"
            ></van-checkbox>
          </div>
          <h2>
            <img :src="item.goods_imgUrl" alt="" />
          </h2>
          <div class="goods">
            <div class="goods-title">
              <span>{{ item.goods_name }}</span>
              <i
                @click="delGoodsFn(item.id)"
                class="iconfont icon-lajitong"
              ></i>
            </div>
            <div class="goods-price">￥{{ item.goods_price }}</div>
            <van-stepper
              @change="changeNum($event, item)"
              v-model="item.goods_num"
              integer
            />
          </div>
        </li>
      </ul>
    </section>
    <section v-else class="noData">
      <div>没有购物车数据</div>
      <router-link to="/home">去首页逛逛吧</router-link>
    </section>
    <footer v-if="list.length">
      <div class="radio">
        <van-checkbox
          @click="checkAllFn"
          :value="isCheckedAll"
          checked-color="#b0352f"
        ></van-checkbox>
      </div>
      <div class="total" v-show="!isNavStatus">
        <div>
          共有 <span class="total-active">{{ total.num }}</span> 件商品
        </div>
        <div>
          <span>总计: </span>
          <span class="total-active"
            >￥{{ total.price.toFixed(2) }} + 0茶币</span
          >
        </div>
      </div>
      <div class="order" @click="delGoodsFn" v-if="isNavStatus">删除</div>
      <div class="order" @click="goOrder" v-else>去结算</div>
    </footer>
  </div>
</template>

<script>
import http from '@/common/api/request'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
export default {
  name: 'Cart',
  data() {
    return {
      isNavStatus: false,
    }
  },
  computed: {
    ...mapState({
      list: (state) => state.cart.list,
      selectList: (state) => state.cart.selectList,
    }),
    ...mapGetters(['isCheckedAll', 'total']),
  },
  methods: {
    ...mapActions(['checkAllFn']),
    ...mapMutations(['cartList', 'checkItem','initOrder']),
    //获取购物车数据
    async getData() {
      let res = await http.$axios({
        method: 'POST',
        url: '/api/selectCart',
        headers: {
          token: true,
        },
      })
      //每条数据添加一个checked属性为true
      res.data.forEach((v) => {
        v.checked = true
      })
      //将购物车数据存入vuex仓库中
      this.cartList(res.data)
    },
    //点击编辑/完成
    isNavBar() {
      this.isNavStatus = !this.isNavStatus
    },
    //删除操作
    delGoodsFn(id) {
      this.$store.dispatch('delGoodsFn', id)
    },
    //修改数量
    changeNum(value, item) {
      //当前购物车商品的id以及修改后的数量,传递给后端
      //value为当前数量,item.id为购物车商品id
      http
        .$axios({
          method: 'POST',
          url: '/api/updateNum',
          headers: {
            token: true,
          },
          data: {
            id: item.id,
            num: value,
          },
        })
        .then((res) => {
          console.log(res)
        })
    },
    //去结算页面
    goOrder() {
      //没有选择商品
      if (!this.selectList.length) {
        Toast({
          message: '请至少选择一件商品',
          duration: 1500,
        })
        return
      }
      //选择了，生成订单，跳转到结算
      //选中的购物车商品信息
      let newList = []
      this.list.forEach((item) => {
        this.selectList.filter((id) => {
          if (id == item.id) {
            newList.push(item)
          }
        })
      })
      //生成一个订单
      http
        .$axios({
          method: 'POST',
          url: '/api/addOrder',
          headers: {
            token: true,
          },
          data: {
            arr: newList,
          },
        })
        .then((res) => {
          if(!res.success) return
          //存储订单号到vuex
          this.initOrder(res.data)
          //存储订单号到本地存储
          localStorage.setItem('orderId', res.data[0].order_Id)
          console.log(res.data)
          //进入订单提交页面
          this.$router.push({
            path: '/order',
            query:{
              detail: JSON.stringify(this.selectList),
              goodsList: JSON.stringify(newList)
            }
          })
        })
    },
  },
  created() {
    this.getData()
  },
}
</script>

<style scoped lang="scss">
.cart {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5 !important;
}
h2 {
  font-size: 0;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.173333rem;
  color: #fff;
  font-size: 0.533333rem;
  background-color: #b0352f;
  .return,
  .edit {
    height: 1.173333rem;
    line-height: 1.173333rem;
    padding: 0 0.4rem;
    i {
      color: #fff;
      font-size: 0.586667rem;
    }
  }
}
section {
  overflow: scroll;
  .cart-title {
    display: flex;
    align-items: center;
    padding: 0.266667rem;
    span {
      padding: 0 0.266667rem;
      font-size: 0.533333rem;
    }
  }
  ul {
    margin-bottom: 1.173333rem;
    li {
      display: flex;
      align-items: center;
      position: relative;
      margin-bottom: 0.08rem;
      height: 2.133333rem;
      padding: 0.266667rem 0.133333rem;
      background-color: #fff;
      .checkbox {
        padding: 0 0.133333rem;
        .van-checkbox {
          i::before {
            font-size: 60px;
          }
        }
      }
      img {
        width: 2.133333rem;
        margin: 0 0.266667rem;
      }
      .goods {
        display: flex;
        flex-direction: column;
        height: 2.133333rem;
        font-size: 0.32rem;
        .goods-title {
          width: 5.333333rem;
          span {
            font-size: 0.373333rem;
          }
          i {
            position: absolute;
            right: 0.266667rem;
            top: 0.266667rem;
          }
        }
        .goods-price {
          margin-top: 0.266667rem;
          font-size: 0.426667rem;
          color: #b0352f;
        }
        .van-stepper {
          position: absolute;
          border: 1px solid #dcdcdc;
          bottom: 0.266667rem;
          right: 0.266667rem;
        }
      }
    }
  }
}
footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.2rem;
  border-top: 1px solid #ccc;
  background-color: #fff;
  .radio {
    margin: 0 0.266667rem 0 0.266667rem;
    font-size: 0.373333rem;
  }
  .total {
    flex: 1;
    height: 1.2rem;
    overflow: hidden;
    font-size: 0.373333rem;
    white-space: nowrap;
    .total-active {
      color: #b0352f;
    }
  }
  .order {
    width: 3.2rem;
    height: 100%;
    line-height: 1.2rem;
    text-align: center;
    margin: 0 0 0 0.133333rem;
    font-size: 0.48rem;
    color: #fff;
    background-color: #b0352f;
  }
}
.noData {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  a {
    color: #b0352f;
  }
}
</style>