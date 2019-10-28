<template>
<div>

  <!--表单一行显示-->
  <el-form ref="searchForm" :inline="true" :model="searchMap" class="demo-form-inline" style="magin-top:20px;">
  <el-form-item prop="username" >
    <el-input v-model="searchMap.username" placeholder="账号" style="width:200px;"></el-input>
  </el-form-item>
  <el-form-item prop="name">
    <el-input v-model="searchMap.name" placeholder="姓名" style="width:200px;"></el-input>
  </el-form-item>


  <el-form-item>
    <el-button type="primary" @click="fetchData">查询</el-button>
     <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-button  @click="resetForm('searchForm')">重置</el-button>
  </el-form-item>
</el-form>


  <el-table
    :data="list"
    height="380"
    border
    style="width: 100%">
    <el-table-column type="index" label="序号" width="60px;"></el-table-column>
    <el-table-column prop="username" label="账号" ></el-table-column>
    <el-table-column prop="name" label="姓名"  width="90px;" ></el-table-column>
    <el-table-column prop="age" label="年龄" ></el-table-column>
    <el-table-column prop="mobile" label="电话" ></el-table-column>
    <el-table-column prop="salary" label="薪酬"></el-table-column>
    <el-table-column prop="entryDate" label="入职时间" ></el-table-column>
    <el-table-column label="操作" width="150px;">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row.id)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<!--弹出新增窗口-->
<!--ref表单id-->
 <el-dialog title="编辑员工" :visible.sync="dialogFormVisible" width="30%">
   <el-form :model="pojo"
  :rules="rules"
  ref="pojoForm"
  label-width="100px"
  label-position="right"
  style="width:75%;"
  >
    <el-form-item label="账号" prop="username">
      <el-input v-model="pojo.username"></el-input>
    </el-form-item>
     <el-form-item label="姓名" prop="name" >
      <el-input v-model="pojo.name"></el-input>
    </el-form-item>
     </el-form-item>
     <el-form-item label="年龄" prop="age" >
      <el-input v-model="pojo.age"></el-input>
    </el-form-item>
  <el-form-item label="电话" prop="mobile"> 
   <el-input v-model="pojo.mobile"></el-input>
 </el-form-item>
   <el-form-item label="薪酬" prop="salary"> 
   <el-input v-model="pojo.salary"></el-input>
 </el-form-item>
 <el-form-item label="入职时间 "> 
    <el-date-picker value-format="yyy-MM-dd"  prop="entryDate" v-model="pojo.entryDate" style="width:200px;" type="date" placeholder="入职时间"></el-date-picker>
 </el-form-item>
   </el-form>
  <div slot="footer" class="dialog-footer" >
    <el-button @click="dialogFormVisible = false">取 消</el-button>
     <el-button type="primary" @click="pojo.id===null? addList('pojoForm'):updateData('pojoForm')">确 定</el-button>
  </div>

 </el-dialog>



   <!--底部分页-->
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40,50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</div>
</template>

<script>
import staffApi from "@/api/staff"

export default {
  created(){
    //初始化获取列表数据
    this.fetchData()
  },
data(){
     return{
       list:[],
       total:0,//总记录数
       currentPage:1,//当前页码
       pageSize:10,//每页显示10条数据
       searchMap:{
         username:"",
         name:"",
       },
       dialogFormVisible:false,//控制对话框
       pojo:{
         id:"null",
         username:"",
         name:"",
         entryDate:"",
         mobile:"",
         age:"",
         salary:"",
       },//提交的数据
       rules:{
         username:[
           {required:true,message:"账号不能为空",trigger:'blur'}
         ],
           name:[
           {required:true,message:"姓名不能为空",trigger:'blur'}
         ],
       },
     }
  },
  methods:{
    /*  fetchData(){
       memberApi.getList().then(response=>{
         const resp =response.data
         this.list=resp.data
         console.log(resp)
       })
     }, */
     //每页显示条数改变后，被触发 val 是最新条数
     handleSizeChange(val){
       this.pageSize=val
       this.fetchData()
     },
     
    //当页码改变后，被触发，val是最新的页面
     handleCurrentChange(val){
          this.currentPage=val
          this.fetchData()
      },

     fetchData(){
       //调用分页查询数据
       staffApi.search(this.currentPage,this.pageSize,this.searchMap).then(response=>{
         const resp =response.data
         this.list=resp.data.rows
         this.total=resp.data.total
    
       })
     },
     //打开编辑窗口
     handleEdit(id){
     //清除表单数据和校验结果
     this.handleAdd()
      staffApi.getStaffByid(id).then(response=>{
        const resp=response.data
        if(resp.flag){
          this.pojo=resp.data
        }
      })
     },
    //删除会员
     handleDelete(id){
     this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //确认
       staffApi.deleteStaffId(id).then(response=>{
        const resp=response.data
        if(resp.flag){
          //删除成功刷新列表数据
           this.$message({
            type: 'success',
            message: '成功删除'
          });        
          this.fetchData()
        }
      })
        }).catch(() => {
          //取消
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

     },
     
     //窗口点击确定提交数据
     addList(formName){
       //加载dom
       this.$refs[formName].validate(valid=>{
         if(valid){
          staffApi.addStaff(this.pojo).then(response=>{
             const resp=response.data
             if(resp.flag){
               //新增成功 刷新列表数据
              this.$message({
             message:"新增成功，员工初始密码为123",
             type:"success"
               })

            this.fetchData()
            this.dialogFormVisible=false//关闭窗口
             }else{
           this.$message({
             message:"新增失败",
             type:"warning"
               })
             }    
          })
         }else{
           return false
         }
       });
  },

      //重置
     resetForm(formName){
         
      //重置找 el-form-item 组件元素prop指定的字段名
        this.$refs[formName].resetFields();//清空
      },
      //弹出新增窗口
      handleAdd(){
        //this.pojo={}
        this.dialogFormVisible=true
        this.$nextTick(()=>{
          //this.$nextTick()异步事件，渲染结束之后，回调函数才会执行
          //弹出窗口之后需要加载DOM元素,等待加载完之后进行调用
        this.$refs['pojoForm'].resetFields();
        })
     
       },
        //确定刷新
      updateData(formName){
      this.$refs[formName].validate(valid=>{
           if(valid){
             //提交更新
         staffApi.upStaffdate(this.pojo).then(response=>{
               const resp =response.data
               if(resp.flag){
                 //刷新列表
                 this.fetchData()
                 this.dialogFormVisible=false
               }else{
                  message:"提交失败"
                  type:"warning"
               }
             })
           }
           else{
             return false
           }
          })
       }
  },
}
</script>

<style scoped>



</style>