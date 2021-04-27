<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="变量名称" prop="name">
        <el-input v-model.trim="form.name" autocomplete="off" placeholder="请输入变量名称"></el-input>
      </el-form-item>
      <el-form-item label="变量值" prop="data">
        <el-input
          v-model="form.data"
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 10 }"
          placeholder="请输入变量值"
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
  import { doEdit } from '@/api/project/global'

  export default {
    name: 'TableEdit',
    data() {
      return {
        form: {
          name: '',
          data: '',
        },
        rules: {
          name: [{ required: true, message: '请输入变量名称' }],
          data: [{ required: true, message: '请输入变量值' }],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '编辑'
          this.form = Object.assign({}, row)
        }
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
            data: this.form.data,
          }
          if (valid) {
            const { message } = await doEdit(pro_list)
            this.$baseMessage(message, 'success')
            this.$refs['form'].resetFields()
            this.dialogFormVisible = false
            this.$emit('fetch-data')
            this.form = this.$options.data().form
          } else {
            return false
          }
        })
      },
    },
  }
</script>
