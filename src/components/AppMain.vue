<template>
  <div class="main">
    <el-breadcrumb  v-show="$route.path !== '/home'" separator="/">
  <el-breadcrumb-item  class="line" :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>

</el-breadcrumb>

 <router-view></router-view>

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
.el-breadcrumb{
  height: 10px;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-left:0px;
}
.line{
  border-left:3px solid yellow;
  padding-left:10px;
}

</style>