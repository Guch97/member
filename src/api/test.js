import request from "@/utils/request";
const BASE_URI = process.env.VUE_APP_BASE_API;
    
request({
  method: "get",
  url: "/jb.json"
}).then(response => {

});

export default {
  getList() {
    const req = request({
      method: "get",
      url: "/jb.json"
    });
    return req;
  }
};
