<template>
<div>


  <!--表单一行显示-->
  <el-form ref="searchForm" :inline="true" :model="searchMap" class="demo-form-inline" style="magin-top:20px;">
  <el-form-item prop="name" >
    <el-input v-model="searchMap.name" placeholder="供应商名称" style="width:200px;"></el-input>
  </el-form-item>
  <el-form-item prop="linkman" v-if="!isDialog">
    <el-input v-model="searchMap.linkman" placeholder="联系人" style="width:200px;"></el-input>
  </el-form-item>
  <el-form-item prop="mobile" v-if="!isDialog">
    <el-input v-model="searchMap.mobile" placeholder="联系电话" style="width:200px;"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="fetchData">查询</el-button>
     <el-button v-if="!isDialog" type="primary"  @click="handleAdd" >新增</el-button>
    <el-button  v-if="!isDialog" @click="resetForm('searchForm')">重置</el-button>
    
   
  </el-form-item>
</el-form>



<!--highlight-current-row激活单选行-->
<!-- @current-change当点击某一行后，触发事件-->
  <!--内容信息-->
     <el-table
     :highlight-current-row="isDialog"
    @current-change="handleCurrent"
    :data="list"
    height="380"
    border
    style="width: 100%">
    <el-table-column type="index" label="序号" width="60px;"></el-table-column>
    <el-table-column prop="name" label="供应商名称" ></el-table-column>
    <el-table-column prop="linkman" label="联系人"  width="90px;" ></el-table-column>
    <el-table-column v-if="!isDialog" prop="mobile" label="联系电话" ></el-table-column>
    <el-table-column v-if="!isDialog" prop="remark" label="备注" ></el-table-column>
    <el-table-column v-if="!isDialog" label="操作" width="150px;">
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
  <el-dialog v-if="!isDialog"
  title="供应商编辑" :visible.sync="dialogFormVisible" width="30%">
  <el-form :model="pojo"
  :rules="rules"
  ref="pojoForm"
  label-width="100px"
  label-position="right"
  style="width:75%;"
  >
    <el-form-item label="供应商名称" prop="name">
      <el-input v-model="pojo.name"></el-input>
    </el-form-item>
     <el-form-item label="联系人" prop="linkman" >
      <el-input v-model="pojo.linkman"></el-input>
    </el-form-item>
  <el-form-item label="联系电话" prop="mobile"> 
   <el-input v-model="pojo.mobile"></el-input>
 </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="pojo.remark" type="textarea" ></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer" >
    <el-button @click="dialogFormVisible = false">取 消</el-button>
     <el-button type="primary" @click="pojo.id===null? addList('pojoForm'):upDateList('pojoForm')">确 定</el-button>
  </div>
  </el-dialog>




<!--底部分页-->
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40,50]"
      :page-size="pageSize"
      :layout="!isDialog? 'total, sizes, prev, pager, next, jumper':' prev, pager,next'"
      :total="total">
    </el-pagination>



</div>
</template>

<script>
import supplierApi from "@/api/supplier"
export default {
  props:{
    //接受父组件
    //true为弹框，false为默认
    isDialog:Boolean
  },
  data(){
    return{
      list:[],
      currentPage:1,//当前页码
       pageSize:10,//每页显示10条数据
       total:0,
         searchMap:{
           name:"",
           linkman:"",
           mobile:"",
                  },
         dialogFormVisible:false,
           pojo:{
             name:"",
             linkman:"",
             mobile:"",
             remark:"",
             id:null  //id为空为新增
                },
           rules:{
             name:[
                {required:true,message:"供应商不能为空",trigger:'blur'}
             ],
              linkman:[
                {required:true,message:"联系人不能为空",trigger:'blur'}
             ]

           },
           
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(){
      supplierApi.search(this.currentPage,this.pageSize,this.searchMap).then(response=>{
        this.list=response.data.data.rows,
        this.total=response.data.data.total
      })
    },
    //编辑
    handleEdit(id){
      //清除表单数据和校验结果
     this.handleAdd()
     supplierApi.getById(id).then(response=>{
       const resp=response.data
     this.pojo=resp.data
     })

     },
     //删除
     handleDelete(id){
     this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //确认
        supplierApi.deleteById(id).then(response=>{
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
    //窗口点击确定提交数据 新增
     addList(formName){
       //加载dom
       this.$refs[formName].validate(valid=>{
         //校验通过
         if(valid){
   
           //提交表单
           supplierApi.addDate(this.pojo).then(response=>{
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
      //确定刷新
     upDateList(formName){
      this.$refs[formName].validate(valid=>{
           if(valid){
             //提交更新
             supplierApi.upDate(this.pojo).then(response=>{
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
       },
       handleCurrent(currentRow){
         this.$emit("option-supplier",currentRow)
      

       }
  }
}

</script>

<style scoped>

</style>