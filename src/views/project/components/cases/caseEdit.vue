<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="项目名称" prop="listName">
        <!-- <el-input v-model.trim="form.listName" autocomplete="off"></el-input> -->
        <el-select v-model="selects.value" clearable placeholder="项目名称" style="width:100%">
              <el-option
                v-for="itemq in selects.options"
                :key="itemq.value"
                :label="itemq.value"
                :value="itemq.label">
              </el-option>
            </el-select>
      </el-form-item>
      <el-form-item label="用例名称" prop="name">
        <el-input v-model.trim="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用例描述" prop="des">
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
  import { doEdit } from '@/api/project/cases'

  export default {
    name: 'TableCase',
    data() {
      return {
        selects: {
         options: [
           {
            value: '选项1',
            label: '黄金糕'
          }],
          value: '',
          label: ''
        },
        form: {
          listName: '',
          remark: '',
        },
        rules: {
          listName: [{ required: true, message: '请输入项目名称' }],
          name: [{ required: true, message: '请输入用例名称' }],
          des: [{ required: true, message: '请输入用例描述' }],
        },
        title: '',
        caseid: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdits(row, getlist) {
        this.selects = {options: getlist, value: row[0].listName}
        console.log(row[0])
        this.title = '编辑用例'
        this.form = Object.assign({}, row[0])
        this.caseid = row[0].id
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
            id: this.caseid,
            project_id: this.selects.value,
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
