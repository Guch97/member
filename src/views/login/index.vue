<template>
  <div class="login-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="login-form"
    >
      <h2 class="login-title">会员管理系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, getUserInfo } from "../../api/login"
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      //验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('Login',this.ruleForm).then(response=>{
            if(reponse.flag){
              this.$route.push('/')
            }
          }).catch(error=>{
            this.$message({
              message:'失败',
              type:'info'
            })

          })
          //表单数据提交给后台验证是否正确
          // login(this.ruleForm.username, this.ruleForm.password).then(
          //   response => {
          //     const resp=response.data
          //     console.log(resp,resp.flag,resp.data.token);
          //     //验证成功 拿取用户名和密码
          //     if(resp.flag){
          //       getUserInfo(resp.data.token).then(response=>{
          //         const respUser=response.data
          //         //获取用户的数据
          //         if(respUser.flag){
          //            console.log("userInfo",respUser.data)
          //         //保存token用户信息
          //          localStorage.setItem("msm-user",JSON.stringify(respUser.data))
          //          localStorage.setItem("msm-token",resp.data.token)
          //         //前往首页
          //         this.$router.push("/")
          //         }else{
          //            this.$message.error('登录失败');
          //         return false;
          //         }
          //       })
          //     }
          //   }
          // );
        } else {
         this.$message.error('登录失败');
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.login-form {
  width: 350px;
  margin: 250px auto;
  border-radius: 20px;
  padding: 28px;
 
}
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/test1.jpg") no-repeat center;
  background-size: cover;
}
.login-title {
  color: #303133;
  text-align: center;
}
</style>
