import { CART_LIST, CHECK_ALL, UN_CHECK_ALL, CHECK_ITEM } from './mutations-types'
import { Toast, MessageBox } from 'mint-ui'
import http from '@/common/api/request'
export default {
    state: {
        list: [], //购物车数据
        selectList: [], //选中的数据
    },
    actions: {
        //全选/全不选
        checkAllFn({ commit, getters }) {
            getters.isCheckedAll ? commit('unCheckAll') : commit('checkAll')
        },
        //删除操作
        delGoodsFn({ state }, id) {
            let arrCart = []
            //没有选中商品
            if (state.selectList.length == 0) {
                Toast({
                    message: '请选择商品',
                    duration: 1500
                })
                return
            }
            MessageBox.confirm('确定删除商品吗?').then(action => {
                if (typeof id == 'number') {
                    //单个删除
                    arrCart = [id]
                } else {
                    //多个删除
                    arrCart = state.selectList
                }
                //删除购物车中的数据
                arrCart.forEach(v => {
                    state.list = state.list.filter(item => {
                        return item.id != v
                    })
                    state.selectList = state.selectList.filter(Item => {
                        return Item != v
                    })
                })
                //点击确认, 后台删除数据库中购物车数据
                http.$axios({
                    url: '/api/deleteCart',
                    method: 'POST',
                    data: {
                        arrId: arrCart
                    }
                }).then(res => {
                    if (res.success) {
                        //删除成功提示
                        Toast({
                            message: res.msg,
                            duration: 1500
                        })
                    }
                })
            }).catch(err => {

            })
            console.log(state.selectList);
        }
    },
    mutations: {
        [CART_LIST](state, cartArr) {
            //购物车数据存入list
            state.list = cartArr

            //初始化selectList
            state.selectList = []
            cartArr.forEach(v => {
                state.selectList.push(v.id)
            })
        },
        //全选
        [CHECK_ALL](state) {
            state.selectList = state.list.map(v => {
                v.checked = true
                return v.id
            })
        },
        //全不选
        [UN_CHECK_ALL](state) {
            state.list.forEach(v => {
                v.checked = false
            })
            state.selectList = []
        },
        //单选
        [CHECK_ITEM](state, index) {
            let id = state.list[index].id
            let i = state.selectList.indexOf(id)
            //选中数据的列表中 有 点击的商品, 则删除
            if (i != -1) {
                return state.selectList.splice(i, 1)
            }
            //选中数据的列表中 没有 点击的商品, 添加
            else {
                state.selectList.push(id)
            }
        }
    },
    getters: {
        //是否全部选中:两个数组长度是否相等
        isCheckedAll(state) {
            return state.list.length == state.selectList.length
        },
        //总计
        total(state) {
            let total = {
                num: 0,
                price: 0
            }
            state.list.forEach(v => {
                if (v.checked) {
                    total.num += ~~v.goods_num
                    total.price += v.goods_price * v.goods_num
                }
            })
            return total
        }
    },

}