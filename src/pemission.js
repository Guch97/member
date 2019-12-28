//路由守卫
import router from "./router"
import { getUserInfo } from "./api/login"
import store from './store'

router.beforeEach((to, from, next) => {
   const token=store.state.user.token
  //1.没有获取到token
    if (!token) {
        //不让访问，跳转加载登录页面
        //访问非登录页面，则不让访问加到登录页面
        if (to.path != "/login") {
            next({ path: "/login" })
        } else {
            //请求登录页面  /login
            next()
        }
    } else {
        //获取到token
        if (to.path === "/login") {
            next()
        } else {
            //请求非登陆页面，在本地查看是否有用户信息
            //没有获取到用户信息，则进行登录页面，否则回到登录页面
            const userInfo=store.state.user.user
            // const userInfo = localStorage.getItem("msm-user")
            if (userInfo) {
                //本地获取到，则直接去目标路由
                next()
            } else {
                //本地没有用户信息，通过token获取用户信息
                store.dispatch('GetUserInfo').then(response=>{
                  if(response.flag){
                      next()
                  }else{
                    next({path:'/login'})
                  }
                }).catch(error=>{
                    reject(error)
                })
                // getUserInfo(token).then(responese => {
                //     const resp = responese.data
                //     if (resp.flag) {
                //         //没有获取到用户信息，则进行非登录页面，否则回到登录页面
                //         localStorage.setItem("msm-user", JSON.stringify("resp.data"))
                //         next()
                //     } else {
                //         //未获取到用户信息，重新登录
                //         next({ path: "/login" })
                //     }
                // })
            }
        }
    }


})