<template>
  <div class="navbar" style="background:white">
<el-menu
        :router="true"
      default-active="/"
      class="el-menu-vertical-demo"
      background-color="white"
      text-color="#666666"
      active-text-color="#000000"
      
      >
    
      <el-menu-item index="/" >
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
       <el-menu-item index="/member/" >
        <i class="el-icon-user-solid"></i>
        <span slot="title" >会员管理</span>
      </el-menu-item>
       <el-menu-item index="/supplier/">
        <i class="el-icon-s-cooperation"></i>
        <span slot="title">供应商管理</span>
      </el-menu-item>
       <el-menu-item index="/goods/">
        <i class="el-icon-s-goods"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
       <el-menu-item index="/staff/">
        <i class="el-icon-user"></i>
        <span slot="title">员工管理</span>
      </el-menu-item>
   
     
    </el-menu>

 
  </div>
</template>

<script>
export default {
data(){
     return{
     }
  }
}
</script>

<style scoped>
.el-menu {
    border-right: 0;
 
}
.navbar{
  background: white!important;
}
.Nav{
  position: absolute;
  bottom: 0;
}