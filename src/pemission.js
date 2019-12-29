//路由守卫
import router from "./router"
import { getUserInfo } from "./api/login"
import store from './store/index'
router.beforeEach((to, from, next) => {
   const token=store.state.user.token
  // const token='admin-token'
  //1.没有获取到token
    if (!token) {
        if (to.path != "/login") {
            next({ path: "/login" })
      } else {
            next()
        }
      }else {
        //获取到token
        if (to.path =="/login") {
            next()
          } else {
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