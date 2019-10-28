<template>
<div>
    <app-header></app-header>
    <app-main></app-main>
    <app-navbar></app-navbar>


</div>
</template>

<script>
import AppHeader from "./App.Header"
import AppMain from "./AppMain"
import AppNavbar from "./AppNavbar"
export default{
    components:{
        AppHeader,
        AppMain,
        AppNavbar,

    }
}

</script>



<style scoped>
/*头部*/
.header{
    position: absolute;
    line-height: 60px;
    background-color:#D0D0D0;
    top:0;
    left:0;
    right:0;
    }

.navbar{
    position: absolute;
    width: 200px;
    background: #545c64;
    top:60px;
    left:0;
    bottom:0;
    overflow-y:auto;
    box-sizing: border-box;
}
.main{
    position: absolute;
    top:60px;
    right:0;
    bottom:0;
    left:200px;
    padding:1px;
    overflow: auto;
   
  
    box-sizing: border-box;
}






</style>
