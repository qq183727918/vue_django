<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="50%"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用例名称">
        <div style="color: red;">
          {{ namesa }}
        </div>
      </el-form-item>
      <el-form-item label="步骤名称" prop="inputs">
        <el-input v-model.trim="inputs" autocomplete="off" placeholder="请输入小用例名称"></el-input>
        <el-button type="primary" @click="add">新增小用例</el-button>
      </el-form-item>
      <el-form-item label="步骤顺序">
        <el-form
          v-for="(item, index) in formArr"
          :key="index"
          :inline="true"
        >
          <el-input v-model="item.key" placeholder="顺序" style="width: 70px"></el-input>
          <el-button class="tableheader">{{ item.value }}</el-button>
          <el-select v-model="select[index]" filterable placeholder='请选择接口' @change="selectChange">
            <el-option
              v-for='items in select.options'
              :key="items.key"
              :label='items.value'
              :value='items.label'
              >
            </el-option>
          </el-select>
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
  import { doEdit, InNewCase, SmallCase, SmallList, SmallDel, SmallGet, SmallOrder } from '@/api/project/cases'
import { json } from 'body-parser'
  export default {
    name: 'TableNew',
    data() {
      return {
        newcase: '小用例步骤',
        select: [{
          options: [
              {
                value: 'APIS',
                label: 'APIS',
              },
            ],
            value: '',
        }],
        formArr: [
          {
            key: '',
            value: '',
          },
        ],
        form: {
        },
        rules: {
        },
        smallid: '',
        inputs: '',
        title: '用例步骤',
        namesa: '',
        order: '',
        test: '',
        dialogFormVisible: false,
        row: '',
        casevalues: [],
      }
    },
    created() {},
    methods: {
      add() {
        console.log(this.formArr.length)
        if(this.inputs == ''){
          this.$baseMessage('请输入小用例名称', 'error')
          return false
        }else{
          this.newcase = this.inputs
          const case_list = {
            case_id: this.smallid,
            index: this.formArr.length + 1,
            name: this.inputs,
          }
          SmallCase(case_list).then(data => {
              console.log(data)
              this.$baseMessage('OK', 'success')
              this.formArr.push({
                key: '',
                value: this.inputs,
            })
          })
        }
      },
      del(index) {
        console.log(index)
        SmallDel({ case_id: this.smallid, ids: index + 1 }).then(data => {
          console.log(data)
          this.$baseMessage('OK', 'success')
          this.formArr.splice(index, 1)
        })
      },
      showEditn(row) {
        const small = Array()
        var apis = Array()
        this.row = row
        this.title = '用例步骤'
        this.namesa = row.name
        this.smallid = row.id
        this.form = Object.assign({}, row)
        this.dialogFormVisible = true
        SmallGet({ project_id: row.project_id}).then(data => {
          const lists = data.data
          for(var s in lists){
            const dics = {
              label: lists[s].id,
              value: lists[s].name
            }
            apis.push(dics)
          }
        })
        this.select = {options: apis, value: '', label: ''}
        SmallList({ id: row.id }).then(data => {
          const cases = data.data
          for(var we = 0; we < cases.length; we++){
            const dic = {
              key: cases[we].index,
              value: cases[we].name,
            }
            small.push(dic)
            this.select[we] = cases[we].api_id
          }
        })
        this.formArr = small
      },
      selectChange(){
        this.$forceUpdate()
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      save() {
        SmallList({ id: this.row.id }).then(data => {
          const cases = data.data
          let array = [];
          for(var sde in cases){
            const dic = {}
            dic['id'] = cases[sde].id
            dic['name'] = cases[sde].name
            array.push(dic)
          }
          const casesa = array;
          this.casevalues = array;
          console.log(this.row)
          console.log(this.formArr)
          const caselist = new Array()
          const indexs = this.formArr
          for(var f = 0; f < indexs.length; f++){
            if(indexs[f].key == undefined || ""){
              this.$baseMessage('请输入连续的顺序', 'error')
              return false
            }
            if(this.select[f] == undefined){
              this.$baseMessage('请输入选择对应接口', 'error')
              return false
            }
            const dicname = {}
            dicname.id = casesa[f].id
            dicname.index = indexs[f].key
            dicname.name = indexs[f].value
            dicname.apiid = this.select[f]
            caselist.push(dicname)
          }
          
          // this.$refs['form'].validate(async (valid) => {
            const pro_list = {
              case: caselist,
              case_id: this.row.id
            }
            console.log(pro_list)
            // // if (valid) {

              SmallOrder(pro_list).then(data => {
                this.$baseMessage('保存成功！', 'success')
                this.$refs['form'].resetFields()
                this.dialogFormVisible = false
                this.$emit('fetch-data')
                this.form = this.$options.data().form
                this.$parent.fetchData()
              })
            // } else {
            //   return false
            // }
          // })
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
    width: 80%;
    margin: 0 10px 10px 0;
  }
  .el-select {
    margin: 0 10px 10px 10px;
  }
  .tableheader {
    width: 220px;
    margin: 0 5px 10px 0;
    background-color:rgb(218, 202, 149);
    color:darkred;
    border-radius: 5px;
  }
</style>

