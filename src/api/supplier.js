import request from "@/utils/request";

export default {
    /*  getList() {
         return request({
             url: "/supplier/list",
             method: "get"
         });
     }, */
    //分页搜索方法
    //page 当前页码，size每页查询条数  searchMap条件查询的条件之
    search(page, size, searchMap) {
        return request({
            url: `/supplier/list/search/${page}/${size}`,
            method: "post",
            data: searchMap
        });
    },
    //新增供应商
    addDate(pojo) {
        return request({
            url: "/supplier",
            method: "post",
            data: pojo
        });
    },
    //通过id查询会员信息
    getById(id) {
        return request({
            url: `/supplier/${id}`,
            method: "get"
        });
    },
    //更新数据
    upDate(pojo) {
        return request({
            url: `/supplier/$(pojo.id)`,
            method: "put",
            data: pojo
        });
    },
    //删除
    deleteById(id) {
        return request({
            url: `/member/${id}`,
            method: "delete"
        });
    }

};