<template>
  <div class="index-container">
    <h1>欢迎使用正交小工具</h1>
    <el-form v-for="(item, index) in formArr" :key="index" :inline="true">
      <el-input v-model="item.key" placeholder="输入条件的名字">
        <template slot="prepend">输入条件和子状态</template>
      </el-input>
      <el-input v-model="item.value" placeholder="多个子状态用 / 隔开"></el-input>
      <el-button type="danger" @click="del(index)">删除</el-button>
    </el-form>
    <el-button type="info" @click="add">新增</el-button>
    <el-button type="success" @click="Orthogonal">运行</el-button>
    <el-button ref="outexecl" type="warning">导出Execl</el-button>
    
  </div>
</template>
<script>
import { Orthogonal } from '@/api/project/orthogonal'
  export default {
    data() {
      return {
        formArr: [{
          key: '',
          value: '',
        }],
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
      Orthogonal() {
        const pro_list = {end_values: this.formArr}
        Orthogonal(pro_list).then(data => {
          console.log(data)
        })
      }
    }
  }

</script>

<style scoped>
  h1 {
    text-align: center;
  }
  .el-input {
    margin: 0 0 10px 0;
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
