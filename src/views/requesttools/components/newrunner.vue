<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="文件上传" prop="listName">
        <el-upload
          class="upload-demo"
          action="http://192.168.1.42:8080/httprunner/update"
          :on-success="handle_success"
          :headers="headers"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">目前只支持har文件</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit, getList } from '@/api/requestTools/httprunner'

  export default {
    name: 'TableEdit',
    data() {
      return {
        token: '',
        form: {
        },
        rules: {
        },
        title: '',
        dialogFormVisible: false,
        fileList: []
      }
    },
    computed: {
      headers() {
        return{
          "Authorization": this.token // 直接从本地获取token就行
        }
      }
    },
    created() {},
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file)
        console.log(file.name)
        console.log(file.raw)
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handle_success(res) {
        console.log()
        if(res.code == 200){
          this.$message.success('上传成功')
        }else{
          this.$message.error(res.msg)
          this.fileList = []
        }
        
		  },
      showEdit(tokens) {
        this.title = '抓包导入接口'
        this.fileList = []
        this.token = tokens
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      save() {
        this.$refs['form'].resetFields()
        this.dialogFormVisible = false
        this.$emit('fetch-data')
        this.form = this.$options.data().form
        this.$parent.fetchData()
      },
    },
  }
</script>
