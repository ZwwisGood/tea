import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

//公共css文件
import '@/assets/css/common.css'
//淘宝无限适配
import '@/assets/js/flexible'
//字体图标css文件
import '@/assets/css/iconfont.css'
//引入ly-tab插件
import LyTab from 'ly-tab'
//全局引入mint-ui
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);
Vue.use(LyTab)
//按需引入vant
import { Checkbox, Stepper, AddressEdit, RadioGroup, Radio } from "vant";
import 'vant/lib/index.css'
Vue.use(Checkbox);
Vue.use(Stepper);
Vue.use(AddressEdit);
Vue.use(Radio);
Vue.use(RadioGroup);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: h => h(App),
}).$mount('#app')
