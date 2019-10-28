import request from "@/utils/request";

export default {
    //分页条件查询
    search(page, size, searchMap) {
        return request({
            url: `/goods/list/search/${page}/${size}`,
            method: "post",
            data: searchMap
        });
    },
    //新增商品
    addDate(pojo) {
        return request({
            url: "/goods",
            method: "post",
            data: pojo
        });
    },
    //通过id查询商品信息
    getByid(id) {
        return request({
            url: `/goods/${id}`,
            method: "get"
        });
    },
    //更新数据
    update(pojo) {
        return request({
            url: `/goods/$(pojo.id)`,
            method: "put",
            data: pojo
        });
    },
    deleteByid(id) {
        return request({
            url: `/goods/${id}`,
            method: "delete"
        });
    }
};