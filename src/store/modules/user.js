import { USER_LOGIN, INIT_USER } from './mutations-types'
export default {
    state: {
        loginStatus: false,  //登录状态
        token: null,  //token
        userInfo: {}  //用户信息：头像、昵称
    },
    actions: {

    },
    mutations: {
        //登录后存储登录用户信息
        [USER_LOGIN](state, user) {
            state.loginStatus = true
            state.token = user.token
            state.userInfo = user
            delete user.pwd
            //持久化存储--本地存储
            let id = state.userInfo.id
            localStorage.setItem(`${id}userInfo`, JSON.stringify(user))
            localStorage.setItem(`teaUserId`, JSON.stringify(state.userInfo.id))
        },
        //初始化用户信息
        [INIT_USER](state) {
            let id = localStorage.getItem(`teaUserId`)
            let userInfo = JSON.parse(localStorage.getItem(`${id}userInfo`))
            if (userInfo) {
                state.loginStatus = true,
                    state.token = userInfo.token
                state.userInfo = userInfo
            }
        },
        //退出登录
        logOut(state) {
            let id = localStorage.getItem(`teaUserId`)
            state.loginStatus = false
            state.token = null
            state.userInfo = {}
            localStorage.removeItem(`${id}userInfo`)
            localStorage.removeItem(`teaUserId`)
        }
    },
    getters: {

    }
}