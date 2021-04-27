<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    custom-class="newcases"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="95px">
      <el-form-item label="用例名称">
        <div>
          {{ namesa }}
        </div>
      </el-form-item>
      <el-form-item label="小用例名称" prop="inputs">
        <el-input v-model.trim="inputs" autocomplete="off" placeholder="请输入小用例名称"></el-input>
        <el-button type="primary" @click="add">新增小用例</el-button>
      </el-form-item>
      <el-form-item>
        <el-form
          v-for="(item, index) in formArr"
          :key="index"
          :inline="true"
        >
          <el-button class="tableheader">{{ newcase }}</el-button>
          <el-button type="danger" @click="del(index)">删除</el-button>
        </el-form>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit, InNewCase } from '@/api/project/cases'

  export default {
    name: 'TableNew',
    data() {
      return {
        newcase: '小用例步骤',
        formArr: [
        ],
        form: {
        },
        rules: {
          inputs: [{ required: true, message: '请输入小用例名称' }],
        },
        inputs: '',
        title: '用例步骤',
        namesa: '',
        dialogFormVisible: true,
      }
    },
    created() {},
    methods: {
      add() {
        this.formArr.push({
          key: '',
        })
        console.log(this.formArr)
      },
      del(index) {
        this.formArr.splice(index, 1)
      },
      showEditn(row) {
        this.title = '用例步骤'
        this.namesa = row.name
        this.form = Object.assign({}, row)
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          const pro_list = {
            listName: this.form.listName,
            name: this.form.name,
            des: this.form.des,
          }
          if (valid) {
            const { message } = await InNewCase(pro_list)
            this.$baseMessage(message, 'success')
            this.$refs['form'].resetFields()
            this.dialogFormVisible = false
            this.$emit('fetch-data')
            this.form = this.$options.data().form
            this.$parent.fetchData()
          } else {
            return false
          }
        })
      },
    },
  }
</script>

<style scoped>
  *::-webkit-scrollbar {
    width: 0;
  }
  .el-input {
    width: 200px;
    margin: 0 10px 10px 0;
  }
  .tableheader {
    width: 220px;
    margin: 0 5px 10px 0;
    background-color:rgb(218, 202, 149);
    color:darkred;
    border-radius: 5px;
  }
</style>

