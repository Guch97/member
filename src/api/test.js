import request from "@/utils/request";
const BASE_URI = process.env.VUE_APP_BASE_API;
/* request.get("/jb.json").then(response => {
        console.log(response.data)
    }) */

    
request({
  method: "get",
  url: "/jb.json"
}).then(response => {
  console.log("ceshi", response.data);
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
