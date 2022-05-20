import { Indicator } from 'mint-ui';
import axios from 'axios'
import store from '@/store'
import router from '@/router'

export default {
    common: {
        method: 'GET',
        data: {},
        params: {},
        headers: {}
    },
    //二次封装axios
    $axios(options = {}) {
        options.method = options.method || this.common.method
        options.data = options.data || this.common.data
        options.params = options.params || this.common.params
        options.headers = options.headers || this.common.headers

        //请求前显示加载中
        // Indicator.open('加载中...')

        //判断是否是登录状态
        if (options.headers.token) {
            //请求头中添加token字段
            options.headers.token = store.state.user.token
            if (!options.headers.token) {
                router.push('/login')
            }
        }

        return axios(options).then(v => {
            let data = v.data.data
            //1000是token过期返回的状态码，token过期重新登录
            if (data.code == 1000) {
                localStorage.removeItem('userInfo')
                store.state.user.userInfo = {}
                store.state.user.loginStatus = false
                return router.push('/login')
            }
            return new Promise((res, rej) => {
                if (!v) return rej()
                //关闭加载中
                // setTimeout(() => {
                //     Indicator.close()
                // }, 0)
                res(data)
            })
        })
    }
}