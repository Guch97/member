<template>
<div>
    <span class="demonstration"><h2>欢迎访问会员管理系统</h2></span>
    <span class="date" style="float:right "><h2>{{time}}</h2></span>
<img src="../../assets/index.png" style="width:100%;"/>
   
</div>


</template>


<script>
import date from '../../date';
  export default {
    data() {
      return {
         time:new Date(),
      }
    },
    mounted(){
         this.nowTimes();
    },
    methods:{
      // 获取当前时间函数
        timeFormate(timeStamp) {
            let year = new Date(timeStamp).getFullYear();
            let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
            let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
            let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
            let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
            // let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
            // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
            this.time = year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
        },
        // // 定时器函数
        nowTimes(){
            this.timeFormate(new Date());
            setInterval(this.nowTimes,60*1000);
            this.clear();
        },
        //清楚定时器
        clear(){
            clearInterval(this.nowTimes)
            this.nowTimes = null;
      }
    }
  }
</script>

<style scoped>
div{
  text-align: center;
}
h2{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.demonstration{
margin: 0 auto;
font-size:30px;
 
}



</style>
