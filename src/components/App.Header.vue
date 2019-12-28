<template>
 <div class="header">

   <a href="#/">
   <img  class="logo" src="../assets/logo.png" alt="logo" width="25px">
   <span class="company">会员管理系统
   </span>
   </a>


   



 <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
       {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit" command="a">修改密码</el-dropdown-item>
        <el-dropdown-item icon="el-icon-arrow-down" command="b">退出</el-dropdown-item>
      </el-dropdown-menu>
  </el-dropdown>

<!--修改密码-->
<el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="30%">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" style="width:325px;">
  <el-form-item label="原密码" prop="oldPass">
    <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</el-dialog>


 </div>
</template>

<script>
import passwordApi from "@/api/password"
import {logout} from "@/api/login"
export default {
  data(){
    //与后台验证
    const validateoldPass=(rule, value, callback)=>{
       passwordApi.checkPwd(this.user.id,value).then(response=>{
        const resp=response.data
            if(resp.flag){
              callback()
            }else{
              callback(new Error(resp.message))
            }
       })
    } //检验确认密码是否一致
     const validatePass=(rule, value, callback)=>{
       //value为确认密码值
       if(value !==this.ruleForm.pass){
         callback(new Error("两次输入密码不一致"))
       }else{
         callback()
       }
     }
    return{
      user:this.$sotre.state.user.user,
      dialogFormVisible:false,
      ruleForm:{
        oldPass:"",
        pass:"",
        checkPass:"",
      },
      rules:{
             oldPass:[
                {required:true,message:"旧密码不能为空",trigger:'blur'},
                 { validator: validateoldPass, trigger: 'blur' }

             ],
              pass:[
                {required:true,message:"新密码不能为空",trigger:'blur'}
             ],
             checkPass:[
                {required:true,message:"确认密码不能为空",trigger:'blur'},
                 { validator: validatePass, trigger: 'change' }
             ],
      }
    }
  },

  methods:{
  handleCommand(command) {
       data:{
         token:""
       }
        switch(command){
           //修改密码
          case "a":
          this.dialogFormVisible=true
          break;
           //退出系统
           case "b":
              this.handleLogout()
          break;
        }
    },
    //退出系统
  handleLogout(){
    this.$store.dispatch('Logout').then(response=>{
      if(repsonse.flag){
        this.$router.push("/login")
      }else{
          this.$message('失败')
      }
    })
    // logout(localStorage.getItem('msm-token')).then(response=>{           
    //         const resp=response.data
    //           if(resp.flag){
    //             //退出成功 
    //             //清除本地数据
    //             localStorage.removeItem("msm-token")
    //             localStorage.removeItem("msm-use    this.$router.push("/login")r")
    //              //回到登录页面
    //          
    //           }else{
    //              this.$message({
    //             message: '警告哦，这是一条警告消息',
                
    //              })
    //           }
    //         })
          },
      //重置
     resetForm(formName){
      //重置找 el-form-item 组件元素prop指定的字段名
        this.$refs[formName].resetFields();//清空
      },
      //修改密码确认
      submitForm(formName){
         this.$refs[formName].validate(valid=>{
           if(valid){
             passwordApi.uppwd(this.user.id,this.ruleForm.checkPass).then(response=>{
               const resp=response.data
                this.$message({
                message:resp.message,
                type:resp.flag?"success":"warning"
              });        
              if(resp.flag){
                //更新成功推出系统
                  this.handleLogout()
                  this.dialogFormVisible=false
              }
             })
           }else{
             return false
             }
         })
      }
  }
};
</script>

<style scoped>

.logo{
  vertical-align: middle;
  padding:0px 10px 0  40px;
}
.company{
  color:#000000;
  position: absolute;
}

/*下拉菜单*/ 
.el-dropdown{
  float:right;
  margin-right: 40px;
}
.el-dropdown-link{
  color:#000000;
  cursor: pointer;
  font-size:16px;
}




</style>