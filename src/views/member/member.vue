<template>
<div>

  <!--表单一行显示-->
  <el-form ref="searchForm" :inline="true" :model="searchMap" class="demo-form-inline" style="magin-top:20px;">
  <el-form-item prop="cardNum" >
    <el-input v-model="searchMap.cardNum" placeholder="会员卡号" style="width:200px;"></el-input>
  </el-form-item>
  <el-form-item prop="name">
    <el-input v-model="searchMap.name" placeholder="会员名字" style="width:200px;"></el-input>
  </el-form-item>
  <el-form-item prop="payType">
    <el-select v-model="searchMap.payType" placeholder="支付类型" style="width:110px;">
      <!-- payTypeOptaions绑定data--->
      <el-option  v-for="option in payTypeOptaions"
        :key="option.type" 
       :label="option.name" 
       :value="option.type"></el-option>
    </el-select>
  </el-form-item>
<!-- 选择日期-->
 <el-form-item prop="birthday"> 
    <el-date-picker value-format="yyy-MM-dd" v-model="searchMap.birthday" style="width:200px;" type="date" placeholder="出生日期"></el-date-picker>
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
    <el-table-column prop="cardNum" label="会员卡号" ></el-table-column>
    <el-table-column prop="name" label="会员姓名"  width="90px;" ></el-table-column>
    <el-table-column prop="birthday" label="会员生日" ></el-table-column>
    <el-table-column prop="phone" label="手机号码" ></el-table-column>
    <el-table-column prop="integral" label="可用积分"></el-table-column>
    <el-table-column prop="money" label="开卡金额" ></el-table-column>
    <el-table-column prop="payType" label="支付类型" ></el-table-column>
    
  

    <el-table-column prop="address" label="会员地址" ></el-table-column>
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
  <el-dialog title="会员编辑" :visible.sync="dialogFormVisible" width="30%">
  <el-form :model="pojo"
  :rules="rules"
  ref="pojoForm"
  label-width="100px"
  label-position="right"
  style="width:75%;"
  >
    <el-form-item label="会员卡号" prop="cardNum">
      <el-input v-model="pojo.cardNum"></el-input>
    </el-form-item>
     <el-form-item label="会员姓名" prop="name" >
      <el-input v-model="pojo.name"></el-input>
    </el-form-item>
  <el-form-item label="会员生日 "> 
    <el-date-picker value-format="yyy-MM-dd"  prop="birthady" v-model="pojo.birthday" style="width:200px;" type="date" placeholder="出生日期"></el-date-picker>
 </el-form-item>
     <el-form-item label="手机号码" prop="phone">
      <el-input v-model="pojo.phone" ></el-input>
    </el-form-item>
     <el-form-item label="开卡金额" prop="money" >
      <el-input v-model="pojo.money" ></el-input>
    </el-form-item>
    <el-form-item label="可用积分"  prop="integral">
      <el-input v-model="pojo.integral" ></el-input>
    </el-form-item>
    <el-form-item label="会员地址" prop="address">
      <el-input v-model="pojo.address" type="textarea" ></el-input>
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
import memberApi from "@/api/member"
const payTypeOptaions = [
   {type:"1",name:"现金"},
   {type:"2",name:"微信"},
   {type:"3",name:"支付宝"},
   {type:"4",name:"银行卡"},
  ]


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
         cardNum:"",
         name:"",
         birthday:"",
         payType:"",
        
         
       },
       payTypeOptaions, //条件查询绑定的条件之
       dialogFormVisible:false,//控制对话框
       pojo:{
         id:"null",
         cardNum:"",
         name:"",
         birthday:"",
         phone:"",
         money:0,
         address:"",
         integral:0,
       },//提交的数据
       rules:{
         cardNum:[
           {required:true,message:"卡号不能为空",trigger:'blur'}
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
       memberApi.search(this.currentPage,this.pageSize,this.searchMap).then(response=>{
         const resp =response.data
         this.list=resp.data.rows

         this.total=resp.data.total
       })
     },
     //打开编辑窗口
     handleEdit(id){
     //清除表单数据和校验结果
     this.handleAdd()
      memberApi.getByid(id).then(response=>{
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
        memberApi.deleteByid(id).then(response=>{
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
           memberApi.add(this.pojo).then(response=>{
             const resp=response.data
             if(resp.flag){
               //新增成功 刷新列表数据
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
      updateData(formName){
    this.$refs[formName].validate(valid=>{
           if(valid){
             //提交更新
             memberApi.update(this.pojo).then(response=>{
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

  filters: {
      payTypeFilter(type){
      //数组的每一个值和传入的type判断
      //过滤器当中不能引用当前实例this
      const payObj=payTypeOptaions.find(obj=>obj.type ===type)
      return payObj?payObj.name:null
      
    }
  }
}
</script>

<style scoped>



</style>