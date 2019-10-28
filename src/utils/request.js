import axios from "axios";
import { Loading } from 'element-ui';
import { Message } from 'element-ui';

/* axios.get("/da.json").then(response=>{
    const data=response.data
})
*/



const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
});

/* request.get('/jb.json').then(response => {
    console.log(response.data)
}) */
const loading = {
        loadingInstance: null,
        //打开加载
        open: function() {
            if (this.loadingInstance === null) {
                this.loadingInstance = Loading.service({
                    target: ".main",
                    text: "拼命加载中....",
                    background: "rgba(0, 0, 0, 0.2)"
                });
            }
        },

        //关闭加载
        close: function() {
            if (this.loadingInstance !== null) {
                this.loadingInstance.close()
            }
            this.loadingInstance = null
        }
    }
    //请求拦截器
request.interceptors.request.use(config => {
    loading.open()
    return config
}, error => {
    loading.close()
        //出现异常
    return Promise.reject(error)
})

    //响应拦截器
request.interceptors.response.use(response => {
    loading.close()
    const resp = response.data
        //后台正常响应状态码
    if (resp.code !== 2000) {
        Message({
            message: "resp.message" || "系统异常",
            type: "warning",
            duration: 5 * 1000
        })
    }
    return response
}, error => {
    //关闭窗口
    loading.close()
        //出现异常
    return Promise.reject(error)
})
export default request;