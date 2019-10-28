<template>
<div>
  <!--表单一行显示-->
  <el-form ref="searchForm" :inline="true" :model="searchMap" class="demo-form-inline" style="magin-top:20px;">
  <el-form-item prop="name" >
    <el-input v-model="searchMap.name" placeholder="商品名称" style="width:200px;"></el-input>
  </el-form-item>
  <el-form-item prop="code">
    <el-input v-model="searchMap.code" placeholder="商品编号" style="width:200px;"></el-input>
  </el-form-item>
  <el-form-item prop="supplierName">
    <!--elment-ui在组件监听原生事件需要v-on元素事件名.native-->
    <el-input readonly
    @click.native="dialogSupplierVisible = true"
    v-model="searchMap.supplierName" placeholder="选择供应商" style="width:200px;"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="fetchData">查询</el-button>
     <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-button  @click="resetForm('searchForm')">重置</el-button>
  </el-form-item>
</el-form>






    <!--内容信息-->
     <el-table
    
    :data="list"
    height="380"
    border
    style="width: 100%">
    <el-table-column type="index" label="序号" width="60px;"></el-table-column>
    <el-table-column prop="name" label="商品名称" ></el-table-column>
    <el-table-column prop="code" label="商品编码" ></el-table-column>
    <el-table-column prop="spec" label="商品规格"  width="90px;" ></el-table-column>
    <el-table-column prop="retailPrice" label="零售价" ></el-table-column>
    <el-table-column prop="purchasePrice" label="进货价" ></el-table-column>
    <el-table-column prop="storageNum" label="库存数量" ></el-table-column>
    <el-table-column prop="supplierName" label="供应商" ></el-table-column>
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
  <!--选择供应商对话框-->
<el-dialog title="选择供应商" :visible.sync="dialogSupplierVisible" width="30%">
  <!--子组件选择性传递数据-->
      <supplier @option-supplier="optionSupplier" :isDialog="true"></supplier>
 </el-dialog>


<!--新增窗口-->
<el-dialog title="编辑商品" :visible.sync="dialogFormVisible" width="30%">
   <el-form :model="pojo"
  :rules="rules"
  ref="pojoForm"
  label-width="100px"
  label-position="right"
  style="width:75%;"
  >
    <el-form-item label="商品名称" prop="name">
      <el-input v-model="pojo.name"></el-input>
    </el-form-item>
     <el-form-item label="商品编码" prop="code" >
      <el-input v-model="pojo.code"></el-input>
    </el-form-item>
     <el-form-item label="商品规格" prop="spec" >
      <el-input v-model="pojo.spec"></el-input>
    </el-form-item>
  <el-form-item label="零售价" prop="retailPrice"> 
   <el-input v-model="pojo.retailPrice"></el-input>
 </el-form-item>
   <el-form-item label="进货价" prop="purchasePrice"> 
   <el-input v-model="pojo.purchasePrice"></el-input>
 </el-form-item>
   <el-form-item label="库存数量" prop="storageNum"> 
   <el-input v-model="pojo.storageNum"></el-input>
 </el-form-item>
    <el-form-item 
     readonly
    @click.native="editOptionSupplier"
    placeholder="选择供应商"
    label="供应商" prop="supplierName">
      <el-input v-model="pojo.supplierName" type="textarea" ></el-input>
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
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>



</div>
</template>

<script>
import goodsApi from "@/api/goods"
import Supplier from "../supplier/supplier"
export default {
  components:{Supplier},
data(){
     return{
       list:[],
       currentPage:1,
       pageSize:10,
       total:0,
       dialogSupplierVisible:false,//弹出选择供应商窗口
       dialogFormVisible:false,//新增窗口
       id:null,
       searchMap:{
         name:"",
         code:"",
         supplierName:"",
       },
       rules:{
             name:[
                {required:true,message:"商品名称不能为空",trigger:'blur'}
             ],
              code:[
                {required:true,message:"商品编码不能为空",trigger:'blur'}
             ],
              retailPrice:[
                {required:true,message:"零售价不能为空",trigger:'blur'}
             ],
       },
       pojo:{
         spec:"",
         name:"",
         code:"",
         retailPrice:0.0,
         purchasePrice:0.0,
         storageNum:"",
         supplierName:"",
         isEdit:false,//true是为编辑窗口 
         supplierId:null
       }

     }
  },
  created() {
    this.fetchData()
  },
  methods: {
   fetchData(){
      goodsApi.search(this.currentPage,this.pageSize,this.searchMap).then(response=>{
        this.list=response.data.data.rows,
        this.total=response.data.data.total
      })
    },
     //每页显示条数改变后，被触发 val 是最新条数
    handleSizeChange(val){
          this.pageSize=val
          this.fetchData()

    },
    //当页码改变后，被触发，val是最新的页面
    handleCurrentChange(val){
         this.pageSize=val
          this.fetchData()
    },
    //编辑
    handleEdit(id){
      //清除表单数据和校验结果
     this.handleAdd()
     goodsApi.getByid(id).then(response=>{
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
        goodsApi.deleteByid(id).then(response=>{
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

  
    //接受子组件传递数据方法
    optionSupplier(currentRow){
     if(this.isEdit){
       //新增窗口打开供应商
       this.pojo.supplierName=currentRow.name
       this.pojo.supplierId=currentRow.id
     }else{
       //搜索框打开供应商
      this.searchMap.supplierName=currentRow.name
      this.searchMap.supplierId=currentRow.id
     }
      this.isEdit=false
      this.dialogSupplierVisible=false//关闭商品窗口

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
           console.log(valid)
           //提交表单
          goodsApi.addDate(this.pojo).then(response=>{
             const resp=response.data
             console.log(resp)
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
             goodsApi.update(this.pojo).then(response=>{
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


      editOptionSupplier(){
        this.isEdit=true//新增窗口打开
        this.dialogSupplierVisible=true
      }
  }
}
</script>

<style scoped>

</style>