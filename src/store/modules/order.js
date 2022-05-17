import {INIT_ORDER} from './mutations-types'
export default {
    state: {
        list: []
    },
    mutations:{
        [INIT_ORDER](state,orderId){
            state.list = orderId
        }
    }
}