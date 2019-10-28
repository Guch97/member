import request from "@/utils/request"



export default {
    //校验密码userID，password
    checkPwd(userID, password) {
        return request({
            url: '/user/pwd',
            method: "post",
            data: {
                userID,
                password
            }
        })
        
    },
    //修改密码userID,password新密码
    uppwd(userID, password) {
        return request({
            url: '/user/pwd',
            method: "put",
            data: {
                userID,
                password
            }
        })

    }
}