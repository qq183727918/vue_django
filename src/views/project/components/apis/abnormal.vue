<template>
  <el-dialog
    v-loading="listLoading"
    :title="title"
    :visible.sync="dialogFormVisible"
    width="1000px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="测试按钮">
        <el-button type="primary" @click="error_play">开始异常值测试</el-button>
        <el-button type="info" @click="errors">查看结果</el-button>
        <el-button type="danger" @click="clear">清空结果</el-button>
      </el-form-item>
      <el-form-item label="异常值">
        <el-input v-model="abnormal" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-form
          v-for="(item, index) in formArr"
          :key="index"
          :inline="true"
        >
          <span>{{ item.key }}</span>
          <el-input
            v-model="item.value"
            type="textarea"
            resize="none"
            :rows="4"
            placeholder="请输入内容"
          >
          </el-input>
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
  import { doEdit, ErrorPlay } from '@/api/project/apis'

  export default {
    name: 'TableAbnormal',
    data() {
      return {
        listLoading: true,
        formArr: [
        ],
        form: {
        },
        rules: {
        },
        title: '',
        dialogFormVisible: false,
        row: '',
        farm: [],
        abnormal: "a,123,, ,!#$.%/?*&^,中文",
      }
    },
    created() {
      this.errors()
    },
    methods: {
      showEdit(row) {
        this.row = row
        this.title = '异常值测试'
        this.form = Object.assign({}, row)
        this.dialogFormVisible = true
      },
      clear(){
        this.formArr = []
        this.farm = []
      },
      errors(){
        this.listLoading = true
        this.formArr = this.farm
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      error_play() {
        // 处理异常值
        const abnormal = this.abnormal
        const api_row = this.row
        const abnormalvale = abnormal.replace('"').split(',')
        const abn_body = JSON.parse(api_row.api_body)
        for(let abn in abn_body){
          const abn_bodys = JSON.parse(api_row.api_body)
          for(let vab in abnormalvale){
            const abnlist = abnormalvale[vab]
            abn_bodys[abn] = abnlist
            const dic = {}
            ErrorPlay({id: api_row.id, abody: abn_bodys}).then(data => {
              dic.key = abn + "==>" + abnlist
              dic.value = data.data
            })
            this.farm.push(dic)
          }
        }
        this.formArr = []
        this.$baseMessage('执行完成', 'success')
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
        this.formArr = []
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            this.$refs['form'].resetFields()
            this.dialogFormVisible = false
            this.$emit('fetch-data')
            this.formArr = []
          } else {
            return false
          }
        })
      },
    },
  }
</script>
