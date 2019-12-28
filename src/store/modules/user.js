import {getToken,setToken,getUser,setUser,removeToken} from '../../utils/auth'

import  {login,getUserInfo,logout}   from '../../api/login'

const user={
  state: {
    token:getToken(),
    user:getUser(),
  },
  mutations: {
    SET_TOKEN(state,token){
      state.token=token
      //保存 token
      setToken(token)
    },
    SET_USER(state,user){
      state.user=user
      setUser(user)
    }
  },
  actions: {
    Login({commit,form}){
      return new Promise((resolve,reject)=>{
          login(form.username.trim(),form.password).then(response=>{
            const resp=response.data  
            console.log(resp)
            commit('SET_TOKEN',resp.data.token) 
            resolve(resp)
        }).catch(error=>{
            reject(error)
        })
      })
    },
    GetUserInfo({commit,state}){
      return new Promise((resolve,reject)=>{
        getUserInfo(state.token).then(response=>{
          const respUser=response.data
          commit('SET_USER',respUser.data)
            resolve(respUser)
           }).catch(error=>{
              reject(error)
           })
        })
      },
    Logout({commit,state}){
      return new Promise((resolve,reject)=>{
        logout(state.token).then(resposne=>{
          const resp=response.data
          commit('SET_TOKEN',null)
          commit('SET_USER',null)
            removeToken()
            resolve(resp)
            }).catch(error=>{
              reject(error)
          })
        })
      }  
    }
  }
export default user