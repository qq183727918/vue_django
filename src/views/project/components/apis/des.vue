<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="接口名称" prop="name">
        <el-input v-model.trim="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="接口描述" prop="des">
        <el-input
          v-model="form.des"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8 }"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit } from '@/api/project/apis'

  export default {
    name: 'TableEdit',
    data() {
      return {
        form: {
          listName: '',
          remark: '',
        },
        rules: {
          listName: [{ required: true, message: '请输入项目名称' }],
          des: [{ required: true, message: '请输入项目描述' }],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        console.log(row)
        this.title = '备注编辑'
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
            id: this.form.id,
            name: this.form.name,
            des: this.form.des,
          }
          if (valid) {
            const { message } = await doEdit(pro_list)
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
