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
            url: `/member/list/search/${page}/${size}`,
            method: "post",
            data: searchMap
        });
    },

    //新增会员
    add(pojo) {
        return request({
            url: "/member",
            method: "post",
            data: pojo
        });
    },
    //通过id查询会员信息
    getByid(id) {
        return request({
            url: `/member/${id}`,
            method: "get"
        });
    },
    //更新数据
    update(pojo) {
        return request({
            url: `/member/$(pojo.id)`,
            method: "put",
            data: pojo
        });
    },

    deleteByid(id) {
        return request({
            url: `/member/${id}`,
            method: "delete"
        });
    }
};