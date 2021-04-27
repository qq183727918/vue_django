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
        <el-select v-model="selecta.value" clearable placeholder="项目名称" style="width:100%">
              <el-option
                v-for="itema in selecta.options"
                :key="itema.value"
                :label="itema.value"
                :value="itema.label">
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
  import { doEdit, InNewCase } from '@/api/project/cases'
  import { GetProList } from '@/api/project/list'
  export default {
    name: 'TableEdit',
    data() {
      return {
        selecta: {
         options: [
           {
            value: '选项1',
            label: '黄金糕'
          }],
          value: '',
          label: ''
        },
        form: {
          selecta: '',
          remark: '',
          des: ''
        },
        rules: {
          select: [{ required: true, message: '请选择项目名称' }],
          name: [{ required: true, message: '请输入用例名称' }],
          des: [{ required: true, message: '请输入用例描述' }],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        console.log(row)
        this.title = '新增用例'
        this.selecta = {options: row}
        this.dialogFormVisible = true
      },
      close() {
        console.log(this.selecta.value)
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          const pro_list = {
            project_id: this.selecta.value,
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
