<template>
  <div class="index-container">
    <h1>欢迎使用正交小工具</h1>
    <el-form v-for="(items, index) in formArr" :key="index" :inline="true">
      <el-input v-model="items.key" class="input-el" placeholder="输入条件的名字">
        <template slot="prepend">输入条件和子状态</template>
      </el-input>
      <el-input v-model="items.value" class="input-el" placeholder="多个子状态用 / 隔开"></el-input>
      <el-button type="danger" @click="del(index)">删除</el-button>
    </el-form>
    <el-button type="info" @click="add">新增</el-button>
    <el-button type="success" @click="Orthogonal">运行</el-button>
    <!-- <el-button type="warning" @click="Driveorth">导出Execl</el-button> -->
    
    <div v-if="tablesmall">
      <h2>结果展示：</h2>
      <el-table
        ref="multipleTable"
        :data="tables"
        tooltip-effect="dark"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        >
        <el-table-column label="用例编号" width="100%" type="index">
        </el-table-column>
        <template v-for='(col) in tableData'>
          <el-table-column
          :key="col.dataItem"
          :prop="col.dataItem"
          :label="col.dataName"
          >
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>
<script>
import { Orthogonal, OrthogonalDrive } from '@/api/project/orthogonal'
  export default {
    data() {
      return {
        tablesmall: false,
        formArr: [{
          key: '',
          value: '',
        }],
        tables: [],
        tableData: [{
          
        }]
      }
    },
    methods: {
      add() {
        this.formArr.push({
          key: '',
          value: '',
        })
        console.log(this.formArr)
      },
      del(index) {
        this.formArr.splice(index, 1)
      },
      Driveorth() {
        const tablist = this.formArr
        const pro_list = {end_values: this.formArr}
        OrthogonalDrive(pro_list).then(data => {
          console.log(data)
        })
      },
      Orthogonal() {
        const tablist = this.formArr
        const pro_list = {end_values: this.formArr}
        Orthogonal(pro_list).then(data => {
          this.tableData = []
          this.tables = []
          for(var s in tablist){
            const dic = {
              dataItem: "key" + s,
              dataName: tablist[s].key
            }
            this.tableData.push(dic)
            this.tables = data.res
          }
          this.tablesmall = true
        })
      },
    }
  }

</script>

<style scoped>
  .el-table th, .el-table td {
    text-align: center !important;
  }
  h1 {
    text-align: center;
  }
  .input-el {
    margin: 10px 0 10px 0;
    width: 47%;
  }

  .el-button {
    margin: 0 0 0 10px;
  }

  html body .vue-admin-beautiful-wrapper .app-main-container > [class*=-container] {
    padding: 20px;
    background: rgb(146, 146, 146, 0.3);
    border-radius: 10px;
  }

  .el-button--warning {
    position: absolute;
    right: 2%;
  }
</style>
