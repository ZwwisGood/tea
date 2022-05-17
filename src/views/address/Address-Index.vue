<template>
  <div class="address-index container">
    <Header> </Header>
    <section>
      <ul v-if="addressList.length">
        <li @click="goDetail(item)" v-for="(item, index) in addressList" :key="index">
          <div>
            <span>{{ item.name }}</span
            >&nbsp;
            <span> {{ item.tel }}</span>
          </div>
          <div>
            <span class="red" v-show="item.isDefault == 1">[默认]</span>
            <span>
              {{ item.province }} {{ item.city }} {{ item.county }}
              {{ item.addressDetail }}
            </span>
          </div>
        </li>
      </ul>
      <span v-else class="noAddress">暂无地址</span>
      <div @click="goDetail('add')" class="add-address">添加地址</div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from '@/components/address/Header.vue'
import Tabbar from '@/components/common/Tabbar.vue'
import http from '@/common/api/request'
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      addressStatus: false
    }
  },
  components: {
    Header,
    Tabbar,
  },
  computed: {
    ...mapState({
      addressList: (state) => state.address.addressList,
    }),
  },
  methods: {
    //将地址数据存入vuex仓库的方法
    ...mapMutations(['initData']),
    //进入地址详情
    goDetail(option) {
      //如果是订单页面进入，则是选择状态
      if(this.addressStatus){
        this.$bus.$emit('getAddress',JSON.stringify(option))
        this.$router.back()
        return
      }
      this.$router.push({
        name: 'address-detail',
        params:{
          key: JSON.stringify(option)
        }
      })
    },
    //获取该用户的地址数据
    getData() {
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
        })
    },
  },
  created() {
    //从订单页面进入
    if(this.$route.query.type == 'select'){
      this.addressStatus = true
    }
    this.getData()
  },
}
</script>

<style scoped lang="scss">
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  padding-bottom: 2.133333rem;
  overflow: scroll;
  ul {
    width: 100%;
    li {
      margin-top: 0.266667rem;
      padding: 0.32rem 0.4rem;
      background-color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      div {
        line-height: 0.613333rem;
        &:first-child {
          font-weight: 600;
        }
      }
      span {
        font-size: 0.373333rem;
      }
    }
  }
}
.add-address {
  margin-top: 0.933333rem;
  width: 3.2rem;
  line-height: 0.933333rem;
  font-size: 0.373333rem;
  color: #fff;
  text-align: center;
  background-color: #b0352f;
  border-radius: 3px;
}
.red {
  color: #b0352f;
}
.noAddress {
  font-size: 16px;
  margin-top: 0.8rem;
}
</style>