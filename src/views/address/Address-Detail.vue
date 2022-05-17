<template>
  <div class="address-index container">
    <Header>
      <span v-if="type">添加地址</span>
      <span v-else>编辑地址</span>
    </Header>
    <van-address-edit
      v-if="type"
      :area-list="areaList"
      show-set-default
      @save="onSave"
    />
    <van-address-edit
      v-else
      show-delete
      :address-info="AddressInfo"
      :area-list="areaList"
      show-set-default
      @save="onUpdate"
      @delete="onDelete"
    />
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import Header from '@/components/address/Header.vue'
import Tabbar from '@/components/common/Tabbar.vue'
import http from '@/common/api/request'
export default {
  created() {
    let params = JSON.parse(this.$route.params.key)
    //如果是通过添加地址进入该页面，打开新的表单
    if (params == 'add') {
      this.type = true
    } else {
      //如果是通过点击地址进入该页面,显示信息
      this.AddressInfo = params
      this.AddressInfo.isDefault =
        this.AddressInfo.isDefault == 1 ? true : false
    }
  },
  components: {
    Header,
    Tabbar,
  },
  data() {
    return {
      AddressInfo: {},
      type: false,
      areaList: {
        province_list: {
          110000: '北京市',
          120000: '天津市',
        },
        city_list: {
          110100: '北京市',
          120100: '天津市',
        },
        county_list: {
          110101: '东城区',
          110102: '西城区',
          // ....
        },
      },
    }
  },
  methods: {
    //添加地址点击保存
    onSave(content) {
      content.isDefault = content.isDefault == true ? 1 : 0
      this.$router.push('/address')
      http
        .$axios({
          url: '/api/addAddress',
          method: 'POST',
          headers: {
            token: true,
          },
          data: {
            ...content,
          },
        })
        .then((res) => {
          if (!res.success) return
          Toast({
            duration: 1500,
            message: res.msg,
          })
        })
    },
    //编辑地址点击保存
    onUpdate(content) {
      content.isDefault = content.isDefault == true ? 1 : 0
      this.$router.push('/address')
      http
        .$axios({
          url: '/api/updateAddress',
          method: 'POST',
          headers: {
            token: true,
          },
          data: {
            ...content,
          },
        })
        .then((res) => {
          if (!res.success) return
          Toast({
            duration: 1500,
            message: res.msg,
          })
        })
    },
    //编辑地址点击删除
    onDelete(content) {
      this.$router.push('/address')
      http
        .$axios({
          url: '/api/deleteAddress',
          method: 'POST',
          headers: {
            token: true,
          },
          data: {
            id: content.id,
          },
        })
        .then((res) => {
          if (!res.success) return
          Toast({
            duration: 1500,
            message: res.msg,
          })
        })
    },
  },
}
</script>

<style scoped lang="scss">
.van-address-edit {
  padding: 0;
}

::v-deep .van-address-edit__buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

::v-deep .van-button {
  width: 300px;
  border-radius: 0;
}

::v-deep .van-button--danger {
  background-color: #b0352f;
}
</style>