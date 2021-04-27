<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="项目名称" prop="listName">
        <el-input v-model.trim="form.listName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="项目描述" prop="remark">
        <el-input v-model.trim="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit } from '@/api/project/list'

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
          remark: [{ required: true, message: '请输入项目描述' }],
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
            listName: this.form.listName,
            remark: this.form.remark,
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
