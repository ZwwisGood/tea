import { INIT_DATA } from "./mutations-types"
export default {
    state: {
        addressList:[]
    },
    actions: {},
    mutations: {
        [INIT_DATA](state, addressList){
            state.addressList = addressList
        }
    },
    getters: {
        defaultAddress(state){
            return state.addressList.filter(item=>{
                return item.isDefault == 1
            })
        }
    },
}