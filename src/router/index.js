import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import store from '@/store/index'

Vue.use(VueRouter)

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        //重定向
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/list',
        name: 'List',
        component: () => import('../views/List')
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/Cart')
    },
    {
        path: '/my',
        name: 'My',
        component: () => import('../views/My')
    },
    {
        path: '/search',
        component: () => import('../views/Search'),
        children: [
            {
                path: '/',
                component: () => import('../views/search/Search-index')
            },
            {
                path: 'list',
                name: 'list',
                component: () => import('../views/search/Search-list')
            }
        ]
    },
    {
        path: '/detail',
        name: 'Detail',
        meta: {
            keepAlive: true  //此组件需要缓存
        },
        component: () => import('../views/Detail')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login/Login')
    },
    {
        path: '/userLogin',
        name: 'UserLogin',
        component: () => import('../views/login/UserLogin')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/login/Register')
    },
    {
        path: '/recovery',
        component: () => import('../views/recovery/Recovery'),
        children: [
            {
                path: '/',
                name: 'index',
                component: () => import('../views/recovery/RecoveryIndex')
            },
            {
                path: 'btn',
                name: 'btn',
                component: () => import('../views/recovery/RecoveryBtn')
            }
        ]
    },
    {
        path: '/address',
        component: () => import('../views/Address'),
        children: [
            {
                path: '/',
                name: 'address-index',
                component: () => import('../views/address/Address-Index')
            },
            {
                path: 'address-detail',
                name: 'address-detail',
                component: () => import('../views/address/Address-Detail')
            },
        ]
    },
    {
        path: '/order',
        component: () => import('../views/Order'),
        meta: {
            keepAlive: true  //此组件需要缓存
        },
    },
    {
        path: '/payment',
        component: () => import('../views/Payment'),
    }
]

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})

router.beforeEach((to, from, next) => {
    let id = localStorage.getItem('teaUserId')
    let user = JSON.parse(localStorage.getItem(`${id}userInfo`))
    //已经登录,不能再去登录页
    // if (user) {
    //     if (to.path == '/login') {
    //         next('/home')
    //     }
    //     next()
    // }
    //没登录
    if (!user) {
        if (to.path == '/pay' || to.path == '/payment' || to.path == '/order' || to.path == '/cart' || to.path == '/address') {
            next('/login')
        } else {
            next()
        }
    }
    next()
})

export default router
