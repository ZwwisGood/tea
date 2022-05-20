import {USER_LOGIN,INIT_USER} from './mutations-types'
export default{
    state:{
        loginStatus:false,  //登录状态
        token:null,  //token
        userInfo:{}  //用户信息：头像、昵称
    },
    actions:{

    },
    mutations:{
        //登录后存储登录用户信息
        [USER_LOGIN](state,user){
            state.loginStatus = true,
            state.token = user.token
            state.userInfo = user
            delete user.pwd
            //持久化存储--本地存储
            localStorage.setItem('userInfo',JSON.stringify(user))
        },
        //初始化用户信息
        [INIT_USER](state){
            let userInfo = JSON.parse(localStorage.getItem('userInfo'))
            if(userInfo){
                state.loginStatus = true,
                state.token = userInfo.token
                state.userInfo = userInfo
            }
        },
        //退出登录
        logOut(state){
            state.loginStatus = false,
                state.token = null
                state.userInfo = {}
                localStorage.removeItem('userInfo')
        }
    },
    getters:{

    }
}