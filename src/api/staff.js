import request from "@/utils/request";

export default {
    //获取会员列表信息
    /*  getList() {
       return request({
         url: "member/list",
         method: "get"
       });
     }, */

    //分页搜索方法
    //page 当前页码，size每页查询条数  searchMap条件查询的条件之
    search(page, size, searchMap) {
        return request({
            url: `/staff/list/search/${page}/${size}`,
            method: "post",
            data: searchMap
        });
    },

    //新增会员
    addStaff(pojo) {
        return request({
            url: "/staff",
            method: "post",
            data: pojo
        });
    },
    //通过id查询会员信息    
    getStaffByid(id) {
        return request({
            url: `/staff/${id}`,
            method: "get"
        });
    },
    //更新数据
    upStaffdate(pojo) {
        return request({
            url: `/staff/$(pojo.id)`,
            method: "put",
            data: pojo
        });
    },

    deleteStaffId(id) {
        return request({
            url: `/staff/${id}`,
            method: "delete"
        });
    }
};